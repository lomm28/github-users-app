const { https } = require('follow-redirects');
const options = require('../config/reqOpts');
const httpsReqHandler = require('../utils/httpsReqHandler');

module.exports = (URL, res) => {
  const composedHandler = gitHubResponse =>
    httpsReqHandler(gitHubResponse, res);

  return https.get(URL, options, composedHandler).on('error', e => {
    console.error(`Got error: ${e.message}`);
  });
};
