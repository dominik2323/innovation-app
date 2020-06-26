const { withApi } = require('./middleware/withApi');
const { getAccessToken } = require('./middleware/getAccessToken');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');

const server = express();
const port = 9999;
// const includesUid = (query) => Object.keys(query).includes(`uid`);

server.use(cors());
server.use(bodyParser.json());
server.use(withApi);
server.use(getAccessToken);
server.use(routes);

// error handler
server.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
  });
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is running on port ${port}`);
});
