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
bit.chatServerUrl = "http://14.32.7.49:9988";
bit.userNo = bit.getCookie('userNo');
bit.userEmail = bit.getCookie('loginEmail');
console.log("bit!!!!!!"+bit.userEmail);
bit.serverUrl = 'http://14.32.7.49:9989/talkie';

