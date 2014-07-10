var serverUrl =  'http://14.32.66.98:9989/talkie';
var userno;
var userid;
$(window).load(function(){

console.log("내가 추천한 친구들 리스트 시작!");
getFriendList();


function getFriendList() {
    email: window.localStorage.getItem("email")
	$.ajax( 'http://14.32.66.98:9989/talkie/friend/getFriendInfo.ajax', {
	    type: 'POST',
	    dataType: 'json', 
	    data: { 
	      email: window.localStorage.getItem("email")
	    },
	    success: function(jsonObj){
		      console.log(jsonObj);
		      var result = jsonObj.ajaxResult;
		      if (result.status == "ok") {
		        console.log('getFriendFind success!');
		        console.log('jsonp reuslt: ' + jsonObj);
		        var result = jsonObj.ajaxResult;

		        		$.each(result.data, function(index, friend) {
					var myfriendList =  ("userNo:" + friend.userNo +",friendNo:"+ friend.friendNo +",isBlock:"+friend.isBlock);
     		
	        		 console.log("myfriendList::"+myfriendList);
	        		 console.log("myfriendList::"+friend.friendNo);
	        		 window.localStorage.setItem("friendNo",friend.friendNo);
	        		 myRecommendList();
		        		
				}); //each
		      } else {
		        alert('등록에 실패했습니다.');
		      }//else
		    },//success
	    error: function(xhr, status, errorThrown){
	      alert('등록 중 오류 발생!');
	      console.log(xhr);
	      console.log(status);
	      console.log(errorThrown);
	      
	      
	    }//error
	  });//ajax
	}//getF

function myRecommendList(){
	console.log(window.localStorage.getItem("friendNo"));
	$.ajax(	serverUrl + '/getfriendProfileInfoNo.ajax', {
		type: 'POST',
		dataType: 'json',
		data: {
			no: window.localStorage.getItem("friendNo")
		},
		success: function(jsonObj){
			 console.log(jsonObj);
		      var result = jsonObj.ajaxResult;
			      if (result.status == "ok") {
				console.log('friendInfo success!');
				  var result = jsonObj.ajaxResult;
				$.each(result.data, function(index, obj) {
                    	   var memberList = ("no:" + obj.no +",name:"+ obj.email+",name:"+ obj.name +",nation:"+obj.nation
	                        		 +",language:"+obj.languageNo+",photoPath:"+obj.phoPath);
                    	   console.log("memberList::"+memberList);
                    	   var photoPath = "http://14.32.66.98:9989/talkie/";
                    	   var language;
                           switch (obj.languageNo) {
                             case 1: language = 'Korean';break;
                             case 2: language = 'English';break;
                             case 3: language = 'Chinese';break;
                            // default: language = 'Korean';
                            
                           }
                    	  
                    	   $("#bac-mr")
                    	   .append('<div data-email= "'+ obj.email +'" data-no= "'+ obj.no +'" class="box-mr"><a class="send_email" href="../friendProfile/friend_Pro.html"><div class="img-mr">'+
                    		'<img class="img-mr2" src="'+photoPath+obj.phoPath+'"></div>' +
                    	   	'<div class="text-name"><p class="name-mr">'+obj.name+'</p></div>'+
                        '<div class="text-mr"><p class="con-mr">'+language+'</p></div></a></div>');
                    	   $(".box-mr").on("click",function(){
                    		   friendNo = $(this).attr("data-no");
                    		   friendEmail = $(this).attr("data-email");
                    		   console.log(friendNo);
                    		   console.log(friendEmail);
                    		   window.localStorage.setItem("userno",friendNo);
                    		   window.localStorage.setItem("userid",friendEmail);
				});
        		});
				
	                	//<p class="lan-mr">'+obj.language+'</p>
			} else{
			  	alert('사용자 정보를 읽어오는 데 실패했습니다.');
			}
		},
		error: function(xhr, status, errorThrown){
			alert('사용자 정보를 읽어오는 중 오류 발생!');
			console.log(status);
			console.log(errorThrown);
		}
	});
}

}); //load


