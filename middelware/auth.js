const config = require('config');
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
  const token = req.header('x-auth-token');

  console.log('token', token);

  //Check for token
  if (!token) res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token is no valid' });
  }
}
module.exports = auth;
