var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , cors = require('cors');

server.listen(9997);

// Cross domain 문제 해결
// ("URL" not allowed by Access-Control-Allow-Origin)
app.use(cors());
app.use(app.router);

// 라우팅 
app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/img', express.static(__dirname + '/public/img'));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var usernames = [];       // 현재 접속한 사용자명
var rooms = ['room1', 'room2', 'room3'];  // 사용가능한 채팅방 목록

io.sockets.on('connection', function (socket) {


  // 웹브라우저가 ADD_USER 이벤트를 보내면 실행된다.
  socket.on('ADD_USER', function(username){
    socket.username = username; // 웹브라우저에게 받은 사용자 이름을 저장한다.
    socket.room = 'room1';      // 이 사용자의 채팅방 이름을 저장한다.
    usernames[username] = username; // 사용자 목록을 관리하는 변수에 이름저장.
    socket.join('room1');           // 이 사용자를 이 채팅방에 넣어준다.
    
    // 이 사용자에게 채팅 서버에 접속되었다고 알린다.
    socket.emit('UPDATE_CHAT', 'SERVER', 'you have connected to' + socket.room);
    
    // 웹브라우저가 SEND_CHAT 이벤트를 보내면 실행된다.
    socket.on('SEND_CHAT', function (data) {
    	// 같은 채팅방 안에 있는 웹브라우저에게 UPDATE_CHAT 이벤트를 보낸다. 
    	io.sockets.in(socket.room).emit('UPDATE_CHATS', socket.username, data);
    });

    // 이 채팅방에만 사용자가 추가되었다는 메시지를 보낸다.
    socket.broadcast.to(socket.room).emit('UPDATE_CHAT', 'SERVER', username + ' has connected to this room');
    socket.emit('UPDATE_ROOMS', rooms, socket.room);  // what rooms?
  });

  // 웹브라우저가 SWITCH_ROOM 이벤트를 보내면 실행된다.
  socket.on('SWITCH_ROOM', function(newroom){
    socket.leave(socket.room);    // 현재 채팅방을 떠난다.(현재 접속한 채팅방은 세션에 저장되어 있다.)
    socket.join(newroom);         // 새로운 채팅방으로 들어간다.
    
    socket.emit('UPDATE_CHAT', 'SERVER', 'you have connected to '+ newroom);
    
    // 이전 채팅방에는 이 사용자가 방을 나갔다는 메시지를 보낸다.
    socket.broadcast.to(socket.room).emit('UPDATE_CHAT', 'SERVER', socket.username+' has left this room');
    
    socket.room = newroom;        // 현재 채팅방 이름을 저장한다.
    socket.broadcast.to(newroom).emit('UPDATE_CHAT', 'SERVER', socket.username+' has joined this room');
    socket.emit('UPDATE_ROOMS', rooms, newroom);
  });

  // 사용자가 접속을 끊으면 실행된다.
  socket.on('disconnect', function(){
    delete usernames[socket.username];  // 사용자 목록에서 이 사용자 삭제.
    
    // 웹브라우저에게 사용자 목록이 변경되었다는 메시지를 보낸다.
    io.sockets.emit('UPDATE_USERS', usernames);
    
    // 모든 사용자들에게 이 사용자가 채팅 서버에서 나갔다는 메시지를 보낸다.
    socket.broadcast.emit('UPDATE_CHAT', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });
});