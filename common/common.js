/*
    filename    common.js
    purpose     contain common function
*/

// remember there's function module.exports to exports as a module


module.exports.lib = {
    util: require('util'),
    fs: require('fs'),
    mongoose: require('mongoose')
};


/**
 * Fungsi chmod
 *
 * Fungsi ini bertindak sebagai penyederhana fungsi fs.chmod
 *
 * parameter    string  file    file yang akan dirubah modenya
 * parameter    octal   mode    mode perubahan
 * parameter    string  message pesan yang akan tampil ketika berhasil
 *
 * return       none
 */
exports.chmod = function (file, mode, message) {
    var fs = require('fs');
    fs.chmod(file, mode, function(err) {
        if (err) { console.log(err) }
        else if (typeof message !== 'undefined') {
            console.log(message);
        }
    });
};

/**
 * Fungsi mengambil konfigurasi
 *
 * Fungsi ini digunakan untuk mengambil konfigurasi dari file config
 *
 * parameter
 */

exports.confGet = function () {
    var yaml = require('yamljs'),
        config = './config/config.conf',
        fs = require('fs');

    if ( fs.existsSync( config )) {
        if ( fs.statSync( config ).isFile ) {
            return yaml.parse( fs.readFileSync( config, 'utf8' ));
        } else {
            console.log(config+' is not file');
        }
    } else {
        console.log('file config is not exists');
    }
}
exports.config = this.confGet();

/**
 * Fungsi generate random string
 *
 * Fungsi ini akan generate string acak, secara default
 * fungsi ini akan membuat string sepanjang 48 byte.
 *
 * parameter   integer integer length of string in byte
 * return      string  random string in specified length
 *
 */
exports.genrandkey = function(length) {
  var crypto = require('crypto');
  if ( typeof(length) == "undefined" ) { length = 63; }
  return crypto.randomBytes(length).toString('hex');
}

/**
 * showStatus
 *
 * show status of transaction
 *
 * @param   code    kode status
 * @param   message Pesan yang akan ditampilkan ke status
 *
 * @return  object  json object of status
 */

exports.showStatus = function(code, message) {
  var status = {};
  switch (code) {
      case 1:
        status.code = code;
        status.status = 'success';
      break;

      case 2:
        status.code = code;
        status.status = 'sent';
      break;

      case 3:
        status.code = code;
        status.status = 'corupt';
      break;

      case 4:
        status.code = code;
        status.status = 'queueing';
      break;

      case 5:
        status.code = code;
        status.status = 'fail';
      break;

      default:
        status.code = 9;
        status.status = 'Unknown error';
  }
  status.message = message;

  console.log(status);
  return status;
}

/**
 * savelog  Menyimpan history ke database
 *
 * Fungsi untuk melakukan penyimpanan riwayat ke database
 * Fungsi ini adalah fungsi yang akan dieksekusi di setiap pemanggilan API
 *
 * @param params  Parameter yang disimpan pada database
 *                {
 *                  hid: Number,
 *                  apikey: String,
 *                  start: Date,
 *                  end: Date,
 *                  activity: String
 *                }
 */
exports.saveLog = function(params) {
  var configloc = app.get('configloc'),
      db = app.get('db'),
      history = app.models('history'),
      start = new Date();
  var newHistory = new history(params);

  newHistory.save(function(err, record, numberAffected) {
    if (err) {
      console.log(params);
      console.log('fail to save history');
    } else {
      console.log(record);
      console.log('history saved');
    }
  })
}

/**
 * FindUserByApikey
 *
 * Mencari user dengan menggunakan APIkey
 *
 * @params  apikey    apikey yang digunakan untuk mencari user
 *
 * @return  object    informasi user
 */
function findUserByApikey(apikey, cb) {
  var db = app.get('db'),
      user = app.models('user'),
      retval;

  user.find({}, function(err, data){
    if (err) {
      cb(err);
    } else {
      data.forEach(function (elem, idx, array) {
//        console.log(el.apikey);
        return elem.apikey.filter(function (el) {
//          console.log(el.apikey);
          if (el.apikey === apikey) {
            cb(err, elem);
          }
        });
//        return array.apikey.filter(function (el) {
//          return el.apikey === apikey;
//        });
      });
    }
  });
}

function getRole() {
  return ['admin', 'user'];
}

function getPermissionByRole(role) {

}

/**
 * verifyKey
 *
 * fungsi untuk menguji apakah APIkey sudah valid atau belum.
 *
 * @param   key       string    APIkey yang akan diuji
 * @param   callback  function  fungsi callback yang akan dipanggil
 *                              setelah pengujian berhasil atau gagal.
 *                              parameter ini dapat dikosongkan kalau
 *                              ingin eksekusi sebagai sync.
 * @return  Boolean             Kalau Sync.
 */
exports.verifyKey = function (key, callback) {
  var config = require('yaml-config')
         .readConfig(app.get('configloc'), 'default'),
      masterkey = config.masterkey;

  if (typeof (callback) === "undefined") {
    if (key === masterkey) {
      return true;
    } else {
      findUserByApikey(key, function(err, data) {
        if (err) {
          console.log('salah bro');
          return false;
        } else {
          console.log(data);
          return true;
        }
      });
//      return false;
    }
  } else {
    if (key === masterkey) {
      callback(true);
    } else {
      findUserByApikey(key, function(err, data) {
        if (err) {
          console.log('salah bro');
          callback(false);
        } else {
          console.log(data);
          callback(true);
        }
      });
//      callback(false);
    }
  }
}
