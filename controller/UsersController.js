const userAuth = require('../model/UserModel');

function message(statusCode, status, msg, data = '') {
  let obj = {
    statusCode: statusCode,
    status: status,
    message: msg,
    data: data
  }
  return obj;
}

async function register(req, res) {
  const user = new userAuth(req.body);
  try {
    const addUser = await user.save();
    res.send(message(200, 'OK', 'User registered successfully!', addUser));
  } catch (err) {
    res.sendStatus(500).send(err);
  }
}

module.exports = {register}