var WebSocketServer = require('websocket').server;
var http = require('http'),
    https = require('https');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  if (req.url == "/") {
            fs.readFile("/index.html", function (err, data2) {
                if (err) {
                    res.writeHead(404);
                    //res.write(err);
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data2);
                    res.end();
                }
            });
  }
});
server.listen(process.env.PORT || 5000);

// create the server
wsServer = new WebSocketServer({
  httpServer: server,
  keepAlive: 10000
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  var index = clients.push(connection) - 1;
  console.log((new Date()) + ' Connection accepted.');
  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      var data = message.utf8Data;
      var parseJson = JSON.parse(data);
      if (parseJson['first'] == true) {
        var gpin = parseJson['gpin'];
        var bamount = parseJson['amount'];
        global.name = gpin;
        global.amount = bamount;
        require('./cluster.js');
      } else if (parseJson['first'] == false) {
        //handle update messages
      }
    }
  });
  const interval = setInterval(function getamount() {
    var amount2 = global.bots;
    var adata = '{"' + 'amount' + '":"' + amount2 + '"}'
    if (amount2 != null) {
      connection.send(adata);
    }
  }, 3000);

  connection.on('close', function(connection) {
    // close user connection
  });
});
