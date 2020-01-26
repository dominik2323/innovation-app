const createPdfBody = require('./createPdfBody.js');
const PDFdoc = require('pdfkit');
const toMm = require('./helpers/convertUnits.js');

module.exports = (innovationData, humansData, lang) => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFdoc({ size: `A4`, margin: toMm(15) });

    let buffers = [];
    doc.on('data', data => buffers.push(data));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    await createPdfBody(doc, { innovationData, humansData }, lang);

    doc.end();
  });
};
