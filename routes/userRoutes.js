const router = require('express').Router();

const middleware = require('../middleware/middleware');
const PostsController = require('../controller/PostsController');

router.post('/post',middleware.validateToken, PostsController.addPost);

module.exports = router;  