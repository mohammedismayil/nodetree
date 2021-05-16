var http = require('http');
var dateobj = require('./dateModule')
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  res.write(req.url);

  res.write("The date and time are currently: " + dateobj.myDateTime());
  res.end('Hello World!');
}).listen(8080);