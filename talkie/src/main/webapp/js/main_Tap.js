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
window.onload = mainTap;

$(function() {
	snapper = new Snap({
		element: document.getElementById('content')
	});
});

function aaa(){
	$.ajax(	bit.contextRoot + 'profileInfo.ajax', {
		type: 'POST',
		dataType: 'json', /*서버에서 보내는 데이터의 형식 지정 */
		data: { /* 서버쪽으로 보내는 데이터 */
			//email: $('#email').val(),
			email: '5song2@test.com'
		},
		success: function(jsonObj){
			console.log(jsonObj);
			var result = jsonObj.ajaxResult;
			if (result.status == "ok" && result.data == "success") {
				console.log('profileInfo success!');
				/*	location.href="./main_slider.html";*/
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
    	$("#maps").css("color","#4682B4");
    	$("#chat").css("background-color","#4682B4")
      $("#chats").css("color","white");
      });
    $( "#chat" ).click(function( event ) {
        $("#map").css("background-color","#4682B4")
        $("#maps").css("color","white");
        $("#chat").css("background-color","white")
        $("#chats").css("color","#4682B4");
        });
    
    
    $('#tagTap').on('click', function(){
        
  //      getCurrentLocation();
        
        $('.locationTag').fadeIn(400).delay(1500).fadeOut(400); 
    });
    
	$("#selectBtn").on('click', function(){
		$("#selectBtn").css("display","none");
		$("#f_Btn").css("display","none");
	 });
	
	$("#hh").on('click', function(){
		//alert("aaa");
		window.openURL("./main_Pro_modify.html");
	 });
	
	// 채팅하기 버튼 클릭 이벤트 처리
	$("#chattingBtn").on('click', function(){
	  console.log('chat server url: ', bit.chatServerUrl);
	  
	  // 선택한 사람들의 UNO를 배열로 조합하여 넘긴다.
	  // 1. 먼저 현재 사용자 UNO 넘기기.
	  //var userNo = 1; // 홍길동.
	  var othersNo = [3, 4]; // 임꺽정, 장보고?
	  
	  // 쿠키에 사용자 정보와 채팅하려는 사람 정보 저장하기.
	  // Todo
	  
/*	  var data = {};
	  data.userNo = '66';*/
	  
	  // 채팅 서버로 채팅할 사용자들 정보 전달
	  $.ajax(  'http://s24.java48.com:9998/newSetupChat.jsonp', {
	    crossDomain:true,
	    type: 'GET',
	    dataType: 'jsonp',
	    data: {
	      userNo: bit.userNo,
	      othersNo: othersNo
	    },
	    success: function(jsonObj){
	      console.log('jsonp reuslt: ', jsonObj);
	      var result = jsonObj.ajaxResult;
	      if (result.status == "ok" && result.data == "success") {
	        
	        console.log('새 채팅방 만들고, 채팅방 기본 설정 성공!');
	        console.log('read cookie chatUserNo: ', $.cookie('chatUserNo'));
	        console.log('read cookie chatOthersNo: ', $.cookie('chatOthersNo'));
	        
	        var cookies = $.cookie('chatOthersNo').split(':');
	        console.log('cookies:', cookies);
	        $.cookie('chatOthersNo', cookies[1]);
	        console.log('after cookie:', $.cookie('chatOthersNo'));
	        
	        
	        location.href = 'http://s24.java48.com:9998/';
	      } else {
	        alert('채팅방으로 이동에 실패했습니다.');
	      }
	    },
	    error: function(xhr, status, errorThrown){
	      alert('채팅방으로 이동 중 오류 발생!');
	      console.log(status);
	      console.log(errorThrown);
	    }
	  });
	});
	
	
	// 사용자 정보를 가져와서 메인 화면 초기화를 한다.(프로그램의 시작 코드)
	
}

function getCurrentLocation() {
  //위치 탐색을 시작합니다.
  navigator.geolocation.watchPosition(function (position) {
    // 위치를 가져오는데 성공할 경우
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    console.log("getCurrentLocation: ", latitude, longitude);

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
	console.log('dddd');
	console.log(bit);
	console.log(bit.contextRoot);
	$.getJSON(
		bit.contextRoot + '/auth/getUserInfo.ajax', 
		function(jsonObj) {
			
			var result = jsonObj.ajaxResult;
			if (result.status == "ok") {
				var user = result.data;
				console.log('user:', user);
				
				$('#name').text(user.name);
/*				$('#loginEmail').text(user.email);*/
				
				var nation;
				switch (user.nation) {
					case 1: nation = 'Korea';
					case 2: nation = 'U.S.A';
					default: nation = 'Korea';
				}
				
				//console.log('nation:', nation);
				
				var language;
				switch (user.nation) {
					case 1: language = 'Korean';
					case 2: language = 'English';
					default: language = 'Korean';
				}
				//console.log('language:', language);
				
				$('#profileCountry').text(nation);
				$('#profileLanguage').text(language);
				
				console.log('user.phoPath:', user.phoPath);
				if (user.phoPath) {
			 	  $('#myPic').attr("src", user.phoPath);
				} else {
				  $('#myPic').attr("src", "./img/profile/no-profile-image.jpg");
				}
				
			} else {
			//	alert("로그인 하지 않았습니다.111");
			//	location.href = bit.contextRoot + "/auth/main_slider.html";
			}
		});
}

