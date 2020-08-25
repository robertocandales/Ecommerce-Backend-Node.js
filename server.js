const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors'); // middelware para comunucar backend con frontend
const config = require('config');
const auth = require('./middelware/auth');

const app = express();
app.use(morgan('dev'));
const products = require('./src/routes/productRoutes');
const users = require('./src/routes/userRoutes');

//Body-Parser Middelware
app.use(express.json());

app.use(cors());
//app.use((req, res, next) => {
//  res.header('Access-Control-Allow-Origin', '*');
//  res.header(
//    'Access-Control-Allow-Headers',
//    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//  );
//  if (req.method === 'OPTIONS') {
//    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//    return res.status(200).json({});
//  }
//  next();
//});
// DB config
//const db = require('./config/keys').mongoURI;
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

app.use((error, req, res, next) => {
  res.stauts(err.status || 500);
  res.json({
    message: error.message,
  });
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
