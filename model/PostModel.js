const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: Number,
  userId: String,
  title: String,
  content: String
})

const posts = mongoose.model('posts', postSchema);

module.exports = posts;