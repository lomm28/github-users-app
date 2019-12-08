const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const crypto = require('crypto');

const { env, port } = require('./lib/config');

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(
  expressSession({
    secret: crypto.randomBytes(64).toString('hex'),
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require('./lib/routes/proxy')(app);

if (env === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = port || 5000;

app.listen(PORT, () => console.log(`Express is running on port ${PORT}`));

process.on('warning', e => console.warn(e.stack));
