/*
 * file   bootstrap.js
 * path   /common/
 * purpose  container of bootstrap init
 */

exports = module.exports.main = function () {
  var express = require('express');

//  console.log(basepath);

  var app = express();

  return app;
}

exports = module.exports.config = function () {
  var path = require('path');
  var basepath = path.dirname(process.mainModule.filename);

  app.set('basepath', basepath);
  app.set('configloc', path.join(basepath, './config/config.conf'));

  //console.log(path.join(basepath,'./config/express.js'));
  require(path.join(basepath, './config/express.js'));
  require(path.join(basepath, './config/routes.js'));

  return app;
}

exports = module.exports.db = function () {
  var db = require('mongoose');//,
      // autoIncrement = require('mongoose-auto-increment');
  db.connect('mongodb://localhost/controller');
  // autoIncrement.initialize(db);

  // setter
  app.set('db', db);
  // app.set('autoIncrement', autoIncrement);

  // app.models = require('../app/model');

  return app;
}
