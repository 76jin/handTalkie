
$(window).load(function(){
  console.log("bit.userEmail:", bit.userEmail);
  console.log('cookie bit.userEmail in profile:', bit.userEmail);
  
	$.ajax(	bit.contextRoot + '/profileInfo.ajax', {
		type: 'POST',
		dataType: 'json',
		data: {
			email: bit.userEmail
		},
		success: function(jsonObj){
			console.log(jsonObj);
			var result = jsonObj.ajaxResult;
			if (result.status == "ok" && result.data == "failure") {
				alert('프로필 정보를 읽어오지 못했습니다..');
			} else {
			  console.log('cookie bit.userNo in profile:', bit.userNo);
				console.log('profileInfo success!');
				//console.log(result.data);
				
				var obj = JSON.parse(result.data);
				
				//console.log(obj.profileTitle);
				//console.log(obj.profileDesc);
				//console.log(obj.favTag);
				
				$('#profileTitle').text(obj.profileTitle);
				$('#title_pro').text(obj.profileDesc);
				$('#favoriteTagText').text(obj.favTag);
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


















