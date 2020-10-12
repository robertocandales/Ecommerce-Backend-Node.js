produtCtrl = {};
const auth = require('../../middelware/auth');
const upload = require('../../middelware/uploads');
const Product = require('../models/productModels');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

//Get Products
produtCtrl.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.json({ error: error });
  }
};
//byId
produtCtrl.getAprouct =
  ('/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Product.findById(id);
      res.status(200).json(result);
    } catch (error) {
      res.json({ error: error });
    }
  });

// Post Products
produtCtrl.createProduct = async (req, res) => {
  console.log(req);
  try {
    const { name, image, description, price } = req.body;
    const newProduct = new Product({
      user: req.user._id,
      name: name,
      image: image,
      description: description,
      price: price,
      countInStock: req.body.countInStock,
    });
    await newProduct.save();
    res.json({ message: 'Product Saved' });
    //res.json(newProduct);
  } catch (error) {
    res.json({ error: error });
  }
};

//Delete
produtCtrl.deleteProduct = async (req, res) => {
  console.log(req.params);
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    res.json({ error: 'Product does not exist' });
  }
};

//put
produtCtrl.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updateAproduct = {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
    };
    const result = await Product.findByIdAndUpdate(id, updateAproduct);
    res.status(200).json({ massage: `${result.name} update success` });
  } catch (error) {
    res.json({ error: error });
  }
};

produtCtrl.UpdateImage =
  ('/upload',
  async (req, res) => {
    res1 = await upload(req, res);

    try {
      console.log(req.file);
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }

      return res.json(req.file);
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload image: ${error}`);
    }
  });

module.exports = produtCtrl;
