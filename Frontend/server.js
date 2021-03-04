const http = require('http');
const app = require('/opt/opencmas/Frontend/app.js');
const {backend} = require('/opt/opencmas/backend/daemon/main.js')


const port = 3000;

const server = http.createServer(app);

server.listen(port);

backend();