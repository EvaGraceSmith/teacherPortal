'use strict';

const express = require('express');
const app = express();

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const router = require('./router/index.js');


app.use(express.json());
app.use(router);

app.use('*', notFoundHandler);

app.use(errorHandler);

const start = (port) => {

  app.listen(port, () => {
    console.log(`Server Up on ${port}`);
  });

};

module.exports = {
  app: app,
  start: start,
};

