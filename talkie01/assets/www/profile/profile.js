$(window).load(function(){
	console.log("헤헤헿"+window.localStorage.getItem("email"));
	console.log("serverUrl:" + serverUrl);
	loadprofileList();
function loadprofileList() {
	$.ajax( serverUrl + '/profileInfo.ajax', {
		type: 'POST',
		dataType: 'json',
		data: {
			email: window.localStorage.getItem("email")
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
				
				//console.log(obj.profileTitle);
				//console.log(obj.profileDesc);
				//console.log(obj.favTag);
				$('#profileTitle').text(obj.profileTitle);
				$('#title_pro').text(obj.profileDesc);
				$('#favoriteTagText').text(obj.favTag);
				

        console.log('obj.phoPath:' + obj.phoPath);
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

		$('#btnChange').click(function(){
			location.href = "main_Pro_modify.html";
		});

	
	
	//위치태그
	$.ajax( serverUrl + '/loglist.ajax', {
		type: 'POST',
		dataType: 'json',
		data: {
			no: window.localStorage.getItem("userNo")
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

//		            	   
//		            	   $(".log_div")
//		            	   				.append("<div class='log_text'>"+test.loctionTag+"</div>")
//		            	   				.append("<div class='log_time'>"+test.logTime+"</div>");
//		               console.log(">>>"+location);
//		               window.localStorage.setItem("locationTagText",location);
//		               
//		               
//		       		$(".fr_bor").append('<li class="fr_li"><a class="send_email" href="../friendProfile/friend_Pro.html">' +
//							'<img class="fr_img" src='+"http://14.32.66.98:9989/talkie/" + friend.phoPath + '>' +
//							'<div class="fr_box"><h4>' +  friend.name +'</h4>' +
//							'<p class="fr_p">' + friend.profileTitle + '</p></div>' +
//							'<div data-re= "'+ friend.recommend +'"  data-no= "'+ friend.no +'" class="fr_ui" data-id= "'+ friend.email +'">
//          <div id="recommend"><span class="ui-li-count">' + friend.recommend+ '</span></div></a></li>');

		               
		               
		               
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
	
	
	

	
});


















