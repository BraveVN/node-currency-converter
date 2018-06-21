'use strict';

/**
 * This axios service is used to call API
 * for specific requests and send the response to dispatcher
 */
const axios = require('axios');

/** Define constants to use in this service */
const APP_ID = '05f16dc30c6a4a50adc6ea2a6aa2a93f';
const API_URL = 'https://openexchangerates.org/api';
const HISTORICAL_ENDPOINT = 'historical';

/** Defind a constant to store response data */
const responseBody = res => res.data;

/**
 * An object that contains many HTTP method,
 * currently we only have GET method
 */
const requests = {
  /**
   * Get data from API with options and additional params then return the response
   *
   * @param {object} options
   * @param {object} params
   */
  get: (options, params = {}) => {
    if (options) {
      let date = options.date ? options.date : new Date();

      if (!options.endpoint) {
        throw 'API Endpoint must be available.';
      }

      params['app_id'] = APP_ID;
      return axios.get(`${API_URL}/${options.endpoint}/${date}.json`, {params: params})
                  .then(responseBody)
                  .catch(reject => console.log(reject));
    }
    throw 'Options is required.';
  }
};

/** Define XHR methods to get Historical data */
const Historical = {
  /**
   * Get list of exchange rate with date from input
   *
   * @param {string} date
   * @param {string} base
   */
  fetch: (date, base) => requests.get({ date: formatDate(date), endpoint: HISTORICAL_ENDPOINT }, { base: base })
};

/**
 * Format input datetime into correct standard of API: YYYY-MM-DD
 *
 * @param {string} value
 */
const formatDate = value => {
  let day = new Date(value);
  let year = day.getFullYear();
  let month = day.getMonth() + 1;
  month = month < 10 ? '0' + month : month;

  let date = day.getDate();
  date = date < 10 ? '0' + date : date;

  return `${year}-${month}-${date}`;
}

module.exports = {
  Historical
}