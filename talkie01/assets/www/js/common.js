function init_common(){
  console.log("called init_common()!");
function bit() {}

bit.getContextRootPath = function() {
	var currPath = location.pathname;
	var end = currPath.indexOf('/', 1);
	return currPath.substring(0, end);
}

bit.getCookie = function(name) {
  var cookies = document.cookie.split(';');
  for (var i in cookies) {
    if (cookies[i].search(name) != -1) {
      return cookies[i]
              .replace(name + '=', '')
              .replace(/^\s\s*/,'')
              .replace(/\s\s*$/,'');
    }
  }
}
bit.contextRoot = bit.getContextRootPath();
bit.userNo = bit.getCookie('userNo');
bit.userEmail = bit.getCookie('loginEmail');
//console.log("bit!!!!!!:"+bit.userEmail);
bit.serverUrl = 'http://14.32.7.49:9989/talkie';
bit.chatServerUrl = "http://14.32.7.49:9988";
console.log("bit.serverUrl in common.js:" + bit.serverUrl);

bit.checkedUsers = {};  // 채팅하기 위해 선택된 사용자 번호 저장 배열.
bit.checkedUsers[Number(bit.userNo)] = Number(bit.userNo);
}
