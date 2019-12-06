const GithubStrategy = require('passport-github').Strategy;
const { githubClient, githubSecret, port, host } = require('../config');

const scopes = ['notifications', 'user:email', 'read:org', 'repo'];

module.exports = new GithubStrategy(
  {
    clientID: githubClient,
    clientSecret: githubSecret,
    //callbackURL: `https://${process.env.APP_HOST}/login/github/return`,
    callbackURL: `http://${host}:${port}/login/github/return`,
    scope: scopes.join(' ')
  },
  (token, tokenSecret, profile, cb) => cb(null, { profile, token })
);
