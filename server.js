const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors'); // middelware para comunucar backend con frontend
const config = require('config');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middelware/errorMiddelware');

dotenv.config();

const fileUpload = require('express-fileupload');
const auth = require('./middelware/auth');

const app = express();
app.use(morgan('dev'));

const products = require('./src/routes/productRoutes');
const users = require('./src/routes/userRoutes');

//Body-Parser Middelware
app.use(express.json());

app.use(cors());

// DB config

const db = config.get('mongoURI');
//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Mongodb Connected...'))
  .catch((err) => console.log(err));

//Routes
app.use('/api/products', products);
app.use('/api/user', users);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status(404);
  next(error);
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
