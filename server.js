const http = require('http');
const app = require('./app')

//select port from env or 3000 by env
const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port);
