const express = require('express');
const pdf = require('./pdf/index.js');
const Prismic = require('prismic-javascript');
const axios = require('axios');
const cors = require('cors');

const server = express();
const port = 9999;
const includesUid = query => Object.keys(query).includes(`uid`);

const api = async req =>
  await Prismic.getApi('https://inolog.cdn.prismic.io/api/v2', {
    req,
  });

server.use(cors());

/* humans API */
server.get('/api/humans', async (req, res) => {
  const getApi = await api(req);

  const data = await getApi.query(
    Prismic.Predicates.at('document.type', 'humans'),
    { pageSize: 1000, lang: 'cs-cz' }
  );
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.end(JSON.stringify(data.results));
});

/* about API */
server.get('/api/about', async (req, res) => {
  const getApi = await api(req);

  const data = await getApi.query(
    Prismic.Predicates.at('document.type', 'about'),
    { pageSize: 1000, lang: 'cs-cz' }
  );
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.end(JSON.stringify(data.results[0].data));
});

/* innovations API */
server.get('/api/innovations', async (req, res) => {
  const getApi = await api(req);

  let data = {};
  if (includesUid(req.query)) {
    data = await getApi.query(
      // 3d-realita-pro-zapracovani-zamestnancu-ckd-centra
      Prismic.Predicates.at('my.innovations.uid', req.query.uid),
      {
        lang: 'cs-cz',
      }
    );
  } else {
    data = await getApi.query(
      Prismic.Predicates.at('document.type', 'innovations'),
      { pageSize: 1000, lang: 'cs-cz' }
    );
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.end(JSON.stringify(data));
});

server.get('/api/pdf', async (req, res) => {
  /** pdf API */
  res.setHeader(
    'Content-disposition',
    `attachment; filename=${req.query.uid}.pdf`
  );
  res.setHeader('Content-type', 'application/pdf');
  res.status(200);
  res.send(await pdf(req, res));
});

server.listen(port, err => {
  if (err) throw err;
  console.log(`server is running on port ${port}`);
});
