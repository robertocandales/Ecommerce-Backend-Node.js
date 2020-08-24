produtCtrl = {};
const auth = require('../../middelware/auth');

const Product = require('../models/productModels');

//Get Products
produtCtrl.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.json({ message: error });
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
      res.json({ message: error });
    }
  });

// Post Products
produtCtrl.createProduct = async (req, res) => {
  try {
    const { name, image, description, price } = req.body;
    const newProduct = new Product({
      name: name,
      image: image,
      description: description,
      price: price,
    });
    await newProduct.save();
    res.json({ message: 'Product Saved' });
    //res.json(newProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

//Delete
produtCtrl.deleteProduct = async (req, res) => {
  //console.log(req.params);
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    res.json({ message: 'Product does not exist' });
  }
};

//put
produtCtrl.updateProduct =
  ('/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateAproduct = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
      };
      const result = await Product.findByIdAndUpdate(id, updateAproduct);
      res.status(200).json({ massage: `${result.name} uupdate success` });
    } catch (error) {
      res.json({ message: error });
    }
  });
module.exports = produtCtrl;
