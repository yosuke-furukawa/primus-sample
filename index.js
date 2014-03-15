var Primus = require('primus');
var http = require('http');
var koa = require('koa');
var path = require('path')
var serve = require('koa-static')
var validator = require('validator');
var app = koa();

app.use(serve("public"));

var server = http.createServer(app.callback());
var primus = new Primus(server);


// setting primus/primus.js
primus.library();

// connect hook
primus.on('connection', function (spark) {
  console.log("connection");
  // spark is the new connection
  console.log("spark headers : ", spark.headers);
  console.log("spark address : ", spark.address);
  // query string sockjs not supported
  console.log("spark query : ", spark.query);
  // spark id can get client id
  console.log("spark id  : ", spark.id);

  // send Connect message to one connect client
  spark.write("CONNECT!!!");
  // receive data
  spark.on("data", function(data) {
    console.log(data);
    // broadcast all client
    primus.write(validator.escape(data));
  });
});


// disconnect hook
primus.on('disconnection', function (spark) {
  console.log("disconnection");
});

server.listen(3000);
