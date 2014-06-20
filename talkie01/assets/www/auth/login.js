var serverUrl = 'http://14.32.7.49:9977/talkie';
var chatServerUrl = 'http://14.32.7.49:9978';
$(document).ready(function(){
  init_common();

	// 화면 로딩이 완료되면, 로그인 버튼의 리스너를 등록한다.
	
	
	$("#loginBtn").on('click',function(){
		$("#LoginBox_1").css("display","none");
		$("#login_start").css('display',"");
	});
	
	$("#already").on('click',function(){
		$("#LoginBox_1").css('display',"");
		$("#login_start").css("display","none");
	});
  
	$("#signup").on('click',function(){
		$("#LoginBox_1").css("display","none");
		$("#signup_Box").css('display',"");
	});

	$("#already2").on('click',function(){
		$("#LoginBox_1").css('display',"");
		$("#signup_Box").css("display","none");
	});
  

	  //serverUrl = "http://s24.java48.com:9977/talkie/"
  //chatServerUrl = 'http://s24.java48.com:9998;
  //console.log('bit is undefined!!!');
  serverUrl = 'http://14.32.7.49:9977/talkie';
  chatServerUrl = 'http://14.32.7.49:9978';
  
  console.log('serverUrl:' + serverUrl);
  console.log('chatServerUrl:' + chatServerUrl);
	
	$('#btnLogin').on('click', function(event){
		event.preventDefault();
		if ($('#email').val().length == 0 ||
				$('#password').val().length == 0) {
			alert('이메일과 암호는 필수 입력입니다.');
			return;
		}
		
		console.log("serverUrl in login.js:" + serverUrl);
		
		$.ajax(serverUrl +'/auth/login.ajax', {
			type: 'POST',
			dataType: 'json', /*서버에서 보내는 데이터의 형식 지정 */
			data: { /* 서버쪽으로 보내는 데이터 */
				email: $('#email').val(),
				password: $('#password').val(),
				saveEmail: ($('#saveEmail:checked').length > 0) ? 
						'true':'false'
			},
			success: function(jsonObj){
				console.log(jsonObj);
				var result = jsonObj.ajaxResult;
				if (result.status != "ok" || result.data == "failure") {
				  alert('이메일 또는 암호가 맞지 않습니다.');
				} else {
				  //console.log('loginUser.no:' + jsonObj.loginUser.no);
				  console.log('result.data(userNo):' + result.data);
				  
				  // 사용자 정보 저장
				  window.localStorage.setItem("userNo",result.data);
				  window.localStorage.setItem("email",$('#email').val());
				  window.localStorage.setItem("serverUrl",serverUrl);
				  window.localStorage.setItem("chatServerUrl",chatServerUrl);
				  
					location.href = "../map/main_Tap.html";
				}
			},
			error: function(xhr, status, errorThrown){
				alert('로그인 실행 중 오류 발생!');
				console.log(status);
				console.log(errorThrown);
			}
		});
		
		// 로그인 성공 후에 해야할 작업을 여기에 기술한다면,당신은 바보!
		//location.href="../subject/list.bit";
	});
});


















