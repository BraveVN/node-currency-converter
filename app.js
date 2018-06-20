#!/usr/bin/env node

'use strict';

/**
 * Module dependencies.
 */
const program = require('commander');
const axios = require('./services/axios');
const currency = require('./services/currency');

/**
 * Hanlde logic for predicting exchange rate
 *
 * @param {string} fromCurrency
 * @param {string} toCurrency
 */
function getExchangeRate(fromCurrency, toCurrency) {
  axios.Historical.fetch('01/15/2016', fromCurrency).then(res => {
    let rates = res.rates;
    let exchangeRate = currency.getExchangeRate(toCurrency, rates);
    console.log(exchangeRate);
  })
}

program
  .version('0.0.1', '-v, --version' )
  .command('predict <fromCurrency> <toCurrency>')
  .description('Predict the exchange rate between 2 currencies')
  .action(getExchangeRate);

program.parse(process.argv);