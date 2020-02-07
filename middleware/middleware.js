const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {

  const bodyHeader = req.cookies.token;
  console.log(bodyHeader)
  if (typeof bodyHeader !== undefined) {
    jwt.verify(bodyHeader, process.env.SECRET_KEY, (err, decoded) => {
      if (err) res.json({ message: 'Invalid Token' });
      req.user = decoded.isUser._id;
      req.userStatus = decoded.isUser.userStatus;
      next();
    });
  } else {
    res.send('Invalid Token');
  }
}

module.exports = { validateToken }