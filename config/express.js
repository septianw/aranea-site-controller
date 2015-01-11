/*
  filename  express.js
  path      /config/
  purpose   extra configuration for express middleware
*/

//module.exports = function (app) {
app.use (function(req,res,next){
  var data = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){
    data += chunk;
  });

  req.on('end', function(){
    req.body = data;
    next();
  });
});
app.disable("x-powered-by");
app.use (function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT, OPTIONS");
//  res.removeHeader("x-powered-by");
  next();
});

//}
