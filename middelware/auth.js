const config = require('config');
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
  const token = req.header('x-auth-token');

  console.log('token', token);

  //Check for token
  if (!token) res.status(200).json({ error: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(200).json({ error: 'Token is no valid' });
  }
}
module.exports = auth;
