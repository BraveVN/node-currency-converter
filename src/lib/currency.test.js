const currency = require('./currency');
const dummyData = require('../test/dummyData');
const errors = require('../constants/constants').errors;

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
    expect(currency.predictExchangeRate(sample.rates)).toBeNaN();
    expect(currency.predictExchangeRate(sample.rates, 'something')).toBeNaN();
    expect(currency.predictExchangeRate(sample.rates, [1, 2, 3])).toBeNaN();
    expect(currency.predictExchangeRate(sample.rates, f => f)).toBeNaN();
    expect(currency.predictExchangeRate(sample.rates, {})).toBeNaN();
  });
  test('return NaN if sample rates is an empty array.', () => {
    expect(currency.predictExchangeRate([])).toBeNaN();
  });
  test('throw error if sample rates is an invalid array.', () => {
    expect(() => currency.predictExchangeRate([1, 2, 3])).toThrowError(errors.typeObject);
  });
  test('throw error if sample rates is not an array.', () => {
    expect(() => currency.predictExchangeRate(5)).toThrowError(errors.typeArray);
    expect(() => currency.predictExchangeRate('something')).toThrowError(errors.typeArray);
    expect(() => currency.predictExchangeRate(true)).toThrowError(errors.typeArray);
    expect(() => currency.predictExchangeRate(null)).toThrowError(errors.typeArray);
    expect(() => currency.predictExchangeRate(undefined)).toThrowError(errors.typeArray);
    expect(() => currency.predictExchangeRate({})).toThrowError(errors.typeArray);
    expect(() => currency.predictExchangeRate(f => f)).toThrowError(errors.typeArray);
  });

  /**
   * Test method currency.getExchangeRate()
   * Default base currency is USD
   */
  test('return correct exchange rate', () => {
    expect(currency.getExchangeRate(rates, 'VND')).toEqual(rates.VND);
  });
  test('return undefined if currency is not provided or has wrong value', () => {
    expect(currency.getExchangeRate(rates)).toBeUndefined();
    expect(currency.getExchangeRate(rates, 'something')).toBeUndefined();
    expect(currency.getExchangeRate(rates, 77)).toBeUndefined();
    expect(currency.getExchangeRate(rates, true)).toBeUndefined();
    expect(currency.getExchangeRate(rates, false)).toBeUndefined();
    expect(currency.getExchangeRate(rates, {})).toBeUndefined();
    expect(currency.getExchangeRate(rates, [])).toBeUndefined();
    expect(currency.getExchangeRate(rates, f => f)).toBeUndefined();
  });
  test('throw error if rates is not an object.', () => {
    expect(() => currency.getExchangeRate(5)).toThrowError(errors.typeObject);
    expect(() => currency.getExchangeRate('something')).toThrowError(errors.typeObject);
    expect(() => currency.getExchangeRate(true)).toThrowError(errors.typeObject);
    expect(() => currency.getExchangeRate(null)).toThrowError(errors.typeObject);
    expect(() => currency.getExchangeRate(undefined)).toThrowError(errors.typeObject);
    expect(() => currency.getExchangeRate(f => f)).toThrowError(errors.typeObject);
  });
});
