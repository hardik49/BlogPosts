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
  },
  // Here 1 is already liked and 0 is disliked
  status: {
    type: Number,
    default:1,
    require: true
  }
}, { versionKey: false })

const likes = mongoose.model('likes', likeSchema);

module.exports = likes;