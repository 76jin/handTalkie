var snapper;
var serverUrl = window.localStorage.getItem("serverUrl");

$(function() {
	snapper = new Snap({
		element: document.getElementById('content')
	});
});

$(function(){
	
	console.log("알람js시작>>>" );
	
//	  getUserInfo();
	  $('#menuIcon').on('click', function(){

          if( snapper.state().state=="left" ){
              snapper.close();
          } else {
              snapper.open('left');
          }  
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

    $('#tagTap').on('click', function(){
    	  //      getCurrentLocation();
    	        $('.locationTag').fadeIn(400).delay(1500).fadeOut(400); 
    	    });
    
    
    $("#prChat").click(function(){
     	$('#prChat_content').css("display", "block");
     	$('#grChat_content').css("display", "none");
    		
    	
    });
    $("#grChat").click(function(){
	    	$('#grChat_content').css("display", "block");
	    	$('#prChat_content').css("display", "none");
    });
    
    console.log(">>>>>"+window.localStorage.getItem("userNo"));
    console.log("serverUrl"+serverUrl);
  	//알람메세지 가져오기
	$.ajax( serverUrl + '/getAlarmList.ajax', {
		type: 'POST',
		dataType: 'json',
		data: {
			no: window.localStorage.getItem("userNo")
		},
		success: function(jsonObj){
			console.log(jsonObj);
			var result = jsonObj.ajaxResult;
			if (result.status != "ok" || result.data == "failure") {
				alert('알람메세지리스트를 가져오는 실패했습니다.');
    
			} else {
				console.log('getAlarmList success!');
				console.log(result.data);

				if (result.status == 'ok') {
		            $.each(result.data, function(index, obj) {
		               $.each(obj, function(index, test) {
		            	   var alarm = ("no:" + test.no +",alarmNo:"+ test.alarmNo +",alarmMsg:"+test.alarmMsg+",dateTime:"+test.dateTime);
		            	  console.log("alarm>>"+alarm+"........"+test.dateTime);
		           // 	  console.log("phoPath>>"+"http://14.32.66.98:9989/talkie/" + test.phoPath + ');
		            	 
		            	  
		            	   $(".chatBox").append('<li class="boxChat">'+
		            			   '<a href="../friendProfile/friend_Pro.html">'+
		                       '<img class="chatImg">' +
		                       '<div class="textChat">'+
		                       '<p class="alarm_msg"><span class="alarm_name"></span>'+test.alarmMsg+'</p>'+
		                       '<p class="alarm_time">'+test.dateTime+'</p>'+
		                       '<p class="alarm_location"></p></div></a></li>');
		            	   window.localStorage.setItem("frNo",test.frNo);
		            	   window.localStorage.setItem("alarmNo",test.alarmNo);
		               window.localStorage.setItem("alarm_msg",test.alarmMsg);
		               
		               getAlarmListFriend();
		     
		               });
		            });
		         }

			}
		},
		error: function(xhr, status, errorThrown){
			alert('알람메세지리스트를 읽어오는 중 오류 발생!');
			console.log(status);
			console.log(errorThrown);
		}
	});
	
    ////////////////////////////////////////////////////////////
    //푸시알람이 오고, 푸시를 클릭하면,
    $("pushMsg").on('click', function(){
    		console.log("메세지를 실행하자!");
    		//푸시클릭하면, 알람페이지로 넘어간다.
    		//location.href = "../alarm/alarm.html"; 
    		
    		if(1==true){
    		//알람종류가 관심친구등록이면,
    			var fr_AddAlarm = ("name"+" 님께서 회원님을 추천 친구로 등록하였습니다."); 
    			console.log("fr_AddAlarm:::"+fr_AddAlarm);
    			FriendAddAlarm();
    		} else {
    		//알람종류가 채팅이면,
    			var chat_AddAlarm = ("name"+"님으로부터 새로운 채팅메세지가 도착했습니다."); //혹은 마지막 채팅내용보이기
    			console.log("chat_AddAlarm:::"+chat_AddAlarm);
    			chatAlarm();
    		}
    });
    
    //알람메세지 저장하기
    function FriendAddAlarm(){
    		console.log("userNo:::::"+window.localStorage.getItem("userNo"));
     	console.log("friendNo:::::"+window.localStorage.getItem("friendNo"));
     	console.log("alarmmsg:::::"+window.localStorage.getItem("alarmmsg"));
     	
    	$.ajax(	serverUrl + '/friendAddAlarm.ajax', {
    		type: 'POST',
    		dataType: 'json',
    		data: {
    			no: window.localStorage.getItem("userNo"), //받는사람
    			frNo : window.localStorage.getItem("friendNo"),//보낸사람
    			alarmMsg: window.localStorage.getItem("alarmmsg")//메세지내용
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
		var index2=0;
    function getAlarmListFriend(){
       	console.log("frNo::"+window.localStorage.getItem("frNo"));
       	console.log("alarmNo::"+window.localStorage.getItem("alarmNo"));
  	   $.ajax( serverUrl +'/getAlarmListFriend.ajax',{
     		type:'POST',
     		dataType:'json',
     		data: {
     			frNo : window.localStorage.getItem("frNo"),
     			alarmNo: window.localStorage.getItem("alarmNo")
     		},
     		success: function(jsonObj){
     			console.log(jsonObj);
     			var result = jsonObj.ajaxResult;
     			if (result.status != "ok" || result.data == "failure") {
  					alert('getAlarmListFriend 추가하는데 실패했습니다.');
  					
  				} else {
  					console.log('getAlarmListFriend success!');

  					var result = jsonObj.ajaxResult;
  					   $.each(result.data, function(index, obj) {
  			               $.each(obj, function(index, friend) {
  			            	   var friendNo = ("no:" + friend.no +",name:"+ friend.name +",phoPath:"+friend.phoPath);
  			            	   console.log("index2:::"+index2);
  		            	   window.localStorage.setItem("frName",friend.name);
  		               window.localStorage.setItem("frphoPath",friend.phoPath);
    
	     		            console.log("frName:::::"+window.localStorage.getItem("frName"));
	    		             	console.log("frphoPath:::::"+window.localStorage.getItem("frphoPath"));
    
	    		         	    $('.alarm_name').eq(index2).text(window.localStorage.getItem("frName"));
   							$('.chatImg').eq(index2).attr("src", serverUrl + "/" + window.localStorage.getItem("frphoPath"));
   							
   							index2++;
   							
  			               });
  					   });
  	                    
  				}
  			},
  			error: function(xhr, status, errorThrown){
  				alert('getAlarmListFriend 실패!');
  				console.log(status);
  				console.log(errorThrown);
  			}
  		});
            
    }
    
    
    
    
}); 
