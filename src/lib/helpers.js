/**
 * This helpers is used to define some helper methods for currency.js
 */
'use strict';

/**
 * Module dependencies.
 */
const round = require('lodash.round');
const errors = require('../constants/constants').errors;

/**
 * Calculate the slope of Linear Regression algorithm with formula:
 * Slope(b) = (NΣXY - (ΣX)(ΣY)) / (NΣX^2 - (ΣX)^2)
 *
 * @param {array} sampleRates
 */
const calculateSlope = sampleRates => {
  if (!Array.isArray(sampleRates)) {
    throw new TypeError(errors.typeArray);
  }

  let numerator = sampleRates.length * totalProduct(sampleRates) - totalMonth(sampleRates) * totalExchangeRate(sampleRates);
  let denominator = sampleRates.length * totalSquareMonth(sampleRates) - square(totalMonth(sampleRates));
  return round(numerator / denominator, 4);
};

/**
 * Calculate the intercept of Linear Regression algorithm with formula:
 * Intercept(a) = (ΣY - b(ΣX)) / N
 *
 * @param {array} sampleRates
 */
const calculateIntercept = sampleRates => {
  if (!Array.isArray(sampleRates)) {
    throw new TypeError(errors.typeArray);
  }

  let slope = calculateSlope(sampleRates);
  let numerator = totalExchangeRate(sampleRates) - slope * totalMonth(sampleRates);
  let denominator = sampleRates.length;
  return round(numerator / denominator, 4);
};

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
const totalProduct = sampleRates => {
  return sampleRates.reduce((accumulator, currentValue) => {
    if (typeof currentValue !== 'object') {
      throw new TypeError(errors.typeObject);
    }
    if (typeof currentValue.month !== 'number' || typeof currentValue.rate !== 'number') {
      throw new TypeError(errors.typeNumber);
    }

    return accumulator + product(currentValue);
  }, 0);
};

/**
 * Calculate the total of square of month (ΣX^2)
 *
 * @param {array} sampleRates
 */
const totalSquareMonth = sampleRates => {
  return sampleRates.reduce((accumulator, currentValue) => {
    if (typeof currentValue !== 'object') {
      throw new TypeError(errors.typeObject);
    }
    if (typeof currentValue.month !== 'number') {
      throw new TypeError(errors.typeNumber);
    }
    return accumulator + square(currentValue.month);
  }, 0);
};

/**
 * Format input datetime into correct standard of API: YYYY-MM-DD
 *
 * @param {string} value
 */
const formatDate = value => {
  let day = new Date(value);
  if (day.toString() === 'Invalid Date') {
    throw new TypeError(errors.invalidDate);
  }

  let year = day.getFullYear();
  let month = day.getMonth() + 1;
  month = month < 10 ? '0' + month : month;

  let date = day.getDate();
  date = date < 10 ? '0' + date : date;

  return `${year}-${month}-${date}`;
};

module.exports = {
  calculateIntercept,
  calculateSlope,
  formatDate,
  product,
  square,
  totalExchangeRate,
  totalMonth,
  totalProduct,
  totalSquareMonth
};