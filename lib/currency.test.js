const currency = require('./currency');
const constants = require('../constants/constants');
const faker = require('faker');

describe('Currency library', () => {
  /**
   * Define variables & prepare data for tests
   */
  var sampleRates = [];
  var totalMonth = 0;
  var totalExchangeRate = 0;
  var totalProduct = 0;
  var totalSquareMonth = 0;
  var slope = 0;
  var intercept = 0;
  var exchangeRate = 0;
  var nextDataPoint = constants.DATA_POINTS + 1;
  beforeAll(() => {
    for (let index = 0; index < constants.DATA_POINTS; index++) {
      let rate = parseFloat(faker.finance.amount(20000, 25000, 4));
      sampleRates.push({ month: index + 1, rate: rate });

      totalMonth += index + 1;
      totalExchangeRate += rate;
      totalProduct += (index + 1) * rate;
      totalSquareMonth += (index + 1) * (index + 1)
    }

    let slopeNumerator = constants.DATA_POINTS * totalProduct - totalMonth * totalExchangeRate;
    let slopeDenominator = constants.DATA_POINTS * totalSquareMonth - totalMonth * totalMonth;
    slope = slopeNumerator / slopeDenominator;

    let interceptNumerator = totalExchangeRate - slope * totalMonth;
    let interceptDenominator = constants.DATA_POINTS;
    intercept = interceptNumerator / interceptDenominator;

    exchangeRate = intercept + slope * nextDataPoint;
  });

  /**
   * Test method currency.square()
   */
  test('return correct square of positive number', () => {
    expect(currency.square(2)).toEqual(4);
  });
  test('return correct square of zero', () => {
    expect(currency.square(0)).toEqual(0);
  });
  test('return correct square of negative number', () => {
    expect(currency.square(-2)).toEqual(4);
  });

  /**
   * Test method currency.product()
   */
  let rateObj = { month: 6, rate: 22700.229 }
  test('return correct product of 2 number in an object', () => {
    expect(currency.product(rateObj)).toEqual(rateObj.month * rateObj.rate);
  });

  /**
   * Test method currency.totalMonth()
   */
  test('return correct total of month in a year', () => {
    expect(currency.totalMonth(sampleRates)).toEqual(totalMonth);
  });

  /**
   * Test method currency.totalExchangeRate()
   */
  test('return correct total of rate according to each month in a year', () => {
    expect(currency.totalExchangeRate(sampleRates)).toEqual(totalExchangeRate);
  });

  /**
   * Test method currency.totalProduct()
   */
  test('return correct total of product between month & rate according to that month in a year', () => {
    expect(currency.totalProduct(sampleRates)).toEqual(totalProduct);
  });

  /**
   * Test method currency.totalSquareMonth()
   */
  test('return correct total of square of monthin a year', () => {
    expect(currency.totalSquareMonth(sampleRates)).toEqual(totalSquareMonth);
  });

  /**
   * Test method currency.calculateSlope()
   */
  test('return correct slope', () => {
    expect(currency.calculateSlope(sampleRates)).toEqual(slope);
  });

  /**
   * Test method currency.calculateIntercept()
   */
  test('return correct intercept', () => {
    expect(currency.calculateIntercept(sampleRates)).toEqual(intercept);
  });

  /**
   * Test method currency.calculateExchangeRate()
   */
  test('return correct exchange rate', () => {
    expect(currency.calculateExchangeRate(sampleRates, nextDataPoint)).toEqual(exchangeRate);
  });
});
