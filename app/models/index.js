/*
  filename  index.js
  path      /app/model/
  purpose   module loader
*/

module.exports = function(includeFile) {
  return require('./'+includeFile+'.js');
}
