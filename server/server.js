const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const { sequelize, Rates } = require('./db');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors()); 


sequelize.sync().then(() => {
  console.log('Database synced');
});

const fetchAndSaveRates = async () => {
    try {
        const response = await axios.get('https://exchange-rate-api1.p.rapidapi.com/latest', {
            headers: {
                'X-RapidAPI-Host': 'exchange-rate-api1.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.API_KEY,
            },
            params: { base: 'UAH' }, 
        });

        const ratesData = response.data;

        const usdToUahRate = 1 / ratesData.rates['USD'];
        const eurToUahRate = 1 / ratesData.rates['EUR'];

        await Rates.create({ date: new Date(), currency: 'USD', rate: usdToUahRate });
        await Rates.create({ date: new Date(), currency: 'EUR', rate: eurToUahRate });

        console.log('Rates updated');
    } catch (error) {
        console.error('Error fetching or saving rates:', error);
    }
};
  
cron.schedule('* * * * *', fetchAndSaveRates);

app.get('/getExchangeRates', async (req, res) => {  
  try {
    const rates = await Rates.findAll();
    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});