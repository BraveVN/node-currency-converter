const dateSample = Array.from({length: 12}, (_, index) => {
  let month = index + 1 < 10 ? `0${index + 1}` : index + 1;
  return `${month}/15/2016`
});

const DATA_POINTS = 12;

const MONTHS = Array.from({length: 12}, (_, index) => index + 1);

module.exports = {
  dateSample,
  DATA_POINTS,
  MONTHS
}