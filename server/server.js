const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

//DB config
const db = require('../config/keys').mongoURI;
//Connect to db
mongoose.connect(db).then(() => console.log(`Connected to the database ${db}`)).catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true,
	})
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
