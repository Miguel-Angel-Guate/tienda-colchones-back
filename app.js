require('dotenv-flow').config();
require('./config/mongoose')
const express = require('express');

const app = express();
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(PORT, () => console.log(`the server is running on port ${PORT}`))


