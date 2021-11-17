function send (io,data) {
    io.sockets.emit(data)
}

module.exports={
    send
}