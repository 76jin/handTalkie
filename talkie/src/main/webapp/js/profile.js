var testEmail = 'hong@test.com';

$(window).load(function(){
	$.ajax(	bit.contextRoot + '/profileInfo.ajax', {
		type: 'POST',
		dataType: 'json', /*서버에서 보내는 데이터의 형식 지정 */
		data: { /* 서버쪽으로 보내는 데이터 */
			//email: $('#email').val(),
			email: testEmail
		},
		success: function(jsonObj){
			console.log(jsonObj);
			var result = jsonObj.ajaxResult;
			if (result.status == "ok" && result.data == "failure") {
				alert('등록에 실패했습니다.');
			} else {
				console.log('profileInfo success!');
				console.log(result.data);
				
				var obj = JSON.parse(result.data);
				
				console.log(obj.profileTitle);
				console.log(obj.profileDesc);
				console.log(obj.favTag);
				
				$('#profileTitle').text(obj.profileTitle);
				$('#title_pro').text(obj.profileDesc);
				$('#favoriteTagText').text(obj.favTag);
				/*	location.href="./main_slider.html";*/
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
});


















