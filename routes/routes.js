const router = require('express').Router();
const middleware = require('../middleware/middleware')
const UsersController = require('../controller/UsersController')

router.post('/user', UsersController.register);

module.exports = router; 