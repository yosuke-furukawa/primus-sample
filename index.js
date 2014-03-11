var Primus = require('primus');
var http = require('http');
var koa = require('koa');
var path = require('path')
var staticCache = require('koa-static-cache')
var app = koa();



app.use(staticCache(path.join(__dirname, 'public'), {
    maxAge: 365 * 24 * 60 * 60
}))

var server = http.createServer(app.callback());
var primus = new Primus(server);


primus.library();

primus.on('connection', function (spark) {
  console.log("connection");
});

primus.on('disconnection', function (spark) {
  console.log("disconnection");
});

server.listen(3000);
