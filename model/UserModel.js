const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  userStatus: {
    type: Number,
    default: 0
  }
}, { versionKey: false })

const users = mongoose.model('users', userSchema);

module.exports = users;