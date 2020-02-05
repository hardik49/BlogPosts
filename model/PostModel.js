const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: Number,
  userId: Number,
  title: String,
  content: String
})

const posts = mongoose.model('posts', postSchema);

module.exports = posts;