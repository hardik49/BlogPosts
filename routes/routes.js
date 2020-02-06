const router = require('express').Router();

const middleware = require('../middleware/middleware')
const UsersController = require('../controller/UsersController')
const PostsController = require('../controller/PostsController');

router.post('/user', UsersController.register);

router.post('/verify', UsersController.authenticate);

router.get('/posts', middleware.validateToken, PostsController.getPostByUser);

module.exports = router;  