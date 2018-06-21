#!/usr/bin/env node

'use strict';

/**
 * Module dependencies.
 */
const program = require('commander');
const axios = require('./services/axios');
const currency = require('./lib/currency');
const constants = require('./constants/constants');
const nextDataPoint = constants.DATA_POINTS + 1;

/**
 * Hanlde logic for predicting exchange rate
 *
 * @param {string} fromCurrency
 * @param {string} toCurrency
 */
const getExchangeRate = async (fromCurrency, toCurrency) => {
  let promises = constants.dateSample.map(date => axios.Historical.fetch(date, fromCurrency));
  Promise.all(promises).then(res => {
    let sampleRates = res.map((sample, index) => ({
      month: index + 1,
      rate: currency.getExchangeRate(toCurrency, sample.rates)
    }));

    currency.calculateExchangeRate(sampleRates, nextDataPoint);
  });
}

program
  .version('0.0.1', '-v, --version' )
  .command('predict <fromCurrency> <toCurrency>')
  .description('Predict the exchange rate between 2 currencies')
  .action(getExchangeRate);

program.parse(process.argv);