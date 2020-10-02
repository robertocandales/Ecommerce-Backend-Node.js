const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middelware/auth');
userCtrl = {};

const User = require('../models/userModel');

//Get user data - access private
userCtrl.getUserData =
  (auth,
  async (req, res) => {
    try {
      console.log(req.users, 'req');
      const result = await User.findById(req.users._id);
      console.log(result, 'result');
    } catch (error) {
      console.log(error);
    }
  });

//Post User
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
        const result1 = await jwt.sign({ id: result.id }, config.get('jwtSecret'), {
          expiresIn: 3600,
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
  try {
    const { email, password } = req.body;
    //Simple validation
    if (!email || !password) {
      return res.status(200).json({ error: 'please enter all fields' });
    } else {
      // Check for existing user
      const user = await User.findOne({ email });
      console.log('user', user);
      if (!user) {
        return res.status(200).json({ error: 'User does not exist' });
      } else {
        // Validate password
        const result = await bcrypt.compare(password, user.password);
        console.log('result', result);
        if (!result) return res.status(error).json({ msg: 'Invalid credentials' });
        const result1 = await jwt.sign({ id: result.id }, config.get('jwtSecret'), {
          expiresIn: 43200,
        });
        //res.json({ result, token: result1 });
        res.json({
          token: result1,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

module.exports = userCtrl;
