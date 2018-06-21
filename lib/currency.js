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
const constants = require('../constants/constants');

/**
 * Return exchange rate which is based on input currency
 *
 * @param {string} currency
 * @param {object} rates
 */
const getExchangeRate = (currency, rates) => {
  if (!rates) {
    throw 'Rates must be provided.'
  }
  return rates[currency];
}

const calculateExchangeRate = (sampleRates, nextDataPoint) => {
  return calculateIntercept(sampleRates) + calculateSlope(sampleRates) * nextDataPoint;
}

// X: month
// Y: exRate for X
// N: constants.DATA_POINTS = 12
const calculateSlope = sampleRates => {
  let numerator = constants.DATA_POINTS * totalProduct(sampleRates) - totalMonth(sampleRates) * totalExchangeRate(sampleRates);
  let denominator = constants.DATA_POINTS * totalSquareMonth(sampleRates) - square(totalMonth(sampleRates));
  return numerator / denominator;
}

const calculateIntercept = sampleRates => {
  let slope = calculateSlope(sampleRates);
  let numerator = totalExchangeRate(sampleRates) - slope * totalMonth(sampleRates);
  let denominator = constants.DATA_POINTS;
  return numerator / denominator;
}

// X^2
const square = value => value * value;

// X * Y
const product = ({ month, rate }) => month * rate;

// ΣX
const totalMonth = sampleRates => sampleRates.reduce((accumulator, currentValue) => accumulator + currentValue.month, 0);

// ΣY
const totalExchangeRate = sampleRates => sampleRates.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0);

// ΣXY
const totalProduct = sampleRates => sampleRates.reduce((accumulator, currentValue) => accumulator + product(currentValue), 0)

// ΣX^2
const totalSquareMonth = sampleRates => sampleRates.reduce((accumulator, currentValue) => accumulator + square(currentValue.month), 0)

module.exports = {
  calculateExchangeRate,
  calculateIntercept,
  calculateSlope,
  getExchangeRate,
  product,
  square,
  totalExchangeRate,
  totalMonth,
  totalProduct,
  totalSquareMonth
};