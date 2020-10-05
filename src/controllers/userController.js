const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const jwt = require('jsonwebtoken');
userCtrl = {};

const User = require('../models/userModel');

//Get user data - access private
<<<<<<< HEAD
userCtrl.getUserData =
  (auth,
  async (req, res) => {
    try {
      console.log(req.users, 'req');
      const result = await User.findById(req.users._id);
    } catch (error) {
      console.log(error);
    }
  });
=======
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
    res.status(404);
    throw new Error('User not found');
  }
};
>>>>>>> master

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
//userCtrl.postAuth = async (req, res) => {
//  try {
//    const { email, password } = req.body;
//    //Simple validation
//    if (!email || !password) {
//      return res.status(200).json({ error: 'please enter all fields' });
//    } else {
//      // Check for existing user
//      const user = await User.findOne({ email });

//      if (!user) {
//        return res.status(200).json({ error: 'User does not exist' });
//      } else {
//        // Validate password
//        const result = await bcrypt.compare(password, user.password);
//        console.log('result', result);
//        if (!result) return res.status(error).json({ msg: 'Invalid credentials' });
//        const result1 = await jwt.sign({ id: result.id }, process.env.jwtSecret, {
//          expiresIn: '30d',
//        });
//        res.json({
//          token: result1,
//          user: {
//            id: user._id,
//            name: user.name,
//            email: user.email,
//          },
//        });
//      }
//    }
//  } catch (error) {
//    console.log(error);
//    res.json({ message: error });
//  }
//};
userCtrl.postAuth = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

module.exports = userCtrl;
