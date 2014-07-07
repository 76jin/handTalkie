var snapper;
$(function() {
	snapper = new Snap({
		element: document.getElementById('content')
	});
});

$(function(){
	
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
    
    var serverUrl = window.localStorage.getItem('serverUrl');
    
    console.log(window.localStorage.getItem('userNo'));
    
    console.log('$$$$$ userNo: ####### ' + window.localStorage.getItem('userNo'));
    
    
    
    
    
    
    // 채팅방 클릭시 이벤트
    $('.chatBox').on('click', '.boxChat', function(event) {
      var tempRoomNo = $(this).children(".chatRoomNo").text();
      console.log('this.children.chatRoomNo.text():' + tempRoomNo);
      window.localStorage.setItem("chatRoomNumber", tempRoomNo);
      
      //alert( $(this).text() );
      
      // 기존 채팅방으로 들어가기
      location.href = '../chat/chatMain.html';
    });
    
    function showObj(obj) {
      var str = "";
      for(key in obj) {
        str += key+"="+obj[key]+"\n";
      }


      console.log(str);
      return;
    }
    
//	$('#chatListIcon').on('click', function() {
		
		 
		  $.ajax(serverUrl + '/chatList.ajax', {
		    type: 'POST',
		    dataType: 'json', 
		    data: { 
		    	userNo : window.localStorage.getItem('userNo')
		    },
		        success : function(jsonObj) {
		          console.log('jsonp reuslt: '+ jsonObj);
		          var result = jsonObj.ajaxResult;
		          if (result.status != "ok"
		              || result.data == "failure") {
		            alert('채팅방 리스트를 가져오는 데 실패했습니다.');
		          } else {
		            console.log('채팅방리스트 정보 가져오기 성공!');
		            console.log(result.data);
		            
		            var index = 0;

		            if (result.status == 'ok') {
		                    $.each(result.data, function(index, obj) {
		                       $.each(obj, function(index, test) {
		                         var chatList = ("textNo:" + test.textNo +",chatRoomNo:"+ test.chatRoomNo +",sender:"+test.sender
		                        		 +",chatText:"+test.chatText+",sendTime:"+test.sendTime);
		                         window.localStorage.setItem("sender",test.sender);
		         				console.log("sender :"+window.localStorage.getItem("sender"));
		                         console.log(chatList);
		                         $(".chatBox")
		                         .append($("<div class='boxChat'>")
			                      .append($("<img class='chatImg' src='serverUrl + userInfo.PHOPATH'>"))
			                      .append($("<p class='chatRoomNo'>"+test.chatRoomNo+"</p>").hide())
				                    .append($("<div class='textChat'></div>")
				                      .append($("<p class='locationChat'></p>"))
				                      .append($("<p class='time_line'>"+test.sendTime+"</p>"))
				                      .append($("<p class='contentLast'>"+test.chatText+"</p>"))));
		                     
		                  
		                    
		                	$.ajax(	serverUrl + '/ShortProfile.ajax', {
		            			type: 'POST',
		            			dataType: 'json',
		            			data: {
		            				no: window.localStorage.getItem("sender")
		            			},
		            			success: function(jsonObj){
		            				console.log(jsonObj);
		            				var result = jsonObj.ajaxResult;
		            				if (result.status != "ok" || result.data == "failure") {
		            					alert('사용자 정보를 읽어오는 데 실패했습니다.');
		            				} else {
		            					console.log('friendInfo success!');
		            					console.log(result.data);
		            					var volist = JSON.parse(result.data);
		            					var photoPath = '';
		            					console.log("사용자이름:" + volist[0].name);
		            					console.log("index:" + index);
		            					console.log("dddd:" + $('.locationChat').eq(index).text(volist[0].name));
		            					
	            							photoPath = volist[0].photoPath;
	            							$('.locationChat').eq(index).text(volist[0].name);
	            							$('.chatImg').eq(index).attr("src", serverUrl + "/" + photoPath);
	            							index++;
		            				}
		            			},
		            			error: function(xhr, status, errorThrown){
		            				alert('사용자 정보를 읽어오는 중 오류 발생!');
		            				console.log(status);
		            				console.log(errorThrown);
		            			}
		            		});
		
		                       });//each
		                    });// each
		                 }//
                		}
		        },
		        error : function(
		            xhr,
		            status,
		            errorThrown) {
		          alert('채팅방리스트 정보 가져오는 중 오류 발생!');
		          console.log(status);
		          console.log(errorThrown);
		        }
		      });
    
}); 
