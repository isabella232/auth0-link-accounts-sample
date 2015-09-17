var express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
	//returning req.user._json, since it contains the user_metadata and app_metadata properties the root user doesn't have.
  res.render('user', { user: req.user._json, provider: req.user.provider, env:env, access_token:req.session.accessToken });
});

module.exports = router;