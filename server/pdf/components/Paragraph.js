const fontPath = require('../helpers/fontPath.js');

module.exports = function Paragraph(
  doc,
  { para, moveDown = 1, x = null, y = null, options = {} }
) {
  return (
    doc
      .font(fontPath('Regular'))
      .fontSize(9)
      // idk why arr is treated as object
      .text(
        typeof para === `object` ? para.map(it => `${it}\n`) : para,
        // para,
        x,
        y,
        options
      )
      .moveDown(moveDown)
  );
};
