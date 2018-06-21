const helpers = require('./helpers');
const testConstants = require('../test/constants');

describe('Helpers', () => {
  /**
   * Define variables & prepare data for tests
   */
  let sample = testConstants.sample;

  /**
   * Test method helpers.square()
   */
  test('return correct square of positive number', () => {
    expect(helpers.square(2)).toEqual(4);
  });
  test('return zero if input value is zero/null/false', () => {
    expect(helpers.square(0)).toEqual(0);
    expect(helpers.square(null)).toEqual(0);
    expect(helpers.square(false)).toEqual(0);
  });
  test('return 1 if input value is true', () => {
    expect(helpers.square(true)).toEqual(1);
  });
  test('return correct square of negative number', () => {
    expect(helpers.square(-2)).toEqual(4);
  });
  test('return NaN if input value is a string/object/function/undefined', () => {
    expect(helpers.square('something')).toEqual(NaN);
    expect(helpers.square({ something: 'something' })).toEqual(NaN);
    expect(helpers.square(f => f)).toEqual(NaN);
    expect(helpers.square(undefined)).toEqual(NaN);
  })

  /**
   * Test method helpers.product()
   */
  test('return correct product of 2 positive number in an object', () => {
    let rateData = { month: 6, rate: 22700.229 };
    expect(helpers.product(rateData)).toEqual(rateData.month * rateData.rate);
  });
  test('return zero if either month or rate is zero', () => {
    let rateData = { month: 0, rate: 22700.229 };
    expect(helpers.product(rateData)).toEqual(0);

    rateData = { month: 4, rate: 0 };
    expect(helpers.product(rateData)).toEqual(0);

    rateData = { month: 0, rate: 0 };
    expect(helpers.product(rateData)).toEqual(0);
  });
  test('return NaN if input value is an empty object or object with insufficient data', () => {
    expect(helpers.product({})).toEqual(NaN);

    let rateData = { month: 5 };
    expect(helpers.product(rateData)).toEqual(NaN);

    rateData = { rate: 22700.229 };
    expect(helpers.product(rateData)).toEqual(NaN);
  });

  /**
   * Test method helpers.totalMonth()
   */
  test('return correct total of month in a year', () => {
    expect(helpers.totalMonth(sample.rates)).toEqual(sample.totalMonth);
  });
  test('return 0 if input value is empty array', () => {
    expect(helpers.totalMonth([])).toEqual(0);
  });
  test('return NaN if input array has invalid format/ wrong data structure', () => {
    let inputArr = [1, 2, 3];
    expect(helpers.totalMonth(inputArr)).toEqual(NaN);

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.totalMonth(inputArr)).toEqual(NaN);
  });

  /**
   * Test method helpers.totalExchangeRate()
   */
  test('return correct total of rate according to each month in a year', () => {
    expect(helpers.totalExchangeRate(sample.rates)).toEqual(sample.totalExchangeRate);
  });
  test('return 0 if input value is empty array', () => {
    expect(helpers.totalExchangeRate([])).toEqual(0);
  });
  test('return NaN if input array has invalid format/ wrong data structure', () => {
    let inputArr = [1, 2, 3];
    expect(helpers.totalExchangeRate(inputArr)).toEqual(NaN);

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.totalExchangeRate(inputArr)).toEqual(NaN);
  });


  /**
   * Test method helpers.totalProduct()
   */
  test('return correct total of product between month & rate according to that month in a year', () => {
    expect(helpers.totalProduct(sample.rates)).toEqual(sample.totalProduct);
  });
  test('return 0 if input value is empty array', () => {
    expect(helpers.totalProduct([])).toEqual(0);
  });
  test('return NaN if input array has invalid format/ wrong data structure', () => {
    let inputArr = [1, 2, 3];
    expect(helpers.totalProduct(inputArr)).toEqual(NaN);

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.totalProduct(inputArr)).toEqual(NaN);
  });

  /**
   * Test method helpers.totalSquareMonth()
   */
  test('return correct total of square of monthin a year', () => {
    expect(helpers.totalSquareMonth(sample.rates)).toEqual(sample.totalSquareMonth);
  });
  test('return 0 if input value is empty array', () => {
    expect(helpers.totalSquareMonth([])).toEqual(0);
  });
  test('return NaN if input array has invalid format/ wrong data structure', () => {
    let inputArr = [1, 2, 3];
    expect(helpers.totalSquareMonth(inputArr)).toEqual(NaN);

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.totalSquareMonth(inputArr)).toEqual(NaN);
  });

  /**
   * Test method helpers.calculateSlope()
   */
  test('return correct slope', () => {
    expect(helpers.calculateSlope(sample.rates)).toEqual(sample.slope);
  });
  test('return NaN if input value is an empty array/has invalid format or wrong data structure', () => {
    let inputArr = [];
    expect(helpers.calculateSlope(inputArr)).toEqual(NaN);

    inputArr = [1, 2, 3];
    expect(helpers.calculateSlope(inputArr)).toEqual(NaN);

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.calculateSlope(inputArr)).toEqual(NaN);
  });

  /**
   * Test method helpers.calculateIntercept()
   */
  test('return correct intercept', () => {
    expect(helpers.calculateIntercept(sample.rates)).toEqual(sample.intercept);
  });
  test('return NaN if input value is an empty array/has invalid format or wrong data structure', () => {
    let inputArr = [];
    expect(helpers.calculateIntercept(inputArr)).toEqual(NaN);

    inputArr = [1, 2, 3];
    expect(helpers.calculateIntercept(inputArr)).toEqual(NaN);

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.calculateIntercept(inputArr)).toEqual(NaN);
  });
});
