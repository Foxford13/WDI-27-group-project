const router = require('express').Router();
const postsController = require('../controllers/posts');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const imageUpload = require('../lib/imageUpload');

router.route('/posts')
.get(postsController.index)
.post(secureRoute, postsController.create);

router.route('/posts/:id')
.all(secureRoute)
.get(postsController.show)
.put(postsController.update)
.delete(postsController.delete);

router.route('/posts/:id/comments')
.post(secureRoute, postsController.addComment);

router.route('/posts/:id/comments/:commentId')
.delete(secureRoute, postsController.deleteComment);

router.route('/register')
.post(imageUpload, auth.register);

router.route('/login')
.post(auth.login);

router.route('/oauth/facebook')
.post(oauth.facebook);

router.route('/users/:id')
.get(users.show)
.put(users.update)
.delete(users.delete);

router.route('/users/:id/comments')
  .post(secureRoute, users.addComment);

router.route('/users/:id/comments/:commentId')
.delete(secureRoute, users.deleteComment);



router.all('/*', (req, res) => res.notFound());

module.exports = router;
