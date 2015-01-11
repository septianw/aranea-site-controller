/*
  filename  app.js
  path      /
  purpose   main entrance
*/

var bootstrap = require('./common/bootstrap.js'),
    port = 3001
app = bootstrap.main();
bootstrap.config();
bootstrap.db();

app.listen(port);
console.log('Application start on port ' + port);
