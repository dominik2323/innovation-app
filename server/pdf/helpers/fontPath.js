const path = require('path');

module.exports = weight =>
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    `/www/public/static/fonts/SKODANext-${weight}.ttf`
  );
