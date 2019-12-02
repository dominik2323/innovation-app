const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");
const mime = require("mime");
const absoluteUrl = require("next-absolute-url");
const fetch = require("node-fetch");
const axios = require("axios");

async function createPDF(pdfData, humans) {
  const { data, uid } = pdfData;
  const {
    innovationname,
    perex,
    about,
    motivation,
    benefits,
    authors,
    slideshow
  } = data;

  return new Promise(async (res, rej) => {
    const filePath = `./${uid}.pdf`;
    const doc = new PDFDocument({ size: `A4`, margin: mms(15) });
    const stream = fs.createWriteStream(filePath);

    function mms(dist) {
      return (72 / 25.4) * dist;
    }

    function addNewPage(nextItemHeight, currentY) {
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
    }

    async function imgBuffer(url) {
      const response = await axios.get(url, {
        responseType: "arraybuffer"
      });

      return Buffer.from(response.data);
    }

    const Header = header => {
      doc
        .fontSize(18)
        .font(fontPath("Bold"))
        .text(header, mms(15), doc.y)
        .moveDown(1);
    };

    const Paragraph = ({
      para,
      moveDown = 1,
      x = null,
      y = null,
      options = {}
    }) => {
      doc
        .fontSize(9)
        .font(fontPath("Light"))
        // idk why arr is treated as object
        .text(
          typeof para === `object` ? para.map(it => `${it}\n`) : para,
          x,
          y,
          options
        )
        .moveDown(moveDown);
    };

    const Bullets = (header, arr) => {
      Header(header);
      Paragraph({ para: arr.map(it => it.text).join("\n"), moveDown: 2 });
    };

    const fontPath = width => `/fonts/SKODANext-${width}.ttf`;

    doc.pipe(stream);

    /*    heading    */
    doc
      .font(fontPath(`Black`))
      .fontSize(28)
      .text(innovationname);

    /*    perex    */
    doc.moveDown(1);
    doc
      .font(fontPath("Light"))
      .fontSize(12)
      .text(perex)
      .moveDown(2);

    /*    bullets    */
    Bullets(`Motivace`, motivation);
    Bullets(`Benefity`, benefits);

    /*    aboutText    */
    Header(`O projektu`);
    const promiseAbout = about.map((item, i) => {
      if (item.type === `paragraph` || item.type === `list-item`) {
        return () => Paragraph({ para: item.text });
      } else if (item.type === `image`) {
        return async () => {
          const buffer = await imgBuffer(item.url);
          addNewPage(300, doc.y);
          doc
            .image(buffer, {
              height: 200
            })
            .moveDown(1);
        };
      }
    });

    async function resolveAllPromises(arr) {
      for (let i = 0; i < arr.length; i++) {
        const fn = arr[i];
        await fn();
      }
    }
    await resolveAllPromises(promiseAbout);

    /*    authors    */

    function getAuthorsData() {
      const findAuthor = authorUid => {
        return humans.find(human => human.uid === authorUid);
      };
      return authors.map(author => ({
        ...findAuthor(author.humans.uid)["data"],
        isGarant: author.role === `Garant`
      }));
    }

    const authorsData = getAuthorsData();

    const enhancedAuthors = authorsData.map(
      ({ name, phone, email, img, isGarant }, i) => async () => {
        addNewPage(mms(20), doc.y);
        i === 0 && (doc.moveDown(1), Header(`Autoři`));
        doc
          .image(await imgBuffer(img.url), mms(15), doc.y, {
            fit: [mms(20), mms(20)]
          })
          .fontSize(9)
          .font(fontPath("Light"))
          .text(
            `${name}\n${
              isGarant ? `Garant projektu` : `Autor projektu`
            }\n${email}\n${phone}`,
            mms(40),
            doc.y - mms(16)
          )
          .moveDown(2);
      }
    );

    await resolveAllPromises(enhancedAuthors);

    /*    slideshow    */
    const slideshowPromises = slideshow.map((img, i) => {
      const { width, height } = img.img.dimensions;

      return async () => {
        addNewPage((height / width) * mms(180), doc.y);
        i === 0 ? Header(`Fotografie`) : null;
        doc
          .image(await imgBuffer(img.img.url), mms(15), doc.y, {
            width: mms(180)
          })
          .moveDown(1);
      };
    });

    await resolveAllPromises(slideshowPromises);

    doc.end();
    stream.on("finish", () => {
      res(filePath);
    });
  });
}

export default async (req, res) => {
  const { protocol, host } = absoluteUrl(req);
  const apiURL = api => `${protocol}//${host}/api/${api}`;

  const fetchInnovations = await fetch(apiURL(`innovations`));
  const innovationsData = await fetchInnovations.json();

  const fetchHumans = await fetch(apiURL(`humans`));
  const humansData = await fetchHumans.json();

  const pdfData = innovationsData.data.results.find(
    innovation => innovation.uid === req.query.id
  );

  const filePath = await createPDF(pdfData, humansData.data.results);

  const filename = path.basename(filePath);
  const mimetype = mime.lookup(filePath);

  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  const filestream = fs.createReadStream(filePath);
  filestream.pipe(res);
};

export const config = {
  api: {
    bodyParser: false
  }
};
