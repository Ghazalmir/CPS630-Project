const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  console.log("token received: ", token)

  if (!token) {
    console.error('no token provided')
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'jwtsecret', (err, decoded) => {
    if (err) {
      console.log("failed to auth token")
      return res.status(403).json({ message: err });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = jwtMiddleware;