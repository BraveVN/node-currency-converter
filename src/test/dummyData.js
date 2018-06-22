const sample = {
  rates: [
    { month: 1, rate: 22403 },
    { month: 2, rate: 22337 },
    { month: 3, rate: 22291 },
    { month: 4, rate: 22335 },
    { month: 5, rate: 22345 },
    { month: 6, rate: 22331 },
    { month: 7, rate: 22311 },
    { month: 8, rate: 22293 },
    { month: 9, rate: 22338 },
    { month: 10, rate: 22296 },
    { month: 11, rate: 22367 },
    { month: 12, rate: 22697 }
  ],
  totalMonth: 78, // ΣX = 1 + 2 + 3 + ... + 12
  totalExchangeRate: 268344, // ΣY
  totalProduct: 1745925, // ΣXY
  totalSquareMonth: 650, // ΣX^2
  dataPoints: 12, // N
  nextDataPoint: 13,
  slope: 11.8112, // (NΣXY - (ΣX)(ΣY)) / (NΣX^2 - (ΣX)^2)
  intercept: 22285.2272, // (ΣY - b(ΣX)) / N
  exchangeRate: 22438.7728 // intercept + slope * nextDataPoint
};

module.exports = {
  sample
}