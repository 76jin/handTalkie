/* HTML5 geolocation
 *  - HTML5에 추가된 geolocation은 이용자가 위치정보 제공에 동의하면
 *   사용자의 현재 위치정보를 활용할 수 있게 해 준다.
 *  - GPS 내장 기기에서는 GPS 기능을 활용할 수 있고,
 *  - 일반 PC에서는 WiFi 정보를 이용해서 현재 정보를 알아낼 수 있다.
 *     ex) console.log(navigator.geolocation);
 *  - getCurrentPosition 메서드를 이용해서 사용자의 현재 위치를 알아낼 수 있다.
 *  - Geolocation API와 관련된 함수는 모두 window.navigator 객체에 정의됨.
 *  - 다음 함수로 위치 정보를 3초마다 확인할 수 있다.
 *   var watchld = navigator.geolocation.watchPosition(
 *     successCallback, errorCallback, options);
 *     options: {maximumAeg:0,
 *     enableHighAccuracy:true
 *     timeout: 3000
 *   }
 */

var map;                // html div id='map'
var currentPosition;    // 사용자의 현재 위치 정보
var isTest = true;		  // 테스트용 코드인지.
var checkedImage = "../img/check_green.png";
var checkedUsers = [];  // 채팅하기 위해 선택된 사용자 번호 저장 배열.
//var otherPosition = [];		// 사용자 주변에 있는 다른 사용자의 현재 위치 정보

/* 생성자 함수
 * 목적: 지도에 표시되는 사용자 위치 정보를 저장하는 객체
 * 사용법
 *   ex) UserPositionInfo.me = new UserPositionInfo.Create([userNo], [userGPSPos]);
 *   ex) UserPositionInfo.others_01 = new UserPositionInfo.Create([userNo], [userGPSPos]);
 *   - [userNo] : DB에서 읽어온 사용자 번호
 *   - [userGPSPos]: 서버에서 받은 이 사용자의 현재 위치정보
 *      - 다음과 같이 배열로 구성됨: [위도, 경도] 
 *  
 *  ToDo - 나중에 이 변수를 main_Tap.js로 옮겨야함. 거기서 사용자 위치정보 받아 저장해야 함.
 */
var UserPositionInfo = {};    // 내 주변에 있는 다른 사용자정보 관리를 위한 객체.
UserPositionInfo.others = []; // 내 주변에 있는 다른 사용자의 userNo와 위치정보.
UserPositionInfo.Create = function(userNo, userPosition) {
  this.userNo = userNo;
  this.userPosition = userPosition;
}


////마커 정보 ////////////////////////
var userMarker;         // 사용자의 위치를 알려주는 표시
var markersArray = [];  // 사용자 주변에 있는 사람들의 위치 표시

var markerImage1 = 'http://www.larva.re.kr/home/img/character_02_1.png';
var markerImage2 = 'http://www.larva.re.kr/home/img/character_01.png';
var markerImage3 = 'http://www.larva.re.kr/home/img/boximage3.png';

var size_x = 45; // 마커로 사용할 이미지의 가로 크기
var size_y = 45; // 마커로 사용할 이미지의 세로 크기

var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;
function initialize() {

}

//마커 이미지 만들기
function makeMarkerImage(markerImage) {
  
  
  return new google.maps.MarkerImage( markerImage,
            new google.maps.Size(size_x, size_y),
            '',
            '',
            new google.maps.Size(size_x, size_y) );
}
////마커 정보 끝 ////////////////////////

var displayCurrentLocation = function (position) {

	// 사용자의 현재 위치 정보 가져오기 (모바일에서만 되는거 같음. 확인필요.)
  var pos = new google.maps.LatLng(position.coords.latitude,
      position.coords.longitude);
  
  // 사용자 정보를 전역변수에 저장
	//UserPositionInfo.me = new UserPositionInfo.Create(1, [37.494631, 127.027583]);
	//console.log('UserPositionInfo.me:' + UserPositionInfo.me);
  
	//var pos = new google.maps.LatLng(37.494631, 127.027583); //비트컴퓨터
  map.setCenter(pos); // 현재 위치를 지도 가운데로 하기.

  // 사용자의 현재 위치 저장.
  currentPosition = pos;
  console.log('currentPos:' + position.coords.latitude + "," + position.coords.longitude);

  // 현재 사용자 위치를 지도에 표시
  addUserMarker(currentPosition);

	var currentPos = position.coords.latitude + "," + position.coords.longitude;
	window.localStorage.setItem("currentPos",currentPos);
	console.log("User Email :"+window.localStorage.getItem("currentPos"));

}

$('#tagTap').on('click', function(){

//	역지오코딩 함수
	//var input = "37.4938344,127.0283759";
	var input = window.localStorage.getItem("currentPos");
	var latlngStr = input.split(',', 2);
	var lat = parseFloat(latlngStr[0]);
	var lng = parseFloat(latlngStr[1]);
	var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
//				map.setZoom(15);
				marker = new google.maps.Marker({
					position: latlng,
					map: map
				});

				var location_t = results[1].formatted_address;
				infowindow.setContent(results[1].formatted_address);
				console.log("location_t:"+location_t); 
				
				window.localStorage.setItem("location_t",location_t);
				console.log("User location_t :"+window.localStorage.getItem("location_t"));
				// infowindow.open(map, marker);
				$('.locationTag').fadeIn(400).delay(1500).fadeOut(400); 
				$("#locationTagText").text(location_t);

			} else {
				alert('No results found');
			}
		} else {
			alert('Geocoder failed due to: ' + status);
		}
	});

	
	
	$.ajax(	serverUrl + '/insert.ajax', {
		type: 'POST',
		dataType: 'json',
		data: {
			no: window.localStorage.getItem("userNo"),
			loctionTag: window.localStorage.getItem("location_t")
		},
		success: function(jsonObj){
			console.log(jsonObj);
			var result = jsonObj.ajaxResult;
			if (result.status != "ok" || result.data == "failure") {
				alert('위치정보태그를 읽어오는 데 실패했습니다.');
			} else {
				console.log('locationTag22 success!');
				console.log(result.data);
			}
		},
		error: function(xhr, status, errorThrown){
			alert('사용자 위치정보태그를 읽어오는 중 오류 발생!');
			console.log(status);
			console.log(errorThrown);
		}
	});


	
	
});





var displayOtherLocation = function (position, userPhotoPath) {

  // 주위 사람들 위치를 지도에 표시
  addMarker(position, userPhotoPath);
}

function initialize() {
	geocoder = new google.maps.Geocoder();
  var mapOptions = {
			zoom: 15,
  };

  // Map을 그리는 작업
  map = new google.maps.Map(document.getElementById('mainMap'),
      mapOptions);

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayCurrentLocation, function() {
      handleNoGeolocation(true);
    });

    // 지도 클릭 이벤트 등록
    // 테스트용 코드
    if(isTest) {
    /* 임의로 사용자 5명의 위치 정보를 지정하고 화면에 출력함.
     * 2.임꺽정. 	37.49760569477413, 127.02422618865967
     * 3.장보고. 	37.49338360812417, 127.02311038970947
     * 4.이순신. 	37.49103411783421, 127.0259428024292
     * 5.강감찬. 	37.492838805363476, 127.03263759613037
     * 6.tom. 	37.498593083824986, 127.03276634216309
     */
      // 사용자 정보를 전역변수에 저장
      var othersTempNo = [2, 3, 4, 5, 6];
      var othersTempPos = [   // 내 주변에 있는 다른 사람들 위치 정보.(LatLng type)
                           [37.49760569477413, 127.02422618865967],
                           [37.49338360812417, 127.02311038970947],
                           [37.49103411783421, 127.0259428024292],
                           [37.492838805363476, 127.03263759613037],
                           [37.498593083824986, 127.03276634216309]
                           ];
      
      var othersTempPhotoPath = [
                                 "img/profile/profile_2.jpg",
                                 "img/profile/profile_3.jpg",
                                 "img/profile/profile_4.jpg",
                                 "img/profile/profile_5.jpg",
                                 "img/profile/profile_6.jpg",
                                 ];
      
      for (var i=0; i < othersTempNo.length; i++) {
        var otherLength = UserPositionInfo.others.length;
        UserPositionInfo.others[otherLength] = [];
        UserPositionInfo.others[otherLength].push(othersTempNo[i]); // othersNo
        
        var tempLatLng = new google.maps.LatLng(othersTempPos[i][0], othersTempPos[i][1]);
        UserPositionInfo.others[otherLength].push(tempLatLng);  // othersPosition
        
        displayOtherLocation(UserPositionInfo.others[i][1], othersTempPhotoPath[i]);    // display other positon in map.
      }
      console.log('UserPositionInfo.others:' + UserPositionInfo.others);
      //console.log('UserPositionInfo:', UserPositionInfo);

      //infowindow.open(map,marker);
      //
    	  
    	
    	
    } // end isTest
    

    // 지도 클릭 이벤트 등록
    google.maps.event.addListener(map, 'click', function(event) {
      console.log('touched by user. location: ' + event.latLng.toString());
      hideShortProfile();
    });

  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

function showShortProfile() {
  $("#f_Btn").appendTo($("#header"));
  $("#f_Btn").css("display","");

  $("#selectBtn").appendTo($("#footer"));
  $("#selectBtn").css("display","")
}

function hideShortProfile() {
  $("#f_Btn").appendTo($("#header"));
  $("#f_Btn").css("display","none");

  $("#selectBtn").appendTo($("#footer"));
  $("#selectBtn").css("display","none")
}
function addUserMarker(location) {
  userMaker = new google.maps.Marker({
    position:location,
    title: 'I am here.', // mount point show. 
		icon: marker,
    content:"It's me!"
  });

  userMaker.setMap(map);
}

var count = 0;
function addMarker(location, userPhotoPath) {
  
  //console.log('called addMarker, userPhotoPath:' + userPhotoPath);
  
  // 체크되지 않은 다른 사용자 마커
  var newMarkerImage = makeMarkerImage(serverUrl + "/" + userPhotoPath);
  var marker = new google.maps.Marker({
    position:location,
    icon: newMarkerImage
  });
  
  // 체크된 다른 사용자 마커
  var newCheckedMarkerImage = makeMarkerImage(checkedImage);
  var checkedMarker = new google.maps.Marker({
    position:location,
    icon: newCheckedMarkerImage
  });
  var checkedFlag = false;

  marker.setMap(map);
  //markersArray.push(marker);

  google.maps.event.addListener(marker, "click", function(event) {
    console.log('click marker! event.latLng:' + event.latLng);
    
    var foundUserNo = 0;
    for (var i=0; i<UserPositionInfo.others.length;i++) {
      if (event.latLng == UserPositionInfo.others[i][1]) {
        foundUserNo = UserPositionInfo.others[i][0];
        break;
      }
    }
    console.log("===== clicked other postion:" + foundUserNo);
    
    // check/uncheck image 제어 코드
    checkedFlag = !checkedFlag;
    
    console.log('checkedFlag:' + checkedFlag);
    if (checkedFlag) {
      checkedMarker.setMap(map);
      console.log('before checkedUsers:' + checkedUsers);

      checkedUsers[foundUserNo] = foundUserNo;
      console.log('pushed no:' + foundUserNo);
      console.log('after checkedUsers:' + checkedUsers);
    } else {
      marker.setMap(map);
    }
    

	  console.log('===== ranian ===== serverUrl:' + serverUrl);
		$.ajax(	serverUrl + '/ShortProfile.ajax', {
			type: 'POST',
			dataType: 'json',
			data: {
				no: foundUserNo
			},
			success: function(jsonObj){
				console.log(jsonObj);
				var result = jsonObj.ajaxResult;
				if (result.status != "ok" || result.data == "failure") {
					alert('사용자 정보를 읽어오는 데 실패했습니다.');
				} else {
					console.log('friendInfo success!');
					console.log(result.data);
					
					var volist = JSON.parse(result.data);
					var nation = '';
					var languageNo = '';
					var photoPath = '';
					$.each( volist, function( key, value ) {
							switch (value.nation) {
							case 1:  nation ="korea"; break;
							case 2:  nation ="U.S.A"; break;
							default: nation ="korea"; break;
							break;
							}
							switch (value.languageNo) {
							case  1 : languageNo += "Korean "; break;
 							case  2 :	languageNo += "English "; break;
							default:			languageNo += "Korean "; break;
							}
							photoPath = value.photoPath;
						});
					
					$('#friName').text(volist[0].name);
					$('#friCountry').text(nation);
					$('#friLanguage').text(languageNo);
					$('#imgproFile').attr("src", serverUrl + "/" + photoPath);
				}
			},
			error: function(xhr, status, errorThrown){
				alert('사용자 정보를 읽어오는 중 오류 발생!');
				console.log(status);
				console.log(errorThrown);
			}
		});
		
	  showShortProfile();
  });
  
  google.maps.event.addListener(checkedMarker, "click", function (event) {
    console.log('click checkedMarker event.latLng:' + event.latLng);
    
    var foundUserNo = 0; // 선택된 사용자의 번호를 찾아서 저장.
    for (var i=0; i<UserPositionInfo.others.length;i++) {
      if (event.latLng == UserPositionInfo.others[i][1]) {
        foundUserNo = UserPositionInfo.others[i][0];
        break;
      }
    }
    console.log("===== clicked other postion:" + foundUserNo);
    
    // check/uncheck image 제어 코드
    checkedFlag = !checkedFlag;
    
    console.log('checkedFlag:' + checkedFlag);
    if (checkedFlag) {
      checkedMarker.setMap(map);
    } else {
      checkedMarker.setMap(null);
//      marker.setMap(map);
//      checkedUsers.pop(foundUserNo);
      delete(checkedUsers[foundUserNo]);
      console.log('poped no:' + foundUserNo);
      console.log('poped checkedUsers:' + checkedUsers);
    }
    

    console.log('===== ranian ===== serverUrl:' + serverUrl);
    $.ajax( serverUrl + '/ShortProfile.ajax', {
      type: 'POST',
      dataType: 'json',
      data: {
        no: foundUserNo
      },
      success: function(jsonObj){
        console.log(jsonObj);
        var result = jsonObj.ajaxResult;
        if (result.status != "ok" || result.data == "failure") {
          alert('사용자 정보를 읽어오는 데 실패했습니다.');
        } else {
          console.log('friendInfo success!');
          console.log(result.data);
          
          var volist = JSON.parse(result.data);
          var nation = '';
          var languageNo = '';
          var photoPath = '';
          $.each( volist, function( key, value ) {
              switch (value.nation) {
              case 1:  nation ="korea"; break;
              case 2:  nation ="U.S.A"; break;
              default: nation ="korea"; break;
              break;
              }
              switch (value.languageNo) {
              case  1 : languageNo += "Korean "; break;
              case  2 : languageNo += "English "; break;
              default:      languageNo += "Korean "; break;
              }
              photoPath = value.photoPath;
            });
          
          $('#friName').text(volist[0].name);
          $('#friCountry').text(nation);
          $('#friLanguage').text(languageNo);
          $('#imgproFile').attr("src", serverUrl + "/" + photoPath);
        }
      },
      error: function(xhr, status, errorThrown){
        alert('사용자 정보를 읽어오는 중 오류 발생!');
        console.log(status);
        console.log(errorThrown);
      }
    });
    
    showShortProfile();
  });
    
}

//Removes the overlays from the map, but keeps them in the array
function clearOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
  }
}
/*
//Shows any overlays currently in the array
function showOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(map);
    }
  }
}

//Deletes all markers in the array by removing references to them
function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
}

function openInfoWindow(msg, marker) {
  var infowindow = new google.maps.InfoWindow({
    content:msg
  });

  infowindow.open(map,marker);
}
*/
/// test ///
function initialize_Polygon(){

  var latlng = new google.maps.LatLng(37.478034,127.184032); // 중앙지점 좌표값 입력 – 남한산성 로터리

  var myOptions = {
      zoom: 17,
      center:latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map02 = new google.maps.Map(document.getElementById('map'), myOptions);
  
  var polygoneCoords = [ // Polygon의 꼭지점 좌표
                         new google.maps.LatLng(37.486233,127.174387),
                         new google.maps.LatLng(37.482487,127.190523),
                         new google.maps.LatLng(37.47588,127.202797),
                         new google.maps.LatLng(37.466411,127.193098),
                         new google.maps.LatLng(37.473496,127.17782),
                         new google.maps.LatLng(37.480171,127.171211)
                         ];

  namhansanseongPolygon = new google.maps.Polygon({
    paths: polygoneCoords,
    strokeColor: '#000000', // 선의 색상
    strokeOpacity: 0.8, // 선의 투명도
    strokeWeight: 2, // 선의 굵기 px
    fillColor: '#808080', // 채우기 색상
    fillOpacity:0.5// 채우기 색상의 투명도
  });

  namhansanseongPolygon.setMap(map02);// setMap 함수로 기존 지도 위에 Polygon을 올려놓음

}


google.maps.event.addDomListener(window, 'load', initialize);

///////////////// useful functions
/////////////////