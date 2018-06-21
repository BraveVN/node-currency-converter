/**
 * This helper is used to define some helper methods for currency.js
 */
'use strict';

/**
 * Module dependencies.
 */
const constants = require('../constants/constants');
const round = require('lodash.round');

/**
 * Calculate the slope of Linear Regression algorithm with formula:
 * Slope(b) = (NΣXY - (ΣX)(ΣY)) / (NΣX^2 - (ΣX)^2)
 *
 * @param {array} sampleRates
 */
const calculateSlope = sampleRates => {
  let numerator = constants.DATA_POINTS * totalProduct(sampleRates) - totalMonth(sampleRates) * totalExchangeRate(sampleRates);
  let denominator = constants.DATA_POINTS * totalSquareMonth(sampleRates) - square(totalMonth(sampleRates));
  return round(numerator / denominator, 4);
}

/**
 * Calculate the intercept of Linear Regression algorithm with formula:
 * Intercept(a) = (ΣY - b(ΣX)) / N
 *
 * @param {array} sampleRates
 */
const calculateIntercept = sampleRates => {
  let slope = calculateSlope(sampleRates);
  let numerator = totalExchangeRate(sampleRates) - slope * totalMonth(sampleRates);
  let denominator = constants.DATA_POINTS;
  return round(numerator / denominator, 4);
}

/**
 * Calculate square of a number (X^2)
 *
 * @param {number} value
 */
const square = value => value * value;

/**
 * Calculate the product of month & its exchange rate (X * Y)
 *
 * @param {object} { month: month, rate: rate }
 */
const product = ({ month, rate }) => month * rate;

/**
 * Calculate the total of month (ΣX)
 *
 * @param {array} sampleRates
 */
const totalMonth = sampleRates => sampleRates.reduce((accumulator, currentValue) => accumulator + currentValue.month, 0);

/**
 * Calculate the total of exchange rate (ΣY)
 *
 * @param {array} sampleRates
 */
const totalExchangeRate = sampleRates => sampleRates.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0);

/**
 * Calculate the total product of month & its exchange rate (ΣXY)
 *
 * @param {array} sampleRates
 */
const totalProduct = sampleRates => sampleRates.reduce((accumulator, currentValue) => accumulator + product(currentValue), 0)

/**
 * Calculate the total of square of month (ΣX^2)
 *
 * @param {array} sampleRates
 */
const totalSquareMonth = sampleRates => sampleRates.reduce((accumulator, currentValue) => accumulator + square(currentValue.month), 0)

module.exports = {
  calculateIntercept,
  calculateSlope,
  product,
  square,
  totalExchangeRate,
  totalMonth,
  totalProduct,
  totalSquareMonth
};