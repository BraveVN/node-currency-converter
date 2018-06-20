#!/usr/bin/env node

'use strict';

/**
 * Module dependencies.
 */
const program = require('commander');
const axios = require('./services/axios');

function getExchangeRate(fromCurrency, toCurrency) {
  axios.Historical.fetch('01/15/2016').then(res => {
    console.log(res.base);
    console.log(res.rates);
  })
}

program
  .version('0.0.1', '-v, --version' )
  .command('predict <fromCurrency> <toCurrency>')
  .description('Predict the exchange rate between 2 currencies')
  .action(getExchangeRate);

program.parse(process.argv);