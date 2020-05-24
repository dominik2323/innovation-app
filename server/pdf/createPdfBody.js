const { fontPath } = require('./helpers/index.js');
const Bullets = require('./components/Bullets');
const Paragraph = require('./components/Paragraph');
const Header = require('./components/Header');
const {
  getImageAsBuffer,
  resolvePromises,
  toMm,
  addNewPage,
} = require('./helpers/index.js');
const strings = require('../../globals/strings');

module.exports = async (doc, data, lang) => {
  const {
    innovationname,
    perex,
    motivation,
    benefits,
    about,
    authors,
    slideshow,
  } = data.innovationData;

  const humans = data.humansData;

  /*    heading    */
  doc.font(fontPath('Black')).fontSize(28).text(innovationname);

  /*    perex    */
  doc.moveDown(1);
  doc.font(fontPath('Regular')).fontSize(12).text(perex).moveDown(2);

  // /*    bullets    */
  Bullets(doc, strings[lang].sidebar_motivation, motivation);
  Bullets(doc, strings[lang].sidebar_benefits, benefits);

  // /*    aboutText    */
  const promiseAbout = about.map((item) => {
    if (item.type === `paragraph`) {
      return () => Paragraph(doc, { para: item.text });
    } else if (item.type === `list-item`) {
      return () => Paragraph(doc, { para: item.text, moveDown: 0 });
    } else if (item.type === `heading2`) {
      return () => Header(doc, item.text);
    } else if (item.type === `image`) {
      return async () => {
        const buffer = await getImageAsBuffer(item.url);
        addNewPage(doc, 300, doc.y);
        doc
          .image(buffer, {
            height: 200,
          })
          .moveDown(1);
      };
    }
  });

  await resolvePromises(promiseAbout);

  // /*    authors    */

  function getAuthorsData() {
    const findAuthor = (authorUid) => {
      return humans.find((human) => human.uid === authorUid);
    };
    return authors.map((author) => ({
      ...findAuthor(author.humans.uid)['data'],
      isGarant: author.role === `Garant`,
    }));
  }

  const authorsData = getAuthorsData();

  const enhancedAuthors = authorsData.map(
    ({ name, phone, email, img, isGarant }, i) => async () => {
      addNewPage(doc, toMm(20), doc.y);
      i === 0 && (doc.moveDown(1), Header(doc, strings[lang].authors));
      doc
        .image(await getImageAsBuffer(img.url), toMm(15), doc.y, {
          fit: [toMm(20), toMm(20)],
        })
        .fontSize(9)
        .font(fontPath(`Regular`))
        .text(
          `${name}\n${
            isGarant
              ? strings[lang].contact_garant_of_project
              : strings[lang].contact_author_of_project
          }\n${email}\n${phone}`,
          toMm(40),
          doc.y - toMm(16)
        )
        .moveDown(2);
    }
  );

  await resolvePromises(enhancedAuthors);

  /*    slideshow    */
  const slideshowPromises = slideshow.map((img, i) => {
    const { width, height } = img.img.dimensions;

    return async () => {
      addNewPage(doc, (height / width) * toMm(180), doc.y);
      i === 0 ? Header(doc, strings[lang].photos) : null;
      doc
        .image(await getImageAsBuffer(img.img.url), toMm(15), doc.y, {
          width: toMm(180),
        })
        .moveDown(1);
    };
  });

  await resolvePromises(slideshowPromises);
};
