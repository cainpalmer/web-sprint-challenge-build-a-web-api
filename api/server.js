
// Express
const express = require('express');
const server = express();

// Routers
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

// Use Server
server.use(express.json())
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

// Exports
module.exports = server;
