const helpers = require('./helpers');
const dummyData = require('../test/dummyData');

describe('Helpers', () => {
  /**
   * Define variables & prepare data for tests
   */
  let sample = dummyData.sample;

  /**
   * Test method helpers.square()
   */
  test('return correct square of positive number', () => {
    expect(helpers.square(2)).toBe(4);
  });
  test('return zero if input value is zero/null/false', () => {
    expect(helpers.square(0)).toBe(0);
    expect(helpers.square(null)).toBe(0);
    expect(helpers.square(false)).toBe(0);
  });
  test('return 1 if input value is true', () => {
    expect(helpers.square(true)).toBe(1);
  });
  test('return correct square of negative number', () => {
    expect(helpers.square(-2)).toBe(4);
  });
  test('return NaN if input value is a string/object/function/undefined', () => {
    expect(helpers.square('something')).toBeNaN();
    expect(helpers.square({ something: 'something' })).toBeNaN();
    expect(helpers.square(f => f)).toBeNaN();
    expect(helpers.square(undefined)).toBeNaN();
  })

  /**
   * Test method helpers.product()
   */
  test('return correct product of 2 positive number in an object', () => {
    let rateData = { month: 6, rate: 22700.229 };
    expect(helpers.product(rateData)).toBe(rateData.month * rateData.rate);
  });
  test('return zero if either month or rate is zero', () => {
    let rateData = { month: 0, rate: 22700.229 };
    expect(helpers.product(rateData)).toBe(0);

    rateData = { month: 4, rate: 0 };
    expect(helpers.product(rateData)).toBe(0);

    rateData = { month: 0, rate: 0 };
    expect(helpers.product(rateData)).toBe(0);
  });
  test('return NaN if input value is an empty object or object with insufficient data', () => {
    expect(helpers.product({})).toBeNaN();

    let rateData = { month: 5 };
    expect(helpers.product(rateData)).toBeNaN();

    rateData = { rate: 22700.229 };
    expect(helpers.product(rateData)).toBeNaN();
  });

  /**
   * Test method helpers.totalMonth()
   */
  test('return correct total of month in a year', () => {
    expect(helpers.totalMonth(sample.rates)).toBe(sample.totalMonth);
  });
  test('return 0 if input value is empty array', () => {
    expect(helpers.totalMonth([])).toBe(0);
  });
  test('return NaN if input array has invalid format/ wrong data structure', () => {
    let inputArr = [1, 2, 3];
    expect(helpers.totalMonth(inputArr)).toBeNaN();

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.totalMonth(inputArr)).toBeNaN();
  });

  /**
   * Test method helpers.totalExchangeRate()
   */
  test('return correct total of rate according to each month in a year', () => {
    expect(helpers.totalExchangeRate(sample.rates)).toBe(sample.totalExchangeRate);
  });
  test('return 0 if input value is empty array', () => {
    expect(helpers.totalExchangeRate([])).toBe(0);
  });
  test('return NaN if input array has invalid format/ wrong data structure', () => {
    let inputArr = [1, 2, 3];
    expect(helpers.totalExchangeRate(inputArr)).toBeNaN();

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.totalExchangeRate(inputArr)).toBeNaN();
  });


  /**
   * Test method helpers.totalProduct()
   */
  test('return correct total of product between month & rate according to that month in a year', () => {
    expect(helpers.totalProduct(sample.rates)).toBe(sample.totalProduct);
  });
  test('return 0 if input value is empty array', () => {
    expect(helpers.totalProduct([])).toBe(0);
  });
  test('return NaN if input array has invalid format/ wrong data structure', () => {
    let inputArr = [1, 2, 3];
    expect(helpers.totalProduct(inputArr)).toBeNaN();

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.totalProduct(inputArr)).toBeNaN();
  });

  /**
   * Test method helpers.totalSquareMonth()
   */
  test('return correct total of square of monthin a year', () => {
    expect(helpers.totalSquareMonth(sample.rates)).toBe(sample.totalSquareMonth);
  });
  test('return 0 if input value is empty array', () => {
    expect(helpers.totalSquareMonth([])).toBe(0);
  });
  test('return NaN if input array has invalid format/ wrong data structure', () => {
    let inputArr = [1, 2, 3];
    expect(helpers.totalSquareMonth(inputArr)).toBeNaN();

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.totalSquareMonth(inputArr)).toBeNaN();
  });

  /**
   * Test method helpers.calculateSlope()
   */
  test('return correct slope', () => {
    expect(helpers.calculateSlope(sample.rates)).toBe(sample.slope);
  });
  test('return NaN if input value is an empty array/has invalid format or wrong data structure', () => {
    let inputArr = [];
    expect(helpers.calculateSlope(inputArr)).toBeNaN();

    inputArr = [1, 2, 3];
    expect(helpers.calculateSlope(inputArr)).toBeNaN();

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.calculateSlope(inputArr)).toBeNaN();
  });

  /**
   * Test method helpers.calculateIntercept()
   */
  test('return correct intercept', () => {
    expect(helpers.calculateIntercept(sample.rates)).toBe(sample.intercept);
  });
  test('return NaN if input value is an empty array/has invalid format or wrong data structure', () => {
    let inputArr = [];
    expect(helpers.calculateIntercept(inputArr)).toBeNaN();

    inputArr = [1, 2, 3];
    expect(helpers.calculateIntercept(inputArr)).toBeNaN();

    inputArr = [
      { foo: 'foo' },
      { bar: 'bar' }
    ]
    expect(helpers.calculateIntercept(inputArr)).toBeNaN();
  });

  /**
   * Test method helpers.formatDate()
   */
  test('return correct format date YYYY-MM-DD from input MM-DD-YYYY', () => {
    expect(helpers.formatDate('01/15/2016')).toBe('2016-01-15');
  });
  test('return NaN-NaN-NaN if input value has format DD-MM-YYYY', () => {
    expect(helpers.formatDate('15/01/2016')).toBe('NaN-NaN-NaN');
  });
  test('return NaN-NaN-NaN if input has nothing', () => {
    expect(helpers.formatDate()).toBe('NaN-NaN-NaN');
  });
  test('return NaN-NaN-NaN if input value is an object or function', () => {
    expect(helpers.formatDate({})).toBe('NaN-NaN-NaN');
    expect(helpers.formatDate(f => f)).toBe('NaN-NaN-NaN');
  });
  test('return 1970-01-01 if input value is only a number or boolean', () => {
    expect(helpers.formatDate(777)).toBe('1970-01-01');
    expect(helpers.formatDate(true)).toBe('1970-01-01');
    expect(helpers.formatDate(false)).toBe('1970-01-01');
  });
});
