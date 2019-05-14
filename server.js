const app = require('express')();
const bodyParser = require('body-parser')
const router = require('./routes');

const server = require('http').createServer(app);

const oauth = require('./oauth');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.oauth = oauth

router(app);

server.listen(3000);