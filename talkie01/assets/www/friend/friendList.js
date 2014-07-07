var serverUrl =  'http://14.32.66.98:9989/talkie';
var userid ; 
var userno ; 
var userrecommend ; 
$(window).load(function(){

console.log("찾기시작!");

$('#search-2').bind('click', function(event) {
	event.preventDefault();
	console.log("=====================");
	console.log($("#query").val());
	window.localStorage.setItem("search", $("#query").val());
	getFriendList();
});
$(".fr_li").on('click', function(){
	alert($(this).attr('data-no'));
	
});
function getFriendList() {
	var serverUrl =  'http://14.32.66.98:9989/talkie';
	console.log( 'http://14.32.66.98:9989/talkie/friend/getFriendFind.ajax');
	console.log("search>>:"+ window.localStorage.getItem("search"));
	$.ajax( 'http://14.32.66.98:9989/talkie/friend/getFriendFind.ajax', {
	    type: 'POST',
	    dataType: 'json', 
	    data: { 
	      search: window.localStorage.getItem("search")
	    },
	    success: function(jsonObj){
		      console.log(jsonObj);
		      var result = jsonObj.ajaxResult;
		      if (result.status == "ok") {
		        console.log('getFriendFind success!');
		        console.log('jsonp reuslt: ' + jsonObj);
		        var result = jsonObj.ajaxResult;

		        $('.fr_li').remove();
		        $.each(result.data, function(index, test) {
		        	    var friendListArray = [];
		        		$.each(test, function(index, friend) {
					var friendList =  ("no:" + friend.no +",name:"+ friend.name +",email:"+friend.email
	               		 +",age:"+friend.age+",nation:"+friend.nation+",gender:"+friend.gender+",isDeclare:"+friend.isDeclare
	               		+",isEmail:"+friend.isEmail+",favTag:"+friend.favTag +",phoPath:"+friend.phoPath
	               	 +",profileTitle:"+friend.profileTitle +",profileDesc:"+friend.profileDesc  +",recommend:"+friend.recommend);
     		
	        		
					$(".fr_bor").append('<li class="fr_li"><a class="send_email" href="../friendProfile/friend_Pro.html">' +
							'<img class="fr_img" src='+"http://14.32.66.98:9989/talkie/" + friend.phoPath + '>' +
							'<div class="fr_box"><h4>' +  friend.name +'</h4>' +
							'<p class="fr_p">' + friend.profileTitle + '</p></div>' +
							'<div data-re= "'+ friend.recommend +'"  data-no= "'+ friend.no +'" class="fr_ui" data-id= "'+ friend.email +'"><div id="recommend"><span class="ui-li-count">' + friend.recommend+ '</span></div></a></li>');

						});
		        		$(".fr_ui").on("click",function(){
		        			userid = $(this).attr("data-id");
		        			userno = $(this).attr("data-no");
		        			userrecommend = $(this).attr("data-re");
		        			console.log(userid);
		        			console.log(userno);
		        			window.localStorage.setItem("userid",userid);
		        			window.localStorage.setItem("userno",userno);
		        			window.localStorage.setItem("userrecommend",userrecommend);
		        		});
		        		
				}); //each
				//$('#employeeList').listview('refresh');
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


}); //load


