const fs = require('fs');

const { userAgent, env } = require('./');

const sslCert = env === 'development' ?
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('certificate.pem')
  } :
  {};

module.exports = {
  headers: {
    'accept': 'application/vnd.github.v3+json',
    'content-type': 'application/json',
    'user-agent': userAgent,
  },
  port: 443,
  rejectUnauthorized: false,
  ...sslCert,
};
