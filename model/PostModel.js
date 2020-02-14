const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true,
    maxlength: 40
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
    default:moment().format('DD-MM-YYYY')
  }
}, { versionKey: false })

const posts = mongoose.model('posts', postSchema);

module.exports = posts;