const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  const bodyHeader = req.cookies.token;
  if (typeof bodyHeader !== 'undefined') {
    jwt.verify(bodyHeader, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log('1');
        res.redirect('/user/login?error=denied');
      }
      req.user = {
        id: decoded.isUser._id,
        userStatus: decoded.isUser.userStatus,
        email: decoded.isUser.email
      }
      next();
    });
  } else {
    res.redirect('/user/login?error=denied');
  }
}

module.exports = { validateToken }