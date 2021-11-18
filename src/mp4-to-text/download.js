var https = require("https");
var fs = require("fs");
const spawn = require("child_process").spawn;

function get(url, cb) {
  var file = fs.createWriteStream("./src/mp4-to-text/input.mp4");
  https.get(url, function (response) {
    response.pipe(file);
    file.on("finish", function () {
      file.close(() => {
        spawn("python", ["./src/mp4-to-text/main.py"]).stdout.on(
          "data",
          function (data) {
            cb(decodeURI(data));
          }
        );
      });
    });
  });
}

module.exports = {
  get,
};

