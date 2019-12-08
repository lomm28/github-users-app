require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  host: process.env.APP_HOST,
  port: process.env.PORT,
  githubClient: process.env.GITHUB_CLIENT_ID,
  githubSecret: process.env.GITHUB_CLIENT_SECRET,
  userAgent: process.env.USER_AGENT,
};
