const jwt = require('jsonwebtoken');

const userAuth = require('../model/UserModel');

function message(statusCode, status, msg, data = '') {
  let obj = {
    statusCode: statusCode,
    status: status,
    message: msg,
    data: data
  }
  return obj;
}

function validateCookie(req, res, token, isUser) {
  if (req.cookies.token === undefined) {
    res.cookie('token', token, { httpOnly: true, maxAge: 30000 })
      .redirect('/user/post');
  } else {
    res.send(message(400, 'bad request', 'You are already been logged in..', token));
  }
}

async function register(req, res) {
  const user = new userAuth(req.body);
  try {
    const addUser = await user.save();
    res.send(message(200, 'OK', 'User registered successfully!', addUser));
  } catch (err) {
    res.sendStatus(500).send(err);
  }
}

async function authenticate(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const isUser = await userAuth.findOne({ email: email, password: password }, { password: 0 });
    if (isUser != null) {
      jwt.sign({ isUser }, process.env.SECRET_KEY, (err, token) => {
        validateCookie(req, res, token, isUser);
      });
    } else {
      res.json(message(400, 'bad request', 'User does not exists!'));
    }
  } catch (err) {
    res.send(err);
  }
}

function loginView(req, res) {
  res.render('login');
};
module.exports = { register, authenticate, message, loginView, validateCookie }