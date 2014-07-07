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
	console.log("헤헤헿"+window.localStorage.getItem("email"));
	console.log("serverUrl:" + serverUrl);
	locationTagList();
	//프로필수정
  
function locationTagList(){
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
							var location = ("logNo:"+test.logNo+"no:" + test.no +",locationTag:"+ test.loctionTag +",logTime:"+test.logTime);
							$(".log_div")
						    .append($("<div class='log_text'></div>").text(test.loctionTag))
						    .append($("<div class='log_time'></div>").text(test.logTime))
						    .append($("<img class='location_delete' src='../img/delete.png'>").text(test.logNo));
        
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
        
	$('.log_div').click(function(event){
		console.log("삭제준비중:"+$(event.target).text());
        
//		console.log("삭제준비중:"+showObj(event.target));
		deleteLocationLog($(event.target).text());
    
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
		console.log("삭제준비중:"+no);
		$.getJSON(
				serverUrl + 
				'/delete.ajax?no=' + no,
				function(jsonObj) {
					var result = jsonObj.ajaxResult;
					if (result.status == "ok") {
						console.log("삭제");
						$('.log_text').remove();
						$('.log_time').remove();
						$('.location_delete').remove();

						locationTagList();

					} else {
						console.log("삭제NO");
					}
    });
    }
    
    


});
