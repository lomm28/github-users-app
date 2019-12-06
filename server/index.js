const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const crypto = require('crypto');
const passport = require('passport');
const githubStrategy = require('./middlewares/githubStrategy');
const exphbs = require('express-handlebars');

const { env, port } = require('./config');

const app = express();

passport.use(githubStrategy);

passport.serializeUser(function(user, done) {
	done(null, user)
});

passport.deserializeUser(function(obj, done) {
	done(null, obj)
});

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(
    expressSession({
        secret: crypto.randomBytes(64).toString('hex'),
        resave: true,
        saveUninitialized: true
    })
);

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const hbs = exphbs.create({
	layoutsDir: __dirname + '/views'
})
app.engine('handlebars', hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

require('./routes/proxy')(app);
require('./routes/auth')(app);

if(env === 'production') {
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = port || 5000;

app.listen(PORT, () => console.log(`Express is running on port ${PORT}`));