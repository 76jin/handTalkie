var snapper;
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
		//alert("aaa");
		window.openURL("./main_Pro_modify.html");
	 });
	
	getUserInfo();
	
	
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
}

function getUserInfo() {
	console.log('call getUserInfo');
	$.getJSON(
		bit.contextRoot + '/auth/getUserInfo.ajax', 
		function(jsonObj) {
			console.log('dddd');
			console.log(bit);
			console.log(bit.contextRoot);
			
			var result = jsonObj.ajaxResult;
			if (result.status == "ok") {
				var user = result.data;
				console.log(user);
				
				$('#name').text(user.name);
/*				$('#loginEmail').text(user.email);*/
				
				var nation;
				switch (user.nation) {
					case 1: nation = 'Korea';
					case 2: nation = 'U.S.A';
					default: nation = 'Korea';
				}
				
				console.log('nation:', nation);
				
				var language;
				switch (user.nation) {
					case 1: language = 'Korean';
					case 2: language = 'English';
					default: language = 'Korean';
				}
				console.log('language:', language);
				
				$('#profileCountry').text(nation);
				$('#profileLanguage').text(language);
			} else {
				alert("로그인 하지 않았습니다.111");
				location.href = bit.contextRoot + "/auth/main_slider.html";
			}
		});
}

