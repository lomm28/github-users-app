const makeHttpsReq = require('../utils/makeHttpsReq');

module.exports = app => {
  app.get('/api/users/:page', (req, res) => {
    const { page } = req.params;

    const URL = Number(page) === 1 ?
      'https://api.github.com/users' :
      `https://api.github.com/users?since=${page}`;

    return makeHttpsReq(URL, res);
  });

  app.get('/api/users/:username/repos', (req, res) => {
    const { username } = req.params;

    const URL = `https://api.github.com/users/${username}/repos`;

    return makeHttpsReq(URL, res);
  });

  app.get('/api/users/:username/details', (req, res) => {
    const { username } = req.params;

    const URL = `https://api.github.com/users/${username}`;

    return makeHttpsReq(URL, res);
  });
};
