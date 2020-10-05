const jwt = require('jsonwebtoken');
const User = require('../src/models/userModel');

const auth = async (req, res, next) => {
  let token = req.header('x-auth-token');

  if (req.header('x-auth-token')) {
    try {
      const decoded = jwt.verify(token, process.env.jwtSecret);
      req.user = await User.findById(decoded.id).select('-password');

<<<<<<< HEAD
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(200).json({ error: 'Token is no valid' });
=======
      next();
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(200).json({ error: 'Not authorized, no token' });
>>>>>>> master
  }
};
module.exports = auth;
