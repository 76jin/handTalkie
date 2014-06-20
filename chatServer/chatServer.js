var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , cors = require('cors')
  , path = require('path');

var mysql = require('mysql');
var dbPool = mysql.createPool({
  host : '127.0.0.1',
  port : 3306,
  user : 'talkie',
  password : 'talkie',
  database : 'talkiedb',
  connectionLimit:20,
  waitForConnections:true
});

// DB Connection 연결
/* ConnectionPool 사용하면 이거 필요 없음.
connection.connect(function(err){
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
  console.log('이 코드는 언제 호출되는걸까?');
});
*/

// Cross domain 문제 해결
// ("URL" not allowed by Access-Control-Allow-Origin)
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
/////////////////////////////////////////////////

// express를 위한 환경 변수 설정
//all environments
app.set('port', process.env.PORT || 9998);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: "talkie"}));
app.use(app.router);
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우팅 
app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/img', express.static(__dirname + '/public/img'));
app.get('/:id', function (req, res, next) {
  console.log('req:id - ', req.params.id);
  next();
});

/* session 정보 
 *  - req.session.userNo : 사용자 번호
 *  - req.session.chatList : 현재 채팅방의 채팅 참여자들의 번호
 *  - req.session.currentChatRoomNumber : 현재 채팅방 번호
 */
var serverUrl = "http://home.java48.com:9977/talkie/";
var chatServerUrl = "http://home.java48.com:9978";
var TOTALNUM = 30;  // 채팅방 접속 가능한 최대 인원 수
//sessionSockets = new SessionSockets(io, sessionStore, cookieParser,'talkie');
////// 전역 변수 끝 /////


app.get('/users/:id?', function(req, res, next){
  var id = req.params.id;
  console.log('users:id - ', id);
  
  if (id) {
    // 현재 채팅방 번호를 세션에 저장한다.
    req.session.currentChatRoomNumber = id;
    
    var memberList = [];
    var membersData = [];
    
    dbPool.getConnection(function(err, connection){
      var query = connection.query(
          'SELECT MEMBER from SE_CHATTINGROOM where CHATROOMNO=?', id, function(err, rows){
        if (err) {
          connection.release(); // to prevent connectino leak.
          throw err;
        }
        
        // 현재 채팅방 번호 저장.
        res.cookie('currentChatRoomNumber', id);
        
        // 현재 채팅방에 있는 사용자들의 번호,이름,사진경로를 쿠키와 세션에 저장.
        console.log('rows:', rows);
        console.log('rows[0].MEMBER:', rows[0].MEMBER);

        memberList = []; // 기존값 초기화
        var tempArray = rows[0].MEMBER.split(",");
        for (var i=0; i < tempArray.length; i++) {
          memberList.push(Number(tempArray[i]));
        }
        
        res.cookie('memberList', memberList);
        req.session.memberList = memberList;
        console.log('memberList:', memberList);
        connection.release();   // to prevent connection leak.
        
        dbPool.getConnection(function(err, connection){
          
          console.log('memberList:', memberList);
          console.log('typoef memberList:', typeof(memberList));
          
          var queryString =
            "SELECT UNO,NAME,PHOPATH from SE_USERS where UNO in " +
            " (" + dbPool.escape(memberList) + ")";// + dbPool.escape();
          
          var query = connection.query(queryString, function(err, rows){
            if (err) {
              connection.release(); // to prevent connection leak.
              throw err;
            }
            
            // 현재 채팅방에 있는 사용자들의 번호,이름,사진경로를 쿠키와 세션에 저장.
            membersData = []; // 기존값 초기화
            console.log('members rows:', rows);
            for (var i=0; i<rows.length; i++) {
              membersData.push(rows[i]);
            }
            
            res.cookie('membersData', membersData);
            req.session.membersData = membersData;
            console.log('membersData:', membersData);
            connection.release();   // to prevent connectino leak.
            
            // 채팅방으로 이동.
            console.log('===== __dirname:', __dirname);
            res.sendfile(__dirname + '/index.html');
          }); // end inner query.
        }); // end inner connection.
        
      }); // end outer query.
    });
    
  } else {
      console.log('Error: No id!!');
  }
  

});
app.get('/getUsers', function(req, res){
  dbPool.getConnection(function(err, connection){
    var query = connection.query('SELECT * from SE_USERS', function(err, rows){
      if (err) {
        connection.release(); // to prevent connectino leak.
        throw err;
      }

      console.log(rows);
      res.json(rows);
      connection.release();   // to prevent connectino leak.
    });
    console.log(query);
  });
});

app.get('/getuserno.jsonp*', function(req, res){
  console.log('query: ', req.query);
  var callback = req.param('callback');
  res.send(callback +
      '(' +
      JSON.stringify({
        status: 'ok',
        data: 'success get'
      }) +
      ')'
      );
});

app.get('/newSetupChat.jsonp*', function(req, res, next){
  console.log('query: ', req.query);
  var callback = req.param('callback');
  
  // 파라미터 세션에 저장
  var userNo = req.query.userNo;
  var chatList = req.query.chatList;
  console.log('parameter: ', userNo, chatList);
  
  req.session.userNo = userNo;
  req.session.chatList = chatList;
  console.log('req session userNo: ', req.session.userNo);
  console.log('req session chatList: ', req.session.chatList);
  
  // response에 쿠키 생성하여 전달.
  res.cookie('chatUserNo', userNo);
  res.cookie('chatList', chatList);
  
  // 웹브라우저에서 채팅방 설정하기
  // To do ...
  var insertId = 0;
  var chatMembers = [];
  for (var i=0; i < chatList.length; i++) {
    chatMembers.push(chatList[i]);
  }
  console.log('chatMembers:', chatMembers);
  
  
  dbPool.getConnection(function(err, connection){
    var queryString =
      "INSERT INTO SE_CHATTINGROOM" +
      " (TOTALNUM,CURRENTNUM,LOCNAME,ISAUTO,MEMBER)" +
      " VALUES (" +
      TOTALNUM +
      "," + userNo +
      ",''" +
      ",'N'" +
      ", '" + chatMembers + "'" +
      ")";// + dbPool.escape();
    console.log('queryString:', queryString);
    var query = connection.query(queryString, function(err, rows){
      if (err) {
        connection.release(); // to prevent connectino leak.
        throw err;
      }

      console.log('insert return:', rows);
      console.log('insertId:', rows.insertId);
      insertId = rows.insertId;
      //req.session.currentChatRoomNumber = insertId;
      
      // 웹브라우저에게 채팅방 번호를 보내준다.
      console.log('=====insertId:', insertId);
      var resultData;
      if ( insertId === 0 ) {
        resultData =
        {
          ajaxResult:
          {
            status: 'ok',
            data: 'failure'
          }
        };
      } else {
        resultData =
        {
          ajaxResult:
          {
            status: 'ok',
            data:
            {
              chatRoomNumber: insertId,
              chatList: chatList,
            }
          }
        };
      }
      
      res.send(callback +
          '(' +
          JSON.stringify(resultData) +
          ')'
      );
      
      connection.release();   // to prevent connectino leak.
    });
    //console.log(query);
  });
});
  

app.get('/', function (req, res) {
  console.log('__dirname:', __dirname);
  console.log('chatServerUrl:', chatServerUrl);
  //res.sendfile(chatServerUrl + '/index.html');
  //res.sendfile(__dirname + '/index.html');
  //location.href = '192.168,200.10:9999/';
  //location.href = '192.168,200.10:9999/';
});

// 서버 실행
server.listen(app.get('port'), function(){
  console.log('server is started. port: ', app.get('port'));
});

/////////////////////////////////////////
var usernames = '홍길동';       // 현재 접속한 사용자명
var rooms = [];  // 사용가능한 채팅방 목록

io.sockets.on('connection', function (socket) {


  // 웹브라우저가 ADD_USER 이벤트를 보내면 실행된다.
  socket.on('ADD_USER', function(addUserParam){
    
    // 이 사용자에게 채팅 서버에 접속되었다고 알린다.
    
    console.log('00000 addUserParam:', addUserParam);
    console.log('00000 currentChatRoomNumber:', addUserParam.currentChatRoomNumber);
    socket.userInfo = addUserParam.userInfo; // 웹브라우저에게 받은 사용자 이름을 저장한다.
    socket.room = addUserParam.currentChatRoomNumber;      // 이 사용자의 채팅방 이름을 저장한다.
    usernames[addUserParam.userInfo.UNO] = addUserParam.userInfo.UNO; // 사용자 목록을 관리하는 변수에 이름저장.
    socket.join(addUserParam.currentChatRoomNumber);           // 이 사용자를 이 채팅방에 넣어준다.
    
    /*
    var isNewRoom = true;
    for (var i=0; i<rooms.lengh; i++) {
      if (rooms[i] == socket.room) {
        isNewRoom = false;
        break;
      }
    }
    if (isNewRoom) {
      rooms.push(socket.room);
      console.log('updated rooms:', rooms);
    }
    */
    
    // 이 사용자에게 채팅 서버에 접속되었다고 알린다.
    socket.emit('UPDATE_CHAT', 'SERVER', 'you have connected to ' + socket.room);
    // 웹브라우저가 SEND_CHAT 이벤트를 보내면 실행된다.
    socket.on('SEND_CHAT', function (data) {
      // 같은 채팅방 안에 있는 웹브라우저에게 UPDATE_CHAT 이벤트를 보낸다.
      io.sockets.in(socket.room).emit('UPDATE_CHATS', socket.userInfo, data);
    });

    // 이 채팅방에만 사용자가 추가되었다는 메시지를 보낸다.
    // 이 채팅방에 있는 모든 사용자들에게만 사용자가 추가되었다는 메시지를 보낸다.
    socket.broadcast.to(socket.room).emit('UPDATE_CHAT', 'SERVER', socket.userInfo.NAME + ' has connected to this room');
    socket.emit('UPDATE_ROOMS', rooms, socket.room);  // what rooms?
  });

  /*
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

  */
  
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