const request = require('request');
const express = require('express');

const app = express();

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/search-outside', (request, response) => {
  const { searchtext, lazy_steep } = request.query;

  request(
    { url: `https://e-dostavka.by/search/?searchtext=${searchtext}&lazy_steep${lazy_steep}` },
    (error, result, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      response.send(result);
    }
  )
});

module.exports = app;
