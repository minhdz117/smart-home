require("dotenv").config()
const express = require("express")
const app = express()
const FBA = require ("./src/facebook-api/facebook-api")
const FBcontrol= require("./src/facebook-api/mess-controller")
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")(server);
const io = new Server(server);

FBcontrol.socketInit(io)
app.use(express.json({'content-type':'application/json'}))
app.use(express.urlencoded({ extended: false }))
app.use("/",FBA)

server.listen(3001,()=>{
    console.log("server listening in port 3001")
})