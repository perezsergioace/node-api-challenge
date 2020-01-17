const express = require('express');

const projectRouter = require('./projectRouter/projectRouter');
const actionRouter = require('./actionRouter/actionRouter');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('If you see this it is working! (Sprint Challenge)')
});

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;