const toMm = require('../helpers/convertUnits.js');
const fontPath = require('../helpers/fontPath.js');

module.exports = function Header(doc, header) {
  return doc
    .font(fontPath(`Bold`))
    .fontSize(18)
    .text(header, toMm(15), doc.y)
    .moveDown(1);
};
