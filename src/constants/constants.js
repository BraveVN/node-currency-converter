const dateSample = Array.from({length: 12}, (_, index) => {
  let month = index + 1 < 10 ? `0${index + 1}` : index + 1;
  return `${month}/15/2016`
});

module.exports = {
  dateSample
}