/**
 * This lib is used to calcutate the result of Linear Regression algorithm:
 *
 * Regression Equation(y) = a + bx
 * Slope(b) = (NΣXY - (ΣX)(ΣY)) / (NΣX^2 - (ΣX)^2)
 * Intercept(a) = (ΣY - b(ΣX)) / N
 */
'use strict';

/**
 * Module dependencies.
 */
const helpers = require('./helpers');
const round = require('lodash.round');
const errors = require('../constants/constants').errors;

/**
 * Return exchange rate which is based on input currency
 *
 * @param {object} rates
 * @param {string} currency
 */
const getExchangeRate = (rates, currency) => {
  if (rates === null || typeof rates !== 'object') {
    throw new TypeError(errors.typeObject);
  }
  return rates[currency];
};

/**
 * Return the predict exchange rate for the next data point based on sample data
 *
 * @param {array} sampleRates
 * @param {number} nextDataPoint
 */
const predictExchangeRate = (sampleRates, nextDataPoint) => {
  if (!Array.isArray(sampleRates)) {
    throw new TypeError(errors.typeArray);
  }
  let result = helpers.calculateIntercept(sampleRates) + helpers.calculateSlope(sampleRates) * nextDataPoint;
  return round(result, 4);
};

module.exports = {
  predictExchangeRate,
  getExchangeRate
};