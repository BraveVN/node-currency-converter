'use strict';

/**
 * Return exchange rate which is based on input currency
 *
 * @param {string} currency
 * @param {object} rates
 */
function getExchangeRate(currency, rates) {
  if (!rates) {
    throw 'Rates must be provided.'
  }
  return rates[currency];
}

module.exports = {
  getExchangeRate
};