const GithubStrategy = require('passport-github').Strategy;
const { githubClient, githubSecret } = require('../config');

const scopes = ['notifications', 'user:email', 'read:org', 'repo'];

module.exports = new GithubStrategy(
  {
    clientID: githubClient,
    clientSecret: githubSecret,
    callbackURL: '/login/github/return',
    scope: scopes.join(' '),
    proxy: true
  },
  (token, tokenSecret, profile, cb) => cb(null, { profile, token })
);
