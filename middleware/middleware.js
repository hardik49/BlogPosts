const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  const bodyHeader = req.headers['authorization'];
  if (typeof bodyHeader !== undefined) {
    jwt.verify(bodyHeader, process.env.SECRET_KEY, (err, decoded) => {
      if (err) res.json({message: 'Invalid Token'});
      req.user = decoded.isUser._id;
      next();
    });
  } else {
    res.send('Invalid Token');
  }
}

module.exports = {validateToken}