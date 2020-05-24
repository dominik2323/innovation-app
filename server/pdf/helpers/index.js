const toMm = require('./convertUnits.js');
const addNewPage = require('./addNewPage.js');
const getImageAsBuffer = require('./getImageAsBuffer.js');
const resolvePromises = require('./resolvePromises.js');
const fontPath = require('./fontPath.js');

module.exports = {
  toMm,
  fontPath,
  addNewPage,
  getImageAsBuffer,
  resolvePromises,
};
