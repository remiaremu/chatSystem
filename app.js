var express= require('express'),
        app= express();
        
app.get('/',function(req,res){
        res.sendfile(__dirname +   '/index.html');
});
var server= require('http').createServer(app),
    io = require('socket.io')(server);

io.on("connection", function(socket) {
	console.log("A User connected");
    socket.on('username',function(msg, loct){
        console.log('User:' + msg);
        console.log('Loc:' + loct);
        var user = msg;
        var Loc = msg;
        socket.on('chatmessage',function(msg, date){
            console.warn("new message from user ", user, " :: ", msg, date);
            io.emit('receivemessage', msg, date);
        });
    });
    
});
server.listen(8080);
