const jwt = require('jsonwebtoken');
const flash = require('express-flash-notification');

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

function validateCookie(req, res, token) {
  if (req.cookies.token === undefined) {
    res.cookie('token', token, { httpOnly: true, maxAge: 90000 })
      .redirect('/user/post');
  } else {
    res.send(message(400, 'bad request', 'You are already been logged in..', token));
  }
}

async function register(req, res) {
  const userObj = {
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password
  }
  const user = new userAuth(userObj);
  try {
    await user.save();
    res.send(message(200, 'OK', 'User registered successfully!'));
  } catch (err) {
    res.sendStatus(500).send(err);
  }
}

async function authenticate(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const isUser = await userAuth.findOne({ email: email, password: password },
      { password: 0 });
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

function indexView(req, res) {
  res.render('index', { email: req.user });
}

function loginView(req, res) {
  res.render('login', { email: req.user });
}

function addUserView(req, res) {
  res.render('register-user', { email: req.user });
}

function logout(req, res) {
  res.clearCookie('token').redirect('/user/login');
}

module.exports = {
  indexView, register, authenticate, message, loginView, validateCookie,
  addUserView, logout
}