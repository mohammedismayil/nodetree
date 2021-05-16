var http = require('http');
var dateobj = require('./dateModule');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  // var q = url.parse(req.url, true).query;
  // var txt = q.year + " " + q.month;
  // res.end(txt);
 
  res.write("The date and time are currently: " + dateobj.myDateTime());
  res.end('Hello World!');
}).listen(8080);