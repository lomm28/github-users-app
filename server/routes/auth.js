const passport = require('passport');
const { stringify } = require('flatted');
const getGitHubData = require('../middlewares/getGithubData');
const { host } = require('../config');

module.exports = app => {
  app.get('/', async (req, res) => {
    const data = {
      session: req.cookies[host] && JSON.parse(req.cookies[host])
    };

    if (data.session && data.session.token) {
      let githubData;
      try {
        githubData = await getGitHubData(data.session.token);
      } catch (error) {
        githubData = { error };
      }
      Object.assign(data, githubData);
    }

    if (data.session) {
      data.session.token = 'mildly obfuscated.';
    }
    data.json = stringify(data, null, 2);

    res.render('main', data);
  });
  app.get('/logoff', (req, res) => {
    res.clearCookie(host);
    res.redirect('/');
  });
  app.get('/auth/github', passport.authenticate('github'));
  app.get(
    '/login/github/return',
    passport.authenticate(
      'github',
      { successRedirect: '/setcookie', failureRedirect: '/' }
    )
  );
  app.get('/setcookie', (req, res) => {
    const data = {
      user: req.session.passport.user.profile._json,
      token: req.session.passport.user.token
    };
    res.cookie(host, JSON.stringify(data));
    res.redirect('/');
  });
};
