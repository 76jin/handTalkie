$(document).ready(function(){
	// 화면 로딩이 완료되면, 로그인 버튼의 리스너를 등록한다.
	$('#signupBtn').on('click', function(event){
		event.preventDefault();

		/* 입력 체크 */
		if ($('#name').val().length == 0) {
			alert('이름은 필수 입력입니다.');
			$('#name').focus();
			return;
		}
		
		if ($('#email').val().length == 0) {
			alert('이메일은 필수 입력입니다.');
			$('#email').focus();
			return;
		}
		
		if ($('#password').val().length == 0) {
			alert('암호는 필수 입력입니다.');
			$('#password').focus();
			return;
		}
		
		if ($('#country').val().length == 0) {
			alert('국가 선택은 필수 입력입니다.');
			$('#country').focus();
			return;
		}
		
		if ($('#language').val().length == 0) {
			alert('언어는 필수 입력입니다.');
			$('#language').focus();
			return;
		}
		/* 입력 체크 끝 */
		
		
		
		$.ajax(bit.serverUrl+'/auth/insertSignUp.ajax', {
			type: 'POST',
			dataType: 'json', /*서버에서 보내는 데이터의 형식 지정 */
			data: { /* 서버쪽으로 보내는 데이터 */
				name: $('#name').val(),
				email: $('#email').val(),
				password: $('#password').val(),
				country: $('#country').val(),
				language: $('#language').val()
			},
			success: function(jsonObj){
				console.log(jsonObj);
				var result = jsonObj.ajaxResult;
				if (result.status == "ok" && result.data == "success") {
					console.log('singup success!');
					location.href="./NewMainLogin.html";
				} else {
					alert('등록에 실패했습니다.');
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
});


















