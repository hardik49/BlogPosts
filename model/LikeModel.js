const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  postId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true
  }
}, { versionKey: false })

const likes = mongoose.model('likes', likeSchema);

module.exports = likes;