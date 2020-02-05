const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  userStatus: Number
})

const users = mongoose.model('users', userSchema);

module.exports = users;