const { https } = require('follow-redirects');
const fs = require('fs');

module.exports = app => {
  app.get('/api/users/:limit', (req, res) => {

    // const { limit } = req.params;

    // console.log(req.headers);
    // req.setHeader('Content-Type', 'application/json');
    // res.setHeader('Accept', 'application/vnd.github.v3+json');
    // res.setHeader(
    //  'Authorization',
    //  '7b771dd4a54a121841e0c941d51c4f1bc6683fca'
    //  );
    const options = {
      headers: req.headers,
      port: 443,
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('certificate.pem'),
      rejectUnauthorized: false,
    };

    return https.get('https://api.github.com/users/lomm28', options, response => {
      const { statusCode } = response;
      const contentType = response.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`);
      }

      if (error) {
        console.error(error.message);
        response.resume();
        return;
      }

      response.setEncoding('utf8');

      let rawData = '';

      response.on('data', chunk => {
        console.log(chunk);
        rawData += chunk;
      });
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          res.send(parsedData);
          res.end();
        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', e => {
      console.error(`Got error: ${e.message}`);
    });

  });

  app.get('/api/users/:username/repos', (req, res) => console.log(req, res));
  app.get('/api/users/:username/details', (req, res) => console.log(req, res));
};
