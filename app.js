const http = require("http");
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

const server = http.createServer(() => {
  console.log("Пришёл запрос!");
});

server.listen(3000);
