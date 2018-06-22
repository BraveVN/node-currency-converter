const dateSample = Array.from({length: 12}, (_, index) => {
  let month = index + 1 < 10 ? `0${index + 1}` : index + 1;
  return `${month}/15/2016`;
});

const errors = {
  typeObject: 'Input value must be an object.',
  typeNumber: 'Input value must be a number.',
  invalidDate: 'Input date is invalid.',
  typeArray: 'Input value must be an array.'
};

module.exports = {
  dateSample,
  errors
};
