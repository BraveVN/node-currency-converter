const currency = require('./currency');
const dummyData = require('../test/dummyData');

describe('Currency library', () => {
  /**
   * Define data variables for tests
   */
  let sample = dummyData.sample;
  let rates = {
    EUR: 0.88905,
    SGD: 1.362117,
    VND: 22338.4
  };

  /**
   * Test method currency.predictExchangeRate()
   */
  test('return predicted exchange rate with Linear Regression algorithm.', () => {
    expect(currency.predictExchangeRate(sample.rates, sample.nextDataPoint)).toEqual(sample.exchangeRate);
  });
  test('return NaN if nextDataPoint is not provided or not a number', () => {
    expect(currency.predictExchangeRate(sample.rates)).toEqual(NaN);
    expect(currency.predictExchangeRate(sample.rates, 'something')).toEqual(NaN);
    expect(currency.predictExchangeRate(sample.rates, [1, 2, 3])).toEqual(NaN);
    expect(currency.predictExchangeRate(sample.rates, f => f)).toEqual(NaN);
    expect(currency.predictExchangeRate(sample.rates, {})).toEqual(NaN);
  });
  test('return NaN if sample rates is an invalid array.', () => {
    expect(currency.predictExchangeRate([])).toEqual(NaN);
    expect(currency.predictExchangeRate([1, 2, 3])).toEqual(NaN);
  });

  /**
   * Test method currency.getExchangeRate()
   * Default base currency is USD
   */
  test('return correct exchange rate', () => {
    expect(currency.getExchangeRate(rates, 'VND')).toEqual(rates.VND);
  });
  test('return undefined if currency is not provided or has wrong value', () => {
    expect(currency.getExchangeRate(rates)).toEqual(undefined);
    expect(currency.getExchangeRate(rates, 'something')).toEqual(undefined);
    expect(currency.getExchangeRate(rates, 77)).toEqual(undefined);
    expect(currency.getExchangeRate(rates, true)).toEqual(undefined);
    expect(currency.getExchangeRate(rates, false)).toEqual(undefined);
    expect(currency.getExchangeRate(rates, {})).toEqual(undefined);
    expect(currency.getExchangeRate(rates, [])).toEqual(undefined);
    expect(currency.getExchangeRate(rates, f => f)).toEqual(undefined);
  });
});
