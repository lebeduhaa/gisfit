const request = require('request');
const express = require('express');

const app = express();

app.get('/search-outside', (req, res) => {

  request(
    { url: `https://e-dostavka.by/search/`, qs: req.query },
    (error, result, body) => {
      if (error || res.statusCode !== 200) {
        console.log(result);
        console.log(error);
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.header('Access-Control-Allow-Origin', '*');
      res.send(result);
    }
  )
});

module.exports = app;
