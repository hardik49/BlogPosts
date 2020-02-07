const jwt = require('jsonwebtoken');

const postModel = require('../model/PostModel');
const { message } = require('./UsersController');

async function addPost(req, res) {
  let post = new postModel(req.body);
  post.userId = req.user;

  try {
    const addPost = await post.save();
    res.send(message(200, 'OK', 'Post Created..!', addPost));
  } catch (err) {
    res.sendStatus(500).send(err);
  }
}

async function getPostByUser(req, res) {
  if (req.userStatus == 1) {
    try {
      const getPost = await postModel.find({});
      if (getPost !== null) {
        res.send(message(200, 'OK', 'post found!', getPost));
      }
    } catch (err) {
      res.sendStatus(500).send(message(400, 'bad request', 'No post found!', getPost));
    }
  } else {
    try {
      const getPost = await postModel.find({ userId: req.user });
      if (getPost !== null) {
        res.send(message(200, 'OK', 'post found!', getPost));
      }
    } catch (err) {
      res.sendStatus(500).send(message(400, 'bad request', 'No post found!', getPost));
    }
  }
}

function addPostView(req, res) {
  res.render('add-post');
}

module.exports = { addPost, getPostByUser, addPostView }