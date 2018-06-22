const axios = require('./axios');
const nock = require('nock');
const response = require('../test/mockData/historical.json');

describe('Axios request services', () => {
  /**
   * Prepare data for tests
   */
  var base = 'USD';
  beforeEach(() => {
    nock('https://openexchangerates.org/api')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/historical/2017-01-15.json')
      .query({ base: base, app_id: '05f16dc30c6a4a50adc6ea2a6aa2a93f' })
      .reply(200, response);
  })

  /**
   * Test method axios.Historical.fetch()
   */
  test('return a mock response of Historical fetch API.', () => {
    return axios.Historical.fetch('01/15/2017', base).then(res => {
      expect(typeof res).toEqual('object');
      expect(res.disclaimer).toBeDefined();
      expect(res.license).toBeDefined();
      expect(res.timestamp).toBeDefined();
      expect(res.base).toBe(base);
      expect(typeof res.rates).toEqual('object');
    });
  });

});
