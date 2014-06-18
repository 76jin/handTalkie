$(function () {
  $('#profile_img').on('click', function() {
    $('#fileupload').click();
  });

  $('#fileupload').fileupload({
    url: 'profilePhoto.ajax',
    dataType: 'json',
    add: function (e, data) {
      console.log('add img');

      var uploadFile = data.files[0];
      if (!(/png|jpe?g|gif/i).test(uploadFile.name)) {
        alert('png, jpg, gif 만 가능합니다');
      } else if (uploadFile.size > 5000000) { // 5mb
        alert('파일 용량은 5메가를 초과할 수 없습니다.');
      }

      data.context = $('<p/>').text('Uploading...').appendTo(document.body);
      data.submit();

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

      var curUrl = location.protocol + "//" + window.location.host;
      console.log('window.location.host:', window.location.host);
      console.log('curUrl:', curUrl);

      console.log('done img', result.data, result.status, result.data);

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
});

