var http = require('http');
const reqPromise = require("request-promise");
http.createServer(function (req, res) {
  var options = {
    method: req.method,
    uri: `https://freelancer.com${req.url}`
  };
  const x = reqPromise(options);
  req.pipe(x)
  x.pipe(res)
}).listen(8080);