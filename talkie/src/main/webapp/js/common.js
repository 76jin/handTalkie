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
bit.chatServerUrl = "http://192.168.200.10:9998";
bit.userNo = bit.getCookie('userNo');
bit.userEmail = bit.getCookie('loginEmail');
bit.serverUrl = "http://java48.com:9999/talkie/";