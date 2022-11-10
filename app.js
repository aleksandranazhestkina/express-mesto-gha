const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', routerUser);

app.use((req, res, next) => {
  req.user = {
    _id: '636cf80ceaf2d6e5e2129101',
  };

  next();
});

app.listen(PORT);
