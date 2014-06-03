var testEmail = 'hong@test.com';

$(window).load(function(){
	$.ajax('friendList.ajax', {
		type: 'POST',
		dataType: 'json',         /*서버에서 보내는 데이터의 형식 지정 */
		data: {                         /* 서버쪽으로 보내는 데이터 */
			email: testEmail
		},
		success: function(jsonObj){
			console.log(jsonObj);
			var result = jsonObj.ajaxResult;
			if (result.status == "ok" && result.data == "failure") {
				alert('친구 리스트를 불러 오는데 실패 했습니다.');
			} else {

				alert('친구 정보를 불러오기 성공');
				console.log('friendList: ', result);
				console.log('friendList[0]: ', result.data[0].friendNo);
				
				getFriendInfo(result.data[0].friendNo);
			}
		},
		error: function(xhr, status, errorThrown){
			alert('친구 리스트를 불러올 수 없습니다.');
			console.log(status);
			console.log(errorThrown);
		}

		// 로그인 성공 후에 해야할 작업을 여기에 기술한다면,당신은 바보!
		//location.href="../subject/list.bit";
	});

});

function getFriendInfo() {
	$.ajax('getFriendInfo.ajax', {
		type: 'POST',
		dataType: 'json',         /*서버에서 보내는 데이터의 형식 지정 */
		data: {                         /* 서버쪽으로 보내는 데이터 */
			email: testEmail
		},
		success: function(jsonObj){
			console.log(jsonObj);
			var result = jsonObj.ajaxResult;
			if (result.status == "ok" && result.data == "failure") {
				alert('친구 정보를 불러 오는데 실패 했습니다.');
			} else {

				alert('친구 정보를 불러오기 성공');
				console.log('friendList: ', result);
			}
		},
		error: function(xhr, status, errorThrown){
			alert('친구 정보를 불러올 수 없습니다.');
			console.log(status);
			console.log(errorThrown);
		}

		// 로그인 성공 후에 해야할 작업을 여기에 기술한다면,당신은 바보!
		//location.href="../subject/list.bit";
	});
}






