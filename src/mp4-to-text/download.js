var https = require('https');
var fs = require('fs');
const spawn = require("child_process").spawn;

function get(url, cb) {
  var file = fs.createWriteStream("./input.mp4");
  https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(
        spawn('python', ["./main.py"]).stdout.on('data', function (data) {
          cb(decodeURI(data))
        })
      );
    });
  });
}

module.exports = {
  get
}

//download ("https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg","./anh.jpg",null)