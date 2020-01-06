const Header = require('./Header');
const Paragraph = require('./Paragraph');

module.exports = function Bullets(doc, header, arr) {
  Header(doc, header);
  Paragraph(doc, { para: arr.map(it => it.text).join('\n'), moveDown: 2 });
};
