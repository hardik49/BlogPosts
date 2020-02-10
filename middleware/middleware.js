const jwt = require('jsonwebtoken');

const { message } = require('../controller/UsersController')

function validateToken(req, res, next) {
  const bodyHeader = req.cookies.token;
  if (typeof bodyHeader !== 'undefined') {
    jwt.verify(bodyHeader, process.env.SECRET_KEY, (err, decoded) => {
      if (err) res.json({ message: 'Invalid Token' });
      req.user = {
        id: decoded.isUser._id,
        userStatus: decoded.isUser.userStatus,
        email: decoded.isUser.email
      }
      next();
    });
  } else {
    res.send(message(401, 'Unauthorized', 'Unauthorized Access'));
  }
}

module.exports = { validateToken }