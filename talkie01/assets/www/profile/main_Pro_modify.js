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
var delNo;

$(window).load(function(){
	console.log("실행이 안되나요?");
	console.log("헤헤헿"+window.localStorage.getItem("email"));
	console.log("serverUrl:" + serverUrl);
	locationTagList();
	//프로필수정
  
function locationTagList(){
	$.ajax( 'http://14.32.66.98:9989/talkie/loglist.ajax', {
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
							var location = ("logNo:"+test.logNo+"no:" + test.no +",locationTag:"+ test.loctionTag +",logTime:"+test.logTime);
//							$(".log_div")
//						    .append($("<div class='log_text'></div>").text(test.loctionTag))
//						    .append($("<div class='log_time'></div>").text(test.logTime))
//						    .append($("<img class='location_delete' src='../img/delete.png'>").text(test.logNo));
//        
//							console.log(">>>"+location);
							
							  $("#log").append(
				            			'<div class="log_div">'+
				            			'<li class="log_li"><div class="logImg">'+
									'<img id="locationIcon" class="mainIcon_t" src="../img/location.png"></div>' +
		       	   				    ' <div class="logText"><div class="log_text">'+test.loctionTag+'</div>'+
		       	   				    '<div class="log_time">'+test.logTime+'</div>'+
		       	   				    '<img  data-delno= "'+ test.logNo +'" class="location_delete" src="../img/delete.png"></div></li></div>');
				            	   
		          console.log(">>>"+location);
		          window.localStorage.setItem("locationTagText",location);
		          
		          
						});
						$(".location_delete").on("click",function(){
		        			delNo = $(this).attr("data-delno");
		        			console.log(delNo);
		        			window.localStorage.setItem("delNo",delNo);
		        			console.log(window.localStorage.getItem("delNo"));
		        			deleteLocationLog(window.localStorage.getItem("delNo"));
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

}


	
	$('#iconff').click(function(){
		console.log("호출!");
		$.ajax( serverUrl + '/update.ajax', {
			type: 'POST',
			dataType: 'json',
			data: {
				no: window.localStorage.getItem("userNo"),
				profileTitle : $('#profileTitle_modity').val(),
				profileDesc : $('#title_pro_modity').val(),
				favTag : $('#favoriteTagText_modify').val()
    
			},
			success: function(jsonObj){
				console.log(jsonObj);
				var result = jsonObj.ajaxResult;
				if (result.status != "ok" || result.data == "failure") {
					alert('프로필수정 정보를 읽어오는 데 실패했습니다.');

          } else {
					console.log('locationTag success!');
					console.log(result.data);

					if (result.status == 'ok') {
						console.log(">>>와우! 성공!!");
						location.href = "./main_Pro.html";
						$('#profileTitle').text(obj.profileTitle);
						$('#title_pro').text(obj.profileDesc);
						$('#favoriteTagText').text(obj.favTag);
					}
				}
			},
    
			error: function(xhr, status, errorThrown){
				alert('프로필수정 정보를 읽어오는 데 오류 발생!');
				console.log(status);
				console.log(errorThrown);
			}
        });
		// 등록 성공 후에 해야할 작업을 여기에 기술한다면,당신은 바보!
		//location.href="../subject/list.bit";
    
    
	});

	function showObj(obj) {
		var str = "";
		for(key in obj) {
			str += key+"="+obj[key]+"\n";
		}
	
	
		alert(str);
		return;
}
	function deleteLocationLog(no) {
		console.log("삭제준비중:"+window.localStorage.getItem("delNo"));
		$.getJSON(
				'http://14.32.66.98:9989/talkie' + 
				'/delete.ajax?no=' + window.localStorage.getItem("delNo"),
				function(jsonObj) {
					var result = jsonObj.ajaxResult;
					if (result.status == "ok") {
						console.log("삭제");
						$('.log_text').remove();
						$('.log_time').remove();
						$('.location_delete').remove();
						$('.log_div').remove();
						locationTagList();

					} else {
						console.log("삭제NO");
					}
    });
    }
    
    


});
