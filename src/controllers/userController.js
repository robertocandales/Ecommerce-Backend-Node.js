const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const jwt = require('jsonwebtoken');
userCtrl = {};

const User = require('../models/userModel');

//Get user data - access private
userCtrl.getUserData = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(200).json({ error: 'User not found' });
  }
};

//Register User
userCtrl.postUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Simple validation
    if (!name || !email || !password) {
      return res.status(200).json({ error: 'please enter all fields' });
    }
    // Check for existing user
    const result = await User.findOne({ email });
    console.log(result);
    if (result) {
      return res.status(200).json({ error: 'User already exist' });
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    //Create salt & hash
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        const result = await newUser.save();
        const result1 = await jwt.sign({ id: result.id }, process.env.jwtSecret, {
          expiresIn: '30d',
        });
        //res.json({ result, token: result1 });
        res.json({
          token: result1,
          user: {
            id: result.id,
            name: result.name,
            email: result.email,
          },
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};
//Post Auth
userCtrl.postAuth = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === null) {
    res.json({ error: 'user not found' });
  } else {
    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        status: 'success',
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  }
};

//updateUser
userCtrl.updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const admin = req.body.isAdmin || false;
    user.isAdmin = admin;
    if (req.body.password) {
      user.password = req.body.password;
    }
    console.log(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      token: generateToken(user._id),
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
      status: 'success',
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports = userCtrl;
