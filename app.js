#!/usr/bin/env node

'use strict';

/**
 * Module dependencies.
 */
const program = require('commander');
const axios = require('./src/services/axios');
const currency = require('./src/lib/currency');
const constants = require('./src/constants/constants');
const nextDataPoint = constants.dateSample.length + 1;

/**
 * Call the API request to get historical exchange rate.
 * Calculate the rate based on historical data & show it.
 *
 * @param {string} fromCurrency
 * @param {string} toCurrency
 */
const getExchangeRate = async (fromCurrency, toCurrency) => {
  let promises = constants.dateSample.map(date => axios.Historical.fetch(date, fromCurrency));
  Promise.all(promises).then(res => {
    let sampleRates = res.map((sample, index) => ({
      month: index + 1,
      rate: currency.getExchangeRate(sample.rates, toCurrency)
    }));

    let predictedValue = currency.predictExchangeRate(sampleRates, nextDataPoint);
    console.log(`The predicted exchange rate from ${fromCurrency} to ${toCurrency} for 01/15/2017 is ${predictedValue}`);
  });
}

/**
 * Define custom command by using "commander" library.
 */
program
  .version('0.0.1', '-v, --version' )
  .command('predict <fromCurrency> <toCurrency>')
  .description('Predict the exchange rate between 2 currencies')
  .action(getExchangeRate);

program.parse(process.argv);