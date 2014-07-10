/* 생성자 함수
 * 목적: 지도에 표시되는 사용자 위치 정보를 저장하는 객체
 * 사용법
 *   ex) UserPositionInfo.me = new UserPositionInfo.Create([userNo], [userGPSPos]);
 *   ex) UserPositionInfo.others_01 = new UserPositionInfo.Create([userNo], [userGPSPos]);
 *   - [userNo] : DB에서 읽어온 사용자 번호
 *   - [userGPSPos]: 서버에서 받은 이 사용자의 현재 위치정보
 
var UserPositionInfo.Create = function(userNo, userPosition) {
  this.userNo = userNo;
  this.userPosition = userPosition;
}*/


var snapper;
var serverUrl;
var chatServerUrl;
var name;
window.onload = mainTap;

$(function() {
  snapper = new Snap({
    element: document.getElementById('content')
  });
});

function aaa(){
  $.ajax( serverUrl +'/profileInfo.ajax', {
    type: 'POST',
    dataType: 'json', /*서버에서 보내는 데이터의 형식 지정 */
    data: { /* 서버쪽으로 보내는 데이터 */
      //email: $('#email').val(),
      email: window.localStorage.getItem("email")
    },
    success: function(jsonObj){
      console.log(jsonObj);
      var result = jsonObj.ajaxResult;
      if (result.status == "ok" && result.data == "success") {
        console.log('profileInfo success!');
        /*  location.href="./main_slider.html";*/
      } else {
        alert('등록에 실패했습니다.');
      }
    },
    error: function(xhr, status, errorThrown){
      alert('등록 중 오류 발생!');
      console.log(status);
      console.log(errorThrown);
    }
  });

  // 등록 성공 후에 해야할 작업을 여기에 기술한다면,당신은 바보!
  //location.href="../subject/list.bit";
}
function mainTap() {
  console.log("called main_tap.js, onload!!!");
  var userNo = window.localStorage.getItem("userNo");
  var email = window.localStorage.getItem("email");
  var name = window.localStorage.getItem("name");
  serverUrl = window.localStorage.getItem("serverUrl");
  chatServerUrl = window.localStorage.getItem("chatServerUrl");
  
  console.log("===== location.pathname;" + location.pathname);
  console.log("===== email:" + email);
  console.log("===== name:" + name);
  console.log('serverUrl:' + serverUrl);
  console.log('chatServerUrl:' + chatServerUrl);


  // 사용자 정보를 가져와서 메인 화면 초기화를 한다.(프로그램의 시작 코드)
  getUserInfo();
  
  //aaa();
  
    $('#menuIcon').on('click', function(){

          if( snapper.state().state=="left" ){
              snapper.close();
          } else {
              snapper.open('left');
          }  
      });

    
    $( "#map" ).click(function( event ) {
      $("#map").css("background-color","white")
      $("#maps").css("color","#358fbc");
      $("#chat").css("background-color","#358fbc")
      $("#chats").css("color","white");
      });
    $( "#chat" ).click(function( event ) {
        $("#map").css("background-color","#358fbc")
        $("#maps").css("color","white");
        $("#chat").css("background-color","white")
        $("#chats").css("color","#358fbc");
        });
    
    $( "#map2" ).click(function( event ) {
        $("#map2").css("background-color","white")
        $("#maps2").css("color","#358fbc");
        $("#chat2").css("background-color","#358fbc")
        $("#chats2").css("color","white");
        });
    $( "#chat2" ).click(function( event ) {
        $("#map2").css("background-color","#358fbc")
        $("#maps2").css("color","white");
        $("#chat2").css("background-color","white")
        $("#chats2").css("color","#358fbc");
        });
    
    
//    $('#tagTap').on('click', function(){
//        
//    		//getCurrentLocation();
//        $('.locationTag').fadeIn(400).delay(1500).fadeOut(400); 
//        
//    });
    
  $("#selectBtn").on('click', function(){
    $("#selectBtn").css("display","none");
    $("#f_Btn").css("display","none");
   });
  
  // 지도 검색 이벤트 처리
  $("#search-2").on('click', function(){
    findAddress();
  });
  $('#map-address').change(function() {
    $('#map-address').blur(); // 안드로이드 키보드 숨기기 위해 사용
    findAddress();
  });
  
  // 국가, 언어, 성별, 나이 필터링 관련
  $("#sex-on").on('click', function(){
    var sexSrc = $('#sex-on-img').attr("src");
    var currentSex ='a';
    
    switch (sexSrc) {
    case '../img/filter/sex-two.png':
      $('#sex-on-img').attr("src", '../img/filter/sex-man.png')
      console.log('sex-man');
      currentSex = 'm';
      break;
    case '../img/filter/sex-man.png':
      $('#sex-on-img').attr("src", '../img/filter/sex-woman.png')
      console.log('sex-woman');
      currentSex = 'w';
      break;
    case '../img/filter/sex-woman.png':
      $('#sex-on-img').attr("src", '../img/filter/sex-two.png')
      console.log('sex-All');
      currentSex = 'a';
      break;
    }
    
    window.localStorage.setItem("userSex", currentSex);
    var currentLang = window.localStorage.getItem("userLang");
    
    console.log('@#@#@#@# currentLang:' + currentLang);
    if (currentLang == null || currentLang == '') {
      currentLang = 0;
      window.localStorage.setItem("userLang", currentLang);
    }
    
    
    // 다른 사용자들 성별로 필터링해서 가져온다.
    // currentSex로 구분
    deleteOverlays();
    getUserGPSInfo(currentSex, currentLang);
    console.log("getUserGPSInfo() OKOKOK");
    
  });
  
  $("#language-filter").on('click', function(){
    var langSrc = $('#language-filter-img').attr("src");
    var currentLang = 0;
    
    switch (langSrc) {
    case '../img/filter/jp.png':
      $('#language-filter-img').attr("src", '../img/filter/earth.png')
      currentLang = 0;
      break;
    case '../img/filter/earth.png':
      $('#language-filter-img').attr("src", '../img/filter/kr.png')
      currentLang = 1;
      break;
    case '../img/filter/kr.png':
      $('#language-filter-img').attr("src", '../img/filter/us.png')
      currentLang = 2;
      break;
    case '../img/filter/us.png':
      $('#language-filter-img').attr("src", '../img/filter/cn.png')
      currentLang = 3;
      break;
    case '../img/filter/cn.png':
      $('#language-filter-img').attr("src", '../img/filter/jp.png')
      currentLang = 4;
      break;
    }
    
    window.localStorage.setItem("userLang", currentLang);
    var currentSex = window.localStorage.getItem("userSex");
    
    console.log('@#@#@#@# currentSex:' + currentSex);
    if (currentSex == null || currentSex == '') {
      currentSex = "a";
      window.localStorage.setItem("userSex", currentSex);
    }
    
    // 다른 사용자들 성별로 필터링해서 가져온다.
    // currentSex로 구분
    deleteOverlays();
    getUserGPSInfo(currentSex, currentLang);
    console.log("getUserGPSInfo() OOOKKK");
    
  });
  
  setFilteringUI();
  
  $("#hh").on('click', function(){
    //alert("aaa");
    window.openURL("./main_Pro_modify.html");
   });
  
  // 채팅하기 버튼 클릭 이벤트 처리
  $("#chattingBtn").on('click', function(){
    console.log('===== userNo: ' + userNo);
    console.log('===== checkedUsers: ' + checkedUsers);
    
    
    // 선택한 사람들의 UNO를 배열로 조합하여 넘긴다.
    $.ajax( chatServerUrl +'/isFirstEntrance.jsonp', {
      crossDomain:true,
      type: 'GET',
      dataType: 'jsonp',
      data: {
        userNo: userNo,
        checkedUsers: checkedUsers
      },
      success: function(jsonObj){
        console.log('jsonp reuslt: ' + jsonObj);
        var result = jsonObj.ajaxResult;
        if (result.status != "ok" || result.data == "failure") {
           alert('채팅방 정보를 가져오는 데 실패했습니다.');
        } else {
          console.log('##### isFirstEntrance.jsonp 성공!');
          console.log('##### result.data:' + result.data);
          
          window.localStorage.setItem("isFirstChat", result.data);
          // 
          if (!result.data) { // call current chat room
            location.href = '../chat/chatMain.html';
          } else {        // newSetup  chat room
           // 채팅 서버로 채팅할 사용자들 정보 전달
            $.ajax( chatServerUrl +'/newSetupChat.jsonp', {
              crossDomain:true,
              type: 'GET',
              dataType: 'jsonp',
              data: {
                userNo: userNo,
                checkedUsers: checkedUsers
              },
              success: function(jsonObj){
                console.log('jsonp reuslt: ' + jsonObj);
                var result = jsonObj.ajaxResult;
                if (result.status != "ok" || result.data == "failure") {
                   alert('채팅방으로 이동에 실패했습니다.');
                } else {

                  console.log('새 채팅방 만들고, 채팅방 기본 설정 성공!');
                  console.log('result.data.chatRoomNumber:' + result.data.chatRoomNumber);
                  console.log('result.data.chatList:' + result.data.chatList);
                  
                  var chatRoomNumber = result.data.chatRoomNumber;
                  window.localStorage.setItem("chatRoomNumber", chatRoomNumber);
                  window.localStorage.setItem("chatList", result.data.chatList);
                  
                  //location.href = chatServerUrl;
                  //location.href = chatServerUrl + "/users/" + chatRoomNumber;
                  alert('변경된 채팅방으로 이동!!');
                  location.href = '../chat/chatMain.html';
                  //location.href = chatServerUrl + "/users/" + chatRoomNumber;
                }
              },
                error: function(xhr, status, errorThrown){
                  alert('채팅방으로 이동 중 오류 발생!');
                  console.log(status);
                  console.log(errorThrown);
                }
              }); // newSetupChat.jsonp end
          } // isFirst end
          
          /*
          console.log('새 채팅방 만들고, 채팅방 기본 설정 성공!');
          console.log('result.data.chatRoomNumber:' + result.data.chatRoomNumber);
          console.log('result.data.chatList:' + result.data.chatList);
          
          var chatRoomNumber = result.data.chatRoomNumber;
          window.localStorage.setItem("chatRoomNumber", chatRoomNumber);
          window.localStorage.setItem("chatList", result.data.chatList);
          */
          
          //location.href = chatServerUrl;
          //location.href = chatServerUrl + "/users/" + chatRoomNumber;
          //location.href = chatServerUrl + "/users/" + chatRoomNumber;
        } // result.data end
      },
        error: function(xhr, status, errorThrown){
          alert('채팅방 정보 가져 오는 중 오류 발생!');
          console.log(status);
          console.log(errorThrown);
        }
      }); // isFirstEntrance.jsonp end
    }); // #chattingBtn click end
    
  
  // 사용자 정보를 가져와서 메인 화면 초기화를 한다.(프로그램의 시작 코드)
}

// 이 채팅방에 처음 들어가는 건지 검사한다.
function checkIsFirst(userNo, checkedUsers) {
  $.ajax( chatServerUrl +'/isFirstEntrance.jsonp', {
    crossDomain:true,
    type: 'GET',
    dataType: 'jsonp',
    data: {
      userNo: userNo,
      checkedUsers: checkedUsers
    },
    success: function(jsonObj){
      console.log('jsonp reuslt: ' + jsonObj);
      var result = jsonObj.ajaxResult;
      if (result.status != "ok" || result.data == "failure") {
        alert('채팅방 정보를 가져오는 데 실패했습니다.');
      } else {
        console.log('##### isFirstEntrance.jsonp 성공!');
        /*
        console.log('새 채팅방 만들고, 채팅방 기본 설정 성공!');
        console.log('result.data.chatRoomNumber:' + result.data.chatRoomNumber);
        console.log('result.data.chatList:' + result.data.chatList);

        var chatRoomNumber = result.data.chatRoomNumber;
        window.localStorage.setItem("chatRoomNumber", chatRoomNumber);
        window.localStorage.setItem("chatList", result.data.chatList);
         */

        //alert('변경된 채팅방으로 이동!!');
        //location.href = '../chat/chatMain.html';
        //location.href = chatServerUrl + "/users/" + chatRoomNumber;
      }
    },
    error: function(xhr, status, errorThrown){
      alert('채팅방 정보 가져 오는 중 오류 발생!');
      console.log(status);
      console.log(errorThrown);
    }
  });
}

function getCurrentLocation() {
  //위치 탐색을 시작합니다.
  navigator.geolocation.watchPosition(function (position) {
    // 위치를 가져오는데 성공할 경우
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    console.log("getCurrentLocation: " + latitude + "," + longitude);

    new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      icon: markerImage2,
      map: map
    });
  }, function (error) {
    // 위치를 가져오는데 실패할 경우
    console.log("error:" + error.code);
    
    if(error.code == 1) {
      alert("Error: Access is denied!");
    }else if( error.code == 2) {
      alert("Error: Position is unavailable!");
    }
    
    alert("error:" + error);
    
  }, { timeout: 30000 });
}


function getUserInfo() {
  console.log('call getUserInfo');
  $.getJSON(
      serverUrl +'/auth/getUserInfo.ajax', 
    function(jsonObj) {
      
      var result = jsonObj.ajaxResult;
      if (result.status == "ok") {
        var user = result.data;
        //console.log('user:' + user);
        
        $('#name').text(user.name);
/*        $('#loginEmail').text(user.email);*/
        
        var nation;
        switch (user.nation) {
          case 1: nation = 'Korea';
          case 2: nation = 'U.S.A';
          case 3: nation = 'China';
          default: nation = 'Korea';
        }
        
        //console.log('nation:' + nation);
        
     
        var language;
        switch (user.languageNo) {
          case 1: languageNo = 'Korean';break;
          case 2: languageNo = 'English';break;
          case 3: languageNo = 'Chinese';break;
          default: languageNo = 'Korean';break;
        }
        //console.log('language:' + language);
        
        $('#profileCountry').text(nation);
        $('#profileLanguage').text(languageNo);
        
        console.log('user.phoPath:' + user.phoPath);
        if (user.phoPath) {
          $('#myPic').attr("src", serverUrl + "/" + user.phoPath);
        } else {
          $('#myPic').attr("src", "../img/profile/no-profile-image.jpg");
        }

        
        console.log('user.name:' + user.name);
        window.localStorage.setItem("name",user.name);
        
      } else {
        alert("로그인 하지 않았습니다.");
        location.href = "../auth/main_slider.html";
      }
    });
}

function findAddress() {
  var address = $("#map-address").val();
  geocoder.geocode({
    'address' : address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map : map,
        position : results[0].geometry.location
      });
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      
      console.log('%$%$%$%$%$%%$ goood');
      loadGPSInfo();
      console.log('%$%$%$%$%$%%$ goood gooodddd');

      //$("#latitude").val(lat);
      //$("#longitude").val(lng);
      /*
      var populationOptions = {
        strokeColor : '#000000',
        strokeOpacity : 0.8,
        strokeWeight : 2,
        fillColor : '#808080',
        fillOpacity : 0.5,
        map : map,
        center : new google.maps.LatLng(lat, lng),
        //radius : $("#radius").val() * 1000
        radius : 1 * 1000  //1 km
      };
      if (cityCircle) {
        cityCircle.setMap(null);
      }
      cityCircle = new google.maps.Circle(populationOptions);
      */
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
      alert('검색한 지명을 찾을 수 없습니다.\n 다른 이름으로 검색해 주세요.');
    }
  });
}

function setFilteringUI() {
  console.log('call setFilteringUI');
  
  var curWidth = $(document).width(); // 현재 width
  var curHeight = $(document).height(); // 현재 height
  console.log('page full curWidth:' + curWidth);
  console.log('page full curHeight:' + curHeight);

  var width = curWidth - 50;
  var height = curHeight/4;   //상단부터 띄워야 하는 높이

  // 성별 필터링
  $("#sex-on").css({top:height, left:width, display:"inline-block"});
  
  console.log("$(#language-filte).width()" + $("#language-filter").width());
  
  height = curHeight/4 + $("#language-filter").height() + 10;   //상단부터 띄워야 하는 높이
  
  // 나라 필터링
  $("#language-filter").css({top:height, left:width, display:"inline-block"});
}

