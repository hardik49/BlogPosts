const jwt = require('jsonwebtoken');

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
    res.send(message(200, 'OK', 'User registered successfully!'));
  } catch (err) {
    res.sendStatus(500).send(err);
  }
}

async function authenticate(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const isUser = await userAuth.findOne({ email: email, password: password }, { password: 0 });
    console.log(isUser);
    if (isUser != null) {
      jwt.sign({isUser}, process.env.SECRET_KEY, function (err, token) {
        res.json(message(200, 'OK', 'Token generated..', token))
      });
    }
  } catch (err) {
    console.log('in catch');
    res.json(message(400, 'bad request', 'User does not exists!'))
  }
}

module.exports = { register, authenticate, message }