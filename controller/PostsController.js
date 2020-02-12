const moment = require('moment');

const postModel = require('../model/PostModel');
const { message } = require('./UsersController');

async function addPost(req, res) {
  let post = new postModel(req.body);
  post.userId = req.user.id;
  post.createdAt = moment().format('DD-MM-YYYY');
  try {
    await post.save();
    req.flash('addedPost','Post Created..!');
    res.redirect('/posts/user');
  } catch (err) {
    req.flash('loginRequired', 'login required');
    res.redirect('/user/login');
  }
}

async function getPostByUser(req, res) {
  if (req.user.userStatus == 1) {
    try {
      const getPost = await postModel.find({});
      if (getPost !== null) {
        res.render('view-post', { email: req.user, posts: getPost, isAdded:req.flash('addedPost') });
      }
    } catch (err) {
      res.sendStatus(500).send(message(400, 'bad request', 'No post found!', getPost));
    }
  } else {
    try {
      const getPost = await postModel.find({ userId: req.user.id });
      if (getPost !== null) {
        res.render('view-post', { email: req.user, posts: getPost, isAdded:req.flash('addedPost') });
      }
    } catch (err) {
      res.sendStatus(500).send(message(400, 'bad request', 'No post found!', getPost));
    }
  }
}

function addPostView(req, res) {
  res.render('add-post', { email: req.user });
}

module.exports = { addPost, getPostByUser, addPostView }