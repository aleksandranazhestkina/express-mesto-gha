const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-error');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use('/', routerUser);
app.use('/', routerCard);
app.use(auth);

app.use(helmet());
app.disable('x-powered-by');

app.use(errors());
app.use(errorHandler);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс по указанному адресу не найден'));
});

app.listen(PORT);
