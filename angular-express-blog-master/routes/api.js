/*
 * Serve JSON to our AngularJS client
 */

// JSON API

const db = require('../model');
const User = db.user;
const Article = db.article;

// GET

var posts = function(req, res) {
  var posts = [];
  Article.find().exec(function(err, dbPosts) {
    if (err) return console.log("search datas in db failed...");

    dbPosts.forEach(function(post, i) {
      posts.push({
        id: post._id,
        title: post.title,
        author: post.author,
        content: post.content.substr(0, 50) + '...',
        hidden: post.hidden
      });
    });
    res.json({
      posts: posts
    });
  });
};

var post = function(req, res) {
  var id = req.params.id;
  Article.findById(id).exec(function(err, article) {
    if (err) return console.log("find article by id from db failed...");

    if (article != null) {
      res.json({
        post: article
      });
    } else {
      res.json(false);
    }
  });
};

// POST

var addPost = function(req, res) {
  if (req.body.title == '' || req.body.content == '') {
    res.json(false);
  } else {
    var newArticle = {
      author: req.session.username,
      title: req.body.title,
      content: req.body.content,
      comment: [],
      hidden: false
    };
    Article.create(newArticle, function(err, article) {
      if (err) {
        console.log("create a new article failed: " + err);
      } else {
        console.log(`create a new article succeed: ${article.title}...`);
        res.json(article);
      }
    });
  }
};

// PUT

var editPost = function(req, res) {
  var id = req.params.id;
  Article.findById(id).exec(function(err, article) {
    if (err) return console.log("find article by id from db failed...");

    if (article != null) {
      article.title = req.body.title;
      article.content = req.body.content;
      article.comment = req.body.comment;
      article.save();
      res.json(true);
    } else {
      res.json(false);
    }
  });
};

// DELETE

var deletePost = function(req, res) {
  var id = req.params.id;
  Article.findById(id).exec(function(err, article) {
    if (err) return console.log("find article by id from db failed...");

    if (article != null) {
      article.remove();
      res.json(true);
    } else {
      res.json(false);
    }
  });
};

var status = function(req, res) {
    if (req.session.username) {
        res.json({
            signin: true,
            user: req.session.username,
            isAdmin: (req.session.username === 'liaozelin' ? true : false)
        });
    } else {
        res.json({
            signin: false,
            user: ""
        });
    }
}

var account = function(req, res) {
  db.user.findOne({
    username: req.params.username
  }).exec(function(err, user) {
    if (err) return console.log("find article by id from db failed...");

    if (user != null) {
      var sendUser = {
        username: user.username,
        studentID: user.studentID,
        phone: user.phone,
        email: user.email
      };
      res.json({
        user: sendUser
      });
      // res.json(true);
    } else {
      res.json(false);
    }
  });
}

var quit = function(req, res) {
    console.log("GET /quit...");
    delete req.session.username;
    res.json(true);
}

module.exports = {
  'GET /api/posts': posts,
  'GET /api/post/:id': post,
  'POST /api/post': addPost,
  'PUT /api/post/:id': editPost,
  'DELETE /api/post/:id': deletePost,
  'GET /api/status': status,
  'GET /api/account/:username': account,
  'GET /api/quit': quit
}
