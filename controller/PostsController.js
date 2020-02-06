const jwt = require('jsonwebtoken');

const postModel = require('../model/PostModel');
const { message } = require('./UsersController');

async function addPost(req, res) {
  let post = new postModel(req.body);
  post.userId = req.user;

  try {
    const addPost = await post.save();
    res.send(message(200,'OK', 'post generated successfully!',addPost));
  } catch (err) {
    res.sendStatus(500).send(err);
  }
}

module.exports = { addPost }