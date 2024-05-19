import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableFor from './components/TableFor.js';

const ExchangeRates = () => {
  const [usdRates, setUsdRates] = useState([]);
  const [eurRates, setEurRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('http://localhost:3002/getExchangeRates');
        const rates = response.data;
        
        const usdRates = rates.filter(rate => rate.currency === 'USD');
        const eurRates = rates.filter(rate => rate.currency === 'EUR');

        setUsdRates(usdRates);
        setEurRates(eurRates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div>
      <TableFor title="USD Rates" rates={usdRates} />
      <TableFor title="EUR Rates" rates={eurRates} />
    </div>
  );
};

export default ExchangeRates;
