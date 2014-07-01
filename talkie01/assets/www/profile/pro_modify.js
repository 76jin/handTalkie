$(function () {
  $('#profile_img').on('click', function() {
	  getImage();
  });

  // Wait for PhoneGap to load
  document.addEventListener("deviceready", onDeviceReady, false);

  // PhoneGap is ready
  function onDeviceReady() {
    console.log('###$$$$#### fired deviceready event!');
  }

  function getImage() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(
      onCameraSuccess,
      onCameraError,
      {
        quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URL,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      }
    );

  }

  
  function onCameraSuccess(imageData) {
    console.log('call success!!!!!!!!!!!!!!!!! serverUrl:' + serverUrl);
    
    $('#progress').html("");
    
    window.resolveLocalFileSystemURI(imageData, function(entry){
      
      var options = new FileUploadOptions();
      options.fileKey="photoData";
      //options.fileName=imageData.substr(imageData.lastIndexOf('/')+1);
      options.fileName=entry.name;
      options.mimeType="image/jpeg";
      //console.log('fileName:' + options.fileName);

      options.chunkedMode = false;

      
      // file upload and progress
      var ft = new FileTransfer();
      ft.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
          var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
          $('#progress').html(perc + "% loaded...");
        } else {
          if($('#progress').html() == "") {
            $('#progress').html("Loading");
          } else {
            $('#progress').html(".");
          }
        }
      };
      
      var tempUrl = serverUrl + '/profilePhoto.ajax';
      ft.upload(imageData,  encodeURI(tempUrl), win, fail, options);

    }, function(e){
      console.log('Error:' + e);
    }); 
    
  }
  
  function onCameraError(message) {
    alert('Failed get picture, error message : ' + message);
  }

  function win(r) {
      console.log("r ############ = " + r);
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
      alert(r.response);
  }

  function fail(error) { // 파일 업로드 후 404에러 발생(jsp 못찾아 에러남)
    console.log("An error has occurred: Code = " + error.code);

    // 임시로 여기에서 정상 동작하도록 지시함.
    if (error.code == 1) {
      //파일전송 후 실행할 콜백 함수
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
            console.log('profileInfo success!');
            //console.log(result.data);
            
            var obj = JSON.parse(result.data);
            //console.log('obj.phoPath:' + obj.phoPath);
            if (obj.phoPath) {
              $('#profile_img').attr("src", serverUrl + "/" + obj.phoPath);
            } else {
              $('#profile_img').attr("src", "../img/profile/no-profile-image.jpg");
            }
            
            $('#progress').html('100% complete!');
            
          }
        },
        error: function(xhr, status, errorThrown){
          alert('프로필 정보 읽기 중 오류 발생!');
          console.log(status);
          console.log(errorThrown);
        }
      });
      
    } else {
      alert('Profile photo upload failed!!!');
    }
  }
  
  
  function showObj(obj) {
    var str = "";
    for(key in obj) {
      str += key+"="+obj[key]+"\n";
    }
    console.log(str);
    return;
  }
//  $('#fileupload').fileupload({
  /* ### 웹브라우저에서만 동작, 폰에서는 동작 안함.
//    url: 'profilePhoto.ajax',
  $('#fileupload').fileupload({
    url: 'http://14.32.7.49:9977/talkie/profilePhoto.ajax',
    dataType: 'json',
    add: function (e, data) {
      console.log('add img');
      //showObj(data)
      //console.log('data:' + data);
      console.log('data.name:' + data.name);
//    dataType: 'json',
//    add: function (e, data) {
      var uploadFile000 =  $( '#fileupload' )[0];
      console.log('uploadFile000 &&&&:' + uploadFile000);
      
      
      /////
      var formdata = new FormData();
      formdata.append("nickname", "Foooobar"); 
//      console.log('add img');
      formdata.append("website", "http://hacks.mozilla.org");
      formdata.append("media", uploadFile000);
      var xhr = new XMLHttpRequest();
//
      xhr.open("POST", "http://14.32.7.49:9978/upload");  
      xhr.send(formdata);
      /////
      return;
      
      var uploadFile =  $( '#fileupload' )[0].files[0];
      console.log('uploadFile:' + uploadFile);
      console.log('uploadFile.name:' + uploadFile.name);
      console.log('uploadFile.size:' + uploadFile.size);
      if (!(/png|jpe?g|gif/i).test(uploadFile.name)) {
        alert('png, jpg, gif 만 가능합니다');
      } else if (uploadFile.size > 5000000) { // 5mb
        alert('파일 용량은 5메가를 초과할 수 없습니다.');
      }
//      var uploadFile = data.files[0];
      data.context = $('<p/>').text('Uploading...').appendTo(document.body);
      data.submit();
//      if (!(/png|jpe?g|gif/i).test(uploadFile.name)) {
    },
    progressall: function (e, data) {
      console.log('progressall img');
      var progress = parseInt(data.loaded / data.total * 100, 10);
      $('#progress .bar').css(
          'width',
          progress + '%'
      );
    },
    done: function (e, data) {
      var result = data.result.ajaxResult;
      //파일전송 후 실행할 콜백 함수
      var currPath = location.pathname;
      var end = currPath.indexOf('/', 1);
      var rootPath =  currPath.substring(0, end);
      console.log('rPath:', rootPath); // /talkie
//        alert('png, jpg, gif 만 가능합니다');
      var curUrl = location.protocol + "//" + window.location.host;
      console.log('window.location.host:', window.location.host);
      console.log('curUrl:', curUrl);
//      } else if (uploadFile.size > 5000000) { // 5mb
      console.log('done img', result.data, result.status, result.data);
//        alert('파일 용량은 5메가를 초과할 수 없습니다.');
//      }
//
//      data.context = $('<p/>').text('Uploading...').appendTo(document.body);
//      data.submit();
//
//    },
//    progressall: function (e, data) {
//      console.log('progressall img');
//      var progress = parseInt(data.loaded / data.total * 100, 10);
//      $('#progress .bar').css(
//          'width',
//          progress + '%'
//      );
//    },
//    done: function (e, data) {
//      var result = data.result.ajaxResult;
//      //파일전송 후 실행할 콜백 함수
//      var currPath = location.pathname;
//      var end = currPath.indexOf('/', 1);
//      var rootPath =  currPath.substring(0, end);
//      console.log('rPath:', rootPath); // /talkie
//
//      var curUrl = location.protocol + "//" + window.location.host;
//      console.log('window.location.host:', window.location.host);
//      console.log('curUrl:', curUrl);
//
//      console.log('done img', result.data, result.status, result.data);
//
//      if (result.status != "ok" || result.data == "failure") {
//        alert('프로필 사진 업로드 실패했습니다.');
//      } else { // success
//        console.log('result.phoPath:',result.data);
//        console.log('bit.serverUrl:',bit.serverUrl);
//        $('#profile_img').attr("src", result.data);
//      }
//      data.context.text('Upload finished.');
//    },
//    fail: function(){
//      alert("서버와 통신 중 문제가 발생했습니다");
//    }
//  });
      if (result.status != "ok" || result.data == "failure") {
        alert('프로필 사진 업로드 실패했습니다.');
      } else { // success
        console.log('result.phoPath:',result.data);
        console.log('bit.serverUrl:',bit.serverUrl);
        $('#profile_img').attr("src", result.data);
      }
      data.context.text('Upload finished.');
    },
    fail: function(){
      alert("서버와 통신 중 문제가 발생했습니다");
    }
  });
   */
  
});

