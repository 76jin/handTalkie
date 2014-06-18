/*var smartPhones = [];


window.onload = function() {
	//alert(userAgent);
	//alert(userAgent);
  
  console.log('obj.phoPath:', obj.phoPath);
  if (obj.phoPath) {
    $('#profile_img').attr("src", obj.phoPath);
  } else {
    $('#profile_img').attr("src", "./img/profile/no-profile-image.jpg");
  }
}
*/

$(window).load(function(){
  console.log("bit.userEmail:", bit.userEmail);
  console.log('cookie bit.userEmail in profile:', bit.userEmail);
  
  $.ajax( bit.contextRoot + '/profileInfo.ajax', {
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
        console.log(result.data);
        
        var obj = JSON.parse(result.data);
        
        console.log(obj.profileTitle);
        console.log(obj.profileDesc);
        console.log(obj.favTag);
        
        $('#profileTitle_modity').text(obj.profileTitle);
        $('#title_pro_modity').text(obj.profileDesc);
        $('#favoriteTagText_modify').text(obj.favTag);
        
        console.log('obj.phoPath:', obj.phoPath);
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

  // 등록 성공 후에 해야할 작업을 여기에 기술한다면,당신은 바보!
  //location.href="../subject/list.bit";
});

/*var snapper;
window.onload = mainTap;
    $(function() {
      snapper = new Snap({
        element: document.getElementById('content')
        });
      });
function mainTap() {
    
    $('#menuIcon').on('click', function(){

          if( snapper.state().state=="left" ){
              snapper.close();
          } else {
              snapper.open('left');
          }
      });

    
    $( "#map" ).click(function( event ) {
    	$("#map").css("background-color","white")
    	$("#maps").css("color","#4682B4");
    	$("#chat").css("background-color","#4682B4")
      $("#chats").css("color","white");
      });
    $( "#chat" ).click(function( event ) {
        $("#map").css("background-color","#4682B4")
        $("#maps").css("color","white");
        $("#chat").css("background-color","white")
        $("#chats").css("color","#4682B4");
        });
    
    
    $('#tagTap').on('click', function(){
        
        getCurrentLocation();
        
        $('.locationTag').fadeIn(400).delay(1500).fadeOut(400); 
    });
    
	$("#selectBtn").on('click', function(){
		$("#selectBtn").css("display","none");
		$("#f_Btn").css("display","none");
	 });
	
	$("#hh").on('click', function(){
		alert("aaa");
	 });
	
	
}

function getCurrentLocation() {
  //위치 탐색을 시작합니다.
  navigator.geolocation.watchPosition(function (position) {
    // 위치를 가져오는데 성공할 경우
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    console.log("getCurrentLocation: ", latitude, longitude);

    new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      icon: markerImage2,
      map: map
    });
  }, function (error) {
    // 위치를 가져오는데 실패할 경우
    console.log("error:" + error.code);
    
    if(error.code == 1) {
      alert("Error: Access is denied!");
    }else if( error.code == 2) {
      alert("Error: Position is unavailable!");
    }
    
    alert("error:" + error);
    
  }, { timeout: 30000 });
}*/

