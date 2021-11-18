require("dotenv").config()
const express = require("express")
const app = express()
const FBA = require ("./src/facebook-api/facebook-api")
const FBcontrol= require("./src/facebook-api/mess-controller")
const server = require('http').createServer(app);
const io = require("socket.io")(server);

FBcontrol.socketInit(io)
app.use(express.json({'content-type':'application/json'}))
app.use(express.urlencoded({ extended: false }))
app.use("/",FBA)

server.listen(3001,()=>{
    console.log("server listening in port 3001")
})