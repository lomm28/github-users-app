// const options = {
//   host: 'api.github.com',
//   port: 80,
//   path: '/users',
//   method: 'GET',
//   headers: req.headers
// };

module.exports = app => {
  app.get('/api/users?since={number}', (req, res) => {
    console.log(req, res);
  });
  app.get('/api/users/:username/repos', (req, res) => console.log(req, res));
  app.get('/api/users/:username/details', (req, res) => console.log(req, res));
};
