const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  const bodyHeader = req.cookies.token;
  if (typeof bodyHeader !== 'undefined') {
    jwt.verify(bodyHeader, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.redirect('/user/login');
      }
      req.user = {
        id: decoded.data._id,
        userStatus: decoded.data.userStatus,
        email: decoded.data.email
      }
      next();
    });
  } else {
    req.flash('error','Login is required..!');
    res.redirect('/user/login');
  }
}



module.exports = { validateToken }