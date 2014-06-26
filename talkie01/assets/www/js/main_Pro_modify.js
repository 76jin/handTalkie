/*var smartPhones = [];


window.onload = function() {
	//alert(userAgent);
	//alert(userAgent);
  
  console.log('obj.phoPath:' + obj.phoPath);
  if (obj.phoPath) {
    $('#profile_img').attr("src", obj.phoPath);
  } else {
    $('#profile_img').attr("src", "./img/profile/no-profile-image.jpg");
  }
}
*/

$(window).load(function(){
	console.log("실행이 안되나요?");
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
        console.log('cookie bit.userNo in profile:' + bit.userNo);
        console.log('profileInfo success!');
        console.log(result.data);
        
        var obj = JSON.parse(result.data);
        
        console.log(obj.profileTitle);
        console.log(obj.profileDesc);
        console.log(obj.favTag);
        
        $('#profileTitle_modity').text(obj.profileTitle);
        $('#title_pro_modity').text(obj.profileDesc);
        $('#favoriteTagText_modify').text(obj.favTag);
        
        console.log('obj.phoPath:' + obj.phoPath);
        if (obj.phoPath) {
          $('#profile_img').attr("src", obj.phoPath);
        } else {
          $('#profile_img').attr("src", "./img/profile/no-profile-image.jpg");
        }
        
        
        /*  location.href="./main_slider.html";*/
      }
    },
    error: function(xhr, status, errorThrown){
      alert('프로필 정보 읽기 중 오류 발생!');
      console.log(status);
      console.log(errorThrown);
    }
  });


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
		            	   $("#log").append("<div class='log_text'>"+test.loctionTag+"</div>")
		            	   				.append("<div class='log_time'>"+test.logTime+"</div>");
		               console.log(">>>"+location);
    
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
    
    

});
