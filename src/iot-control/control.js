const fs = require('fs');

const led = JSON.parse(fs.readFileSync('../iot-data/led.json'));
const air = JSON.parse(fs.readFileSync('../iot-data/air.json'));

function send (io,cmt,cb) {
    if (cmt.thietbi=="led"){

    }else if (cmt.thietbi=="air"|cmt.tem|cmt.hotcool){

    } 
    io.sockets.emit(data)
}

module.exports={
    send
}