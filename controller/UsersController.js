const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    res.send(message(400, 'bad request', 'You are already been logged in..'));
  }
}

async function register(req, res) {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const user = new userAuth(req.body);
  try {
    await user.save();
    req.flash('register', 'User registered successfully!');
    res.redirect('/user/login');
  } catch (err) {
    res.sendStatus(500).send(err);
  }
}

function authenticate(req, res) {
  new Promise((resolve, reject) => {
    userAuth.findOne({ email: req.body.email }, function (err, data) {
      if (err) {
        return reject(new Error(err));
      } else {
        return resolve(data);
      }
    });
  }).then(function (data) {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      jwt.sign({ data }, process.env.SECRET_KEY, (err, token) => {
        validateCookie(req, res, token);
      });
    } else {
      req.flash('error', 'Please enter valid credentials..!')
      res.redirect('/user/login');
    }
  }).catch(function (err) {
    throw err;
  });
}

function indexView(req, res) {
  res.render('index', { email: req.user });
}

function loginView(req, res) {
  if (req.cookies.token) {
    res.redirect('/');
  } else {
    res.render('login', { email: req.user, message: req.flash('error'), register: req.flash('register') });
  }
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