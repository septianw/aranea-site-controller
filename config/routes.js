/*
  filename  routes.js
  path      /config/
  purpose   contain routes
*/

var root = require('../app/controllers/root.js');

app.get('/', root);
