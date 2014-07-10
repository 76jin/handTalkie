
var snapper;
var serverUrl;
var chatServerUrl;
var alarmText_addFri;
$(window).load(function(){

	console.log("userid :"+window.localStorage.getItem("userid"));
	console.log("userno :"+window.localStorage.getItem("userno"));
	console.log("userrecommend :"+window.localStorage.getItem("userrecommend"));
	console.log("serverUrl:" + serverUrl);
		loadprofileList();

	
function loadprofileList() {
	console.log("어이없다:::"+window.localStorage.getItem("userid"));
	$.ajax( serverUrl + '/friendProfileInfo.ajax', {
		type: 'POST',
		dataType: 'json',
		data: {
			email: window.localStorage.getItem("userid")
		},
		success: function(jsonObj){
			console.log(jsonObj);
			var result = jsonObj.ajaxResult;
			if (result.status == "ok" && result.data == "failure") {
				alert('프로필 정보를 읽어오지 못했습니다..');
			} else {
				console.log('profileInfo success!');
				//console.log(result.data);
				
				var obj = JSON.parse(result.data);
				console.log("친구정보::"+obj);
		

					
				$('#profileName').text(obj.name);
				$('#profileTitle').text(obj.profileTitle);
				$('#title_pro').text(obj.profileDesc);
				$('#favoriteTagText').text(obj.favTag);
			
        console.log('value.phoPath:' + obj.phoPath);
        if (obj.phoPath) {
          $('#profile_img').attr("src", serverUrl + "/" + obj.phoPath);
        } else {
          $('#profile_img').attr("src", "../img/profile/no-profile-image.jpg");
        }
        
        	  window.localStorage.setItem("profileTitle",obj.profileTitle);
		  window.localStorage.setItem("title_pro",obj.profileDesc);
		  window.localStorage.setItem("favoriteTagText",obj.favTag);
	
				
				/*	location.href="./main_slider.html";*/
			}
		},
		error: function(xhr, status, errorThrown){
			alert('프로필 정보 읽기 중 오류 발생!');
			console.log(status);
			console.log(errorThrown);
		}
	});
}

//no: window.localStorage.getItem("userNo"),
//profileTitle: window.localStorage.getItem("profileTitle"),
//profileDesc: window.localStorage.getItem("title_pro"),
//favTag: window.localStorage.getItem("favoriteTagText")

		$('#loveFr_Btn').click(function(){
			var userRecommend = window.localStorage.getItem("userrecommend");
			userRecommend++;
			console.log("userno클릭!!"+userRecommend);
			window.localStorage.setItem("userRecommend",userRecommend);
			loveFr();
			//추천친구등록하면 내 친구에 등록하게끔 만드는 한수
	
        
        alarmText_addFri = (window.localStorage.getItem("name")+"님께서 회원님을 관심친구로 등록하였습니다.");
        window.localStorage.setItem("alarmText_addFri", alarmText_addFri);
        
        addMyFriend();
     
		});
		
		
		
		function loveFr(){
			console.log("userno"+window.localStorage.getItem("userno"));
			console.log("userno에젝스요청"+window.localStorage.getItem("userRecommend"));
		$.ajax( serverUrl + '/friend/getPlusLoveFr.ajax', {
			type: 'POST',
			dataType: 'json',
			data: {
				no: window.localStorage.getItem("userno"),
				recommend : window.localStorage.getItem("userRecommend")
			},
			success: function(jsonObj){
				console.log(jsonObj);
				var result = jsonObj.ajaxResult;
				if (result.status != "ok" || result.data == "failure") {
					alert('관심친구를 읽어오는 데 실패했습니다.');
					
				} else {
					console.log('locationTag success!');
					var obj = JSON.parse(result.data);
					console.log("친구정보::"+obj);
					console.log(obj.recommend);
					
					var recommend = obj.recommend;
					console.log("추천수:"+recommend);
				
				}
			},
			error: function(xhr, status, errorThrown){
				alert('관심친구등록 실패!');
				console.log(status);
				console.log(errorThrown);
			}
		});
		}
		
	//위치태그
	$.ajax( serverUrl + '/loglist.ajax', {
		type: 'POST',
		dataType: 'json',
		data: {
			no: window.localStorage.getItem("userno")
		},
		success: function(jsonObj){
			console.log(jsonObj);
			var result = jsonObj.ajaxResult;
			if (result.status != "ok" || result.data == "failure") {
				alert('위치태그 정보를 읽어오는 데 실패했습니다.');
				
			} else {
				console.log('locationTag success!');
				console.log(result.data);

				if (result.status == 'ok') {
		            $.each(result.data, function(index, obj) {
		               $.each(obj, function(index, test) {
		            	   var location = ("no:" + test.no +",locationTag:"+ test.loctionTag +",logTime:"+test.logTime);
	
		            	   $("#log").append(
			            			'<div class="log_div">'+
			            			'<li class="log_li"><div class="logImg">'+
								'<img id="locationIcon" class="mainIcon_t" src="../img/location.png"></div>' +
	       	   				    ' <div class="logText"><div class="log_text">'+test.loctionTag+'</div>'+
	       	   				    '<div class="log_time">'+test.logTime+'</div></div></li></div>');
			            	   
	          console.log(">>>"+location);
	          window.localStorage.setItem("locationTagText",location);

		               });
		            });
		         }

			}
		},
		error: function(xhr, status, errorThrown){
			alert('위치태그 정보를 읽어오는 중 오류 발생!');
			console.log(status);
			console.log(errorThrown);
		}
	});
	// 등록 성공 후에 해야할 작업을 여기에 기술한다면,당신은 바보!
	//location.href="../subject/list.bit";
	
	
	

	
	
	function addMyFriend(){
		console.log("userNo::"+window.localStorage.getItem("userNo"));
		console.log("addMy::"+window.localStorage.getItem("userno"));
	   $.ajax( serverUrl +'/friend/addMyFriendList.ajax',{
   		type:'POST',
   		dataType:'json',
   		data: {
   			userNo : window.localStorage.getItem("userNo"),
   			friendNo: window.localStorage.getItem("userno")
   		},
   		success: function(jsonObj){
   			console.log(jsonObj);
   			var result = jsonObj.ajaxResult;
   			if (result.status != "ok" || result.data == "failure") {
					alert('나의 관심친구리스트를 추가하는데 실패했습니다.');
					
				} else {
					console.log('locationTag success!');
					var obj = JSON.parse(result.data);
					console.log("친구정보::"+obj);
					FriendAddAlarm();
					  $('.loveFri').trigger('click');
				      $('.loveFri').fadeIn(400).delay(1500).fadeOut(400); 
				}
			},
			error: function(xhr, status, errorThrown){
				  $('.errorFri').trigger('click');
			      $('.errorFri').fadeIn(400).delay(1500).fadeOut(400); 

				console.log(status);
				console.log(errorThrown);
			}
		});
}

	
	
	
	  //프로필 채팅하기 버튼 클릭시.
    $("#chat_iconff").on('click', function(){
       // console.log('===== userNo: ' + userNo);
        checkedUsers = 0;
        console.log('===== checkedUsers: ' + window.localStorage.getItem("userno"));
        console.log("===== checkedUsers: "+window.localStorage.getItem("userNo"));
        // 선택한 사람들의 UNO를 배열로 조합하여 넘긴다.
        $.ajax( chatServerUrl +'/isFirstEntrance.jsonp', {
          crossDomain:true,
          type: 'GET',
          dataType: 'jsonp',
          data: {
            userNo: window.localStorage.getItem("userNo"),
            checkedUsers: window.localStorage.getItem("userno")
          },
          success: function(jsonObj){
            console.log('jsonp reuslt: ' + jsonObj);
            var result = jsonObj.ajaxResult;
            if (result.status != "ok" || result.data == "failure") {
               alert('채팅방 정보를 가져오는 데 실패했습니다.');
            } else {
              console.log('##### isFirstEntrance.jsonp 성공!');
              console.log('##### result.data:' + result.data);
              var isFirst = result.data;
              
              // 
              if (!isFirst) { // call current chat room
                window.localStorage.setItem("isFirstChat", false);
                location.href = '../chat/chatMain.html';
              } else {        // newSetup  chat room
             
            	  
            	  // 채팅 서버로 채팅할 사용자들 정보 전달
                $.ajax( chatServerUrl +'/newSetupChat.jsonp', {
                  crossDomain:true,
                  type: 'GET',
                  dataType: 'jsonp',
                  data: {
                	    userNo: window.localStorage.getItem("userNo"),
                    checkedUsers: window.localStorage.getItem("userno")
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
                      window.localStorage.setItem("isFirstChat", true);
                      
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

    
    
    //알람메세지 저장하기
    function FriendAddAlarm(){
    		console.log("userNo:::::"+window.localStorage.getItem("userNo"));
     	console.log("friendNo:::::"+window.localStorage.getItem("friendNo"));
     	console.log("alarmmsg:::::"+window.localStorage.getItem("alarmText_addFri"));
     	
    	$.ajax(	serverUrl + '/friendAddAlarm.ajax', {
    		type: 'POST',
    		dataType: 'json',
    		data: {
    			no : window.localStorage.getItem("userno"), //받는사람
    			frNo: window.localStorage.getItem("userNo"), //보내는사람
    			alarmMsg: window.localStorage.getItem("alarmText_addFri")//메세지내용
    		},
    		success: function(jsonObj){
    			console.log(jsonObj);
    			var result = jsonObj.ajaxResult;
    			if (result.status != "ok" || result.data == "failure") {
    				alert('알람메세지를 저장하는데 실패했습니다.');
    			} else {
    				console.log('alarmMsg success!');
    				console.log(result.data);
    			}
    		},
    		error: function(xhr, status, errorThrown){
    			alert('알람메세지를 저장하는데 오류 발생!');
    			console.log(status);
    			console.log(errorThrown);
    		}
    	});
    }
    	
});
	
	


















