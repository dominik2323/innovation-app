module.exports = function addNewPage(doc, nextItemHeight, currentY) {
  if (
    nextItemHeight +
      currentY +
      doc.currentLineHeight(true) +
      doc.page.margins.top +
      doc.page.margins.bottom >
    doc.page.maxY()
  ) {
    doc.addPage();
  }
};
