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
var isTest = true;		// 테스트용 코드인지.
var otherPosition = [];		// 사용자 주변에 있는 다른 사용자의 현재 위치 정보


////마커 정보 ////////////////////////
var userMarker;         // 사용자의 위치를 알려주는 표시
var markersArray = [];  // 사용자 주변에 있는 사람들의 위치 표시

var markerImage1 = 'http://www.larva.re.kr/home/img/character_02_1.png';
var markerImage2 = 'http://www.larva.re.kr/home/img/character_01.png';
var markerImage3 = 'http://www.larva.re.kr/home/img/boximage3.png';

var size_x = 45; // 마커로 사용할 이미지의 가로 크기
var size_y = 45; // 마커로 사용할 이미지의 세로 크기

//마커로 사용할 이미지 주소
var markerImage = new google.maps.MarkerImage( markerImage3,
    new google.maps.Size(size_x, size_y),
    '',
    '',
    new google.maps.Size(size_x, size_y));
////마커 정보 끝 ////////////////////////

var displayCurrentLocation = function (position) {

  /* 사용자의 현재 위치 정보 가져오기 (모바일에서만 되는거 같음. 확인필요.)
  var pos = new google.maps.LatLng(position.coords.latitude,
      position.coords.longitude);
   */
  var pos = new google.maps.LatLng(37.494631, 127.027583); //비트컴퓨터
  map.setCenter(pos); // 현재 위치를 지도 가운데로 하기.

  // 사용자의 현재 위치 저장.
  currentPosition = pos;
  console.log('currentPos:', position.coords.latitude, position.coords.longitude);

  // 현재 사용자 위치를 지도에 표시
  addUserMarker(currentPosition);
}

var displayOtherLocation = function (position) {


  // 주위 사용자의 현재 위치 저장.(필요할까?)
  otherPosition.push(position);
  //currentPosition = pos;

  // 2. 주위 사람들 위치를 지도에 표시
  addMarker(position);
}

function initialize() {
  var mapOptions = {
      zoom: 15
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
     * 임꺽정. 	37.49760569477413, 127.02422618865967
     * 장보고. 	37.49338360812417, 127.02311038970947
     * 이순신. 	37.49103411783421, 127.0259428024292
     * 강감찬. 	37.492838805363476, 127.03263759613037
     * tom. 	37.498593083824986, 127.03276634216309
     * 
     */

      displayOtherLocation(new google.maps.LatLng(37.49760569477413, 127.02422618865967));
      displayOtherLocation(new google.maps.LatLng(37.49338360812417, 127.02311038970947));
      displayOtherLocation(new google.maps.LatLng(37.49103411783421, 127.0259428024292));
      displayOtherLocation(new google.maps.LatLng(37.492838805363476, 127.03263759613037));
      displayOtherLocation(new google.maps.LatLng(37.498593083824986, 127.03276634216309));
      //infowindow.open(map,marker);
      //
    	  
    	
    	
    } // end isTest
    

    // 지도 클릭 이벤트 등록
    google.maps.event.addListener(map, 'click', function(event) {
      console.log('touched by user. location: ', event.latLng.toString());
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
    icon: "http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe%7C996600",
    content:"It's me!"
  });

  userMaker.setMap(map);
}

var count = 0;
function addMarker(location) {
  console.log('called addMarker');
  
  var tempContent = "I am newview" + ++count; 

  var marker = new google.maps.Marker({
    position:location,
    icon: markerImage,
    content: tempContent
  });

  marker.setMap(map);
  //markersArray.push(marker);

  google.maps.event.addListener(marker, "click", function(event) {

    /*    $.each(markersArray, function( index, value ) {
      console.log( index + ": " + value );
    });*/
	  var num = 0;
	  for (var i=0; i<otherPosition.length;i++) {
		  if (event.latLng == otherPosition[i]) {
			  num = i + 2;
			  break;
		  }
	  }

    //openInfoWindow("profile: " + count, marker);
	  console.log("clicked other postion");
		$.ajax(	bit.contextRoot + '/ShortProfile.ajax', {
			type: 'POST',
			dataType: 'json', /*서버에서 보내는 데이터의 형식 지정 */
			data: { /* 서버쪽으로 보내는 데이터 */
				//email: $('#email').val(),
				no: num
				
			},
			success: function(jsonObj){
				console.log(jsonObj);
				var result = jsonObj.ajaxResult;
				if (result.status == "ok" && result.data == "failure") {
					alert('등록에 실패했습니다.');
				} else {
					console.log('friendInfo success!');
					console.log(result.data);
					
					var volist = JSON.parse(result.data);
					var nation = '';
					var languageNo = '';
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
						});
					
					$('#friName').text(volist[0].name);
					$('#friCountry').text(nation);
					$('#friLanguage').text(languageNo);
				}
			},
			error: function(xhr, status, errorThrown){
				//alert('등록 중 오류 발생!');
				console.log(status);
				console.log(errorThrown);
			}
		});
	  showShortProfile();
        
        
        /*
        $('#menuIcon').on('click', function(){
	  		snapper = new Snap({
	        element: document.getElementById('footer')
	        });
  
            if( snapper.state().state=="bottom" ){
                snapper.close();
            } else {
                snapper.open('bottom');
            }
        });
        */
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
    strokeColor: '#FF0000', // 선의 색상
    strokeOpacity: 0.8, // 선의 투명도
    strokeWeight: 1, // 선의 굵기 px
    fillColor: '#784d9d', // 채우기 색상
    fillOpacity: 0.2 // 채우기 색상의 투명도
  });

  namhansanseongPolygon.setMap(map02);// setMap 함수로 기존 지도 위에 Polygon을 올려놓음

}


google.maps.event.addDomListener(window, 'load', initialize);

///////////////// useful functions
/////////////////