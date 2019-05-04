var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.broadcast.emit('chat system message', "user connected")
    socket.on('disconnect', function () {
        socket.broadcast.emit('chat system message', 'user disconnected');
    });
    socket.on('chat message', function (payload) {
        if (payload !== undefined && payload !== {}) {
            socket.broadcast.emit('chat message', payload)
        }
    });
    socket.on('user typing', function (payload) {
        if (payload.user !== undefined) {
            socket.broadcast.emit('user typing', payload)
        }
    });
    socket.on('user not typing', function (payload) {
        if (payload.user !== undefined) {
            socket.broadcast.emit('user not typing', payload)
        }
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');

});