const fs = require('fs');

const led = JSON.parse(fs.readFileSync('../iot-data/led.json'));
const air = JSON.parse(fs.readFileSync('../iot-data/air.json'));

var ledStatus = { 
    "thietbi":"led",
    "power":"",
    "lever":""
}
var airStatus = {
    "thietbi":"air",
    
}

function send (io,cmt,cb) {
    if (cmt.thietbi=="led"){
        if (cmt.power){
            led[cmt.power]
        }else{
            led[cmt.updown]
        }
    }else if (cmt.thietbi=="air"|cmt.tem|cmt.hotcool){
        if (cmt.power){
            air[cmt.power]
        }else if (cmt.hotcool){
            air[cmt.hotcool]["default"]
        }else if (cmt.tem){
            air[cmt.hotcool][cmt.tem]
        }
    } 
    io.sockets.emit(data)
}

module.exports={
    send
}