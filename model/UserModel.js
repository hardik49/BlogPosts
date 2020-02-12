const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  userStatus: {
    type: Number,
    default: 0,
    require: true,
    maxlength: 1
  }
}, { versionKey: false })

const users = mongoose.model('users', userSchema);

module.exports = users;