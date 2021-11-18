const fs = require('fs');

const led = JSON.parse(fs.readFileSync('c:/Users/Administrator/Desktop/smart-home/src/iot-data/led.json'));
const air = JSON.parse(fs.readFileSync('c:/Users/Administrator/Desktop/smart-home/src/iot-data/air.json'));

var ledStatus = { 
    "thietbi":"led",
    "power":"",
    "lever":0
}
var airStatus = {
    "thietbi":"air",
    "power":"",
    "tem":"23",
    "hotcool":"cool"
}

function send (io,cmt,cb) {
    if (cmt["thietbi"]=="led"|cmt["power"]=="sleep"){
        if (cmt.power){
            io.sockets.emit("led",led[cmt.power])
            console.log(led[cmt.power])
            ledStatus.power=cmt.power
            if (cmt.power=="on"){
                ledStatus.lever=6
            }else if(cmt.power="off"){
                ledStatus.lever=0
            }else{
                ledStatus.lever=1
            }
        }else{
            io.sockets.emit("led",led[cmt.updown])
            if (cmt.updown=="up"){
                if (ledStatus.lever==6) ledStatus.lever++
            }else{
                if (ledStatus.lever==0) ledStatus.lever--
            }
        }
    }else if (cmt["thietbi"]=="air"|cmt.tem|cmt.hotcool|cmt.power=="powerfull"){
        if (cmt.hotcool){
            airStatus.hotcool=cmt.hotcool
        }
        if(cmt.tem){
            io.sockets.emit("air",air[airStatus.hotcool][cmt.tem])
            airStatus["tem"]=cmt.tem
        }else if (cmt.power){
            if (cmt.power=="on"){
                io.sockets.emit("air",air[airStatus.hotcool]["default"])
            }else if(cmt.power=="powerfull"){
                io.sockets.emit("air",air[cmt.power])
            }else {
                io.sockets.emit("air",air[cmt.power])
            }
            airStatus.power=cmt.power
        }
    } 
}

module.exports={
    send
}

//send(null,{ thietbi: 'air', power: 'on' },null)