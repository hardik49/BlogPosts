const postModel = require('../model/PostModel');
const likes = require('../model/LikeModel')
const { message } = require('../utilities/helper');

function addPost(req, res) {
  let post = new postModel(req.body);
  post.userId = req.user.id;
  try {
    post.save();
    req.flash('addedPost', 'Post Created..!');
    res.redirect('/posts/user');
  } catch (err) {
    res.sendStatus(500).send(err);
  }
}

async function getPostByUser(req, res) {
  if (req.user.userStatus == 1) {
    try {
      let countLike = [], obj = {};
      const getPost = await postModel.find({});
      try {
        const like = await likes.find({});
        if (getPost !== null) {
          try {
            for (let i = 0; i < getPost.length; i++) {
              const groupByPosts = await likes.aggregate([{ "$match": { postId:
                { $eq: "" + getPost[i]._id } } },
                { $group: { _id: getPost[i]._id, likeCount: { $sum: 1 } } }]);
                if (groupByPosts.length) {
                  countLike.push(groupByPosts);
                } else {
                  countLike.push([obj])
                }
            }
          } catch (err) {
            res.send(message(400, 'bad request', 'No post found!', getPost));
          }
          res.render('view-post', {
            email: req.user, posts: getPost, isAdded: req.flash('addedPost'),
            likes: like, countlike: countLike.flat()
          });
        } else {
          res.send(message(400, 'bad request', 'No post found!', getPost));
        }
      } catch (err) {
        res.sendStatus(500).send(err);
      }
    } catch (err) {
      res.sendStatus(500).send(err);
    }
  } else {
    try {
      let countLike = [], obj = {};
      const getPost = await postModel.find({ userId: req.user.id });
      try {
        if (getPost !== null) {
          const like = await likes.find({});
          try {
            for (let i = 0; i < getPost.length; i++) {
              const groupByPosts = await likes.aggregate([{ "$match": { postId:
                { $eq: "" + getPost[i]._id } } },
                { $group: { _id: getPost[i]._id, likeCount: { $sum: 1 } } }]);

              if (groupByPosts.length) {
                countLike.push(groupByPosts);
              } else {
                countLike.push([obj])
              }
            }
          } catch (err) {
            res.send(message(400, 'bad request', 'No post found!', getPost));
          }
          
          res.render('view-post', {
            email: req.user, posts: getPost, isAdded: req.flash('addedPost'),
            likes: like, countlike: countLike.flat()
          });
        } else {
          res.send(message(400, 'bad request', 'No post found!', getPost));
        }
      } catch (err) {
        res.sendStatus(500).send(err);
      }
    } catch (err) {
      res.sendStatus(500).send(err);
    }
  }
}

function addPostView(req, res) {
  res.render('add-post', { email: req.user });
}

module.exports = { addPost, getPostByUser, addPostView }