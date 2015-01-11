/*
  filename  root.js
  path      /app/controller/
  purpose   contain routes implementation
*/

module.exports = function(req, res) {
  var SSH = require('simple-ssh');

  var ssh = new SSH({
    host: '192.168.122.15',
    user: 'wpee',
    key: '/home/asep/.ssh/id_rsa'
  });

  ssh.exec('echo $PATH', {
    out: function(stdout) {
      console.log(stdout);
      res.send(stdout);
    }
  }).start();


}
