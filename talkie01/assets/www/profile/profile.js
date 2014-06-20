
$(window).load(function(){
	console.log("헤헤헿"+window.localStorage.getItem("email"));
	console.log("serverUrl:" + serverUrl);
	
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
        
				
				/*	location.href="./main_slider.html";*/
			}
		},
		error: function(xhr, status, errorThrown){
			alert('프로필 정보 읽기 중 오류 발생!');
			console.log(status);
			console.log(errorThrown);
		}
	});

	// 등록 성공 후에 해야할 작업을 여기에 기술한다면,당신은 바보!
	//location.href="../subject/list.bit";
});


















