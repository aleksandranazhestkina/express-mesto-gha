const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3003 } = process.env;

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
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(helmet());
app.disable('x-powered-by');
app.use(errorHandler);

app.listen(PORT);
