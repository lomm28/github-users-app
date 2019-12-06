require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  githubClient: process.env.GITHUB_CLIENT_ID,
  githubSecret: process.env.GITHUB_CLIENT_SECRET,
};
