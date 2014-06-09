// Variable to store your files
var files;
 

var init = function(){
  // 프로필 사진 클릭 이벤트 등록 - 사진 클릭하면 프로필 시진 수정한다.
  $('#profile_img').on('click', function() {
   // alert('clicked!!');
    
    var fileSelector = $('#profilePhoto').css('opacity','0');
//    fileSelector.click();
    var uploadFile = fileSelector.click()[0].files;
    
    $('#profilePhoto').on('change', function (event) {
        //console.log(this.files);
        console.log('bit.userNo:', bit.userNo);
        
        files = event.target.files;
        console.log('files:', files);
        
        //$('#uploadForm').ajaxForm(ImguploadCallback); //파일전송 후 실행할 콜백함수 지정
        $('#uploadForm').on('submit', uploadFiles);
        $('#uploadForm').submit();
        /*
        uploadForm.submit(function (event){
          
          // 유효성 검사 (코드 검증해야함)
          //var uploadFile = files.files[0];
          if (!(/png|jpe?g|gif/i).test(uploadFile.name)) {
              alert('png, jpg, gif 만 가능합니다');
              return false;
          } else if (uploadFile.size > 5000000) { // 5mb
              alert('파일 용량은 5메가를 초과할 수 없습니다.');
              return false;
          }
          
        });*/
        
        // 서버에 선택한 사진 업로드
/*        var photoData = new FormData();
        photoData.append('file-0', this.files);
        photoData.append( 'photoData', this.files );
        console.log(photoData);*/
        
/*        $.ajax( bit.contextRoot + '/profilePhoto.ajax', {
          type: 'POST',
          data: photoData,
          cache: false,
          contentType: false,
          processData: false,
          success: function(jsonObj){
            console.log(jsonObj);
            var result = jsonObj.ajaxResult;
            if (result.status == "ok" && result.data == "failure") {
              alert('프로필 사진 등록에 실패했습니다.');
            } else {
              alert('프로필 사진 등록에 성공했습니다.');
              console.log('result.data:', result.data);
              
              var obj = JSON.parse(result.data);
              console.log('obj:', obj);
              //console.log(obj.profileTitle);
              
              // 서버에서 다운받아 프로필 사진 변경 완료하기
//            $('#profile_img').attr('src', this.files);
            }
          },
          error: function(xhr, status, errorThrown){
            alert('프로필 사진 등록 중 오류 발생!');
            console.log(status);
            console.log(errorThrown);
          }
        });*/
      });
    
    // save to db
    // update it
    
  });
}


init();


//파일전송 후 실행할 콜백 함수
function ImguploadCallback(data,state){

  console.log('called ImguploadCallback()');
  console.log('data:', data);
  console.log('state:', state);

  if (state=="error"){
    alert("이미지 전송중 예외가 발생하였습니다.\n관리자에게 문의해주세요.");
    return false;
  }

  //uploadImg.jsp에서 리턴받을 데이터가 있을경우 파싱사용
  //json_sans_eval.js 파일 script에 포함하지 않으면 예외발생
  try{
    var result = jsonParse(data);
    console.log('result:', result);
  }catch(e){
    alert(data);
    alert("서버데이터 파싱 실패");
    return;
  }

}

//Catch the form submit and upload the files
function uploadFiles(event)
{
  alert('zzzzz');
 /* event.stopPropagation(); // Stop stuff happening
  event.preventDefault(); // Totally stop stuff happening

  // START A LOADING SPINNER HERE

  // Create a formdata object and add the files
  var data = new FormData();
  $.each(files, function(key, value)
  {
    data.append(key, value);
  });
  
  console.log(data);

  $.ajax({
    url: 'profilePhoto.ajax',
    type: 'POST',
    data: data,
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    cache: false,
    dataType: 'json',
    processData: false, // Don't process the files
    contentType: false, // Set content type to false as jQuery will tell the server its a query string request
    success: function(data, textStatus, jqXHR)
    {
      if(typeof data.error === 'undefined')
      {
        // Success so call function to process the form
        alert('greate!');
        //submitForm(event, data);
      }
      else
      {
        // Handle errors here
        console.log('ERRORS2: ' + data.error);
      }
    },
    error: function(jqXHR, textStatus, errorThrown)
    {
      // Handle errors here
      console.log('ERRORS1: ' + textStatus);
      // STOP LOADING SPINNER
    }
  });*/
}

