const express = require('express');
const app = express();
const routes = require('../app/routes/index');

// middleware
app.use(express.json());

// routes
app.use('/api', routes);

module.exports = app;
