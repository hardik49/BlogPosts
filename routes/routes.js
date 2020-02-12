const router = require('express').Router();

const middleware = require('../middleware/middleware')
const UsersController = require('../controller/UsersController')
const PostsController = require('../controller/PostsController');

router.get('/',middleware.validateToken, UsersController.indexView)

router.get('/user/register', UsersController.addUserView);

router.post('/user/register', UsersController.register);

router.get('/user/login', UsersController.loginView);

router.post('/user/login', UsersController.authenticate);

router.get('/posts/user', middleware.validateToken, PostsController.getPostByUser);

router.get('/user/post', middleware.validateToken, PostsController.addPostView);

router.post('/user/post', middleware.validateToken, PostsController.addPost);

router.get('/user/logout', UsersController.logout);

module.exports = router;  