const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userAuth = require('../model/UserModel');
const likeModel = require('../model/LikeModel');
const { message } = require('../utilities/helper');

function validateCookie(req, res, token) {
  if (req.cookies.token === undefined) {
    res.cookie('token', token, { httpOnly: true, maxAge: 210000 }).redirect('/user/post');
  } else {
    req.flash('message', 'You are already been logged in..')
    res.redirect('/')
  }
}

function register(req, res) {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const user = new userAuth(req.body);
  try {
    user.save();
    req.flash('register', 'User registered successfully!');
    res.redirect('/user/login');
  } catch (err) {
    res.send(message(400, 'Bad request', `Error while register user: ${err}`))
  }
}

function authenticate(req, res) {
  try {
    userAuth.findOne({ email: req.body.email }, function (err, data) {
      if (data) {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          jwt.sign({ data }, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              res.send(message(400, 'Bad request', `Error while signing token: ${err}`))
            } else {
              validateCookie(req, res, token);
            }
          });
        } else {
          req.flash('error', 'Please enter valid credentials..!')
          res.redirect('/user/login');
        }
      }
    });
  }
  catch (err) {
    res.send(message(400, 'Bad request', `Error while authenticating data: ${err}`))
  }
}

async function likePost(req, res) {
  try {
    const isLikeExists = await likeModel.findOne({
      postId: req.body.postId, userId: req.body.userId,
      status: { $eq: 1 }
    });
    if (isLikeExists) {
      try {
        await likeModel.updateOne({ postId: req.body.postId, userId: req.body.userId },
          { $set: { status: 0 } });
      } catch (err) {
        res.send(message(400, 'Bad request', `Error while unliking post: ${err}`))
      }
    } else {
      try {
        await likeModel.updateOne({ postId: req.body.postId, userId: req.body.userId },
          { $set: { status: 1 } },
          { upsert: true }
        );
      } catch (err) {
        res.send(message(400, 'Bad request', `Error while liking a post: ${err}`))
      }
    }
    res.redirect('/posts/user');
  } catch (err) {
    res.send(message(400, 'Bad request', `Error while founding like: ${err}`))
  }
}

function indexView(req, res) {
  res.render('index', { email: req.user, message: req.flash('message') });
}

function loginView(req, res) {
  res.render('login', { email: req.user, message: req.flash('error'), register: req.flash('register') });
}

function addUserView(req, res) {
  res.render('register-user', { email: req.user });
}

function logout(req, res) {
  res.clearCookie('token').redirect('/user/login');
}

module.exports = {
  indexView, register, authenticate, message, loginView, validateCookie,
  addUserView, logout, likePost
}