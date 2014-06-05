function bit() {}

bit.getContextRootPath = function() {
	var currPath = location.pathname;
	var end = currPath.indexOf('/', 1);
	return currPath.substring(0, end);
}

bit.contextRoot = bit.getContextRootPath();
bit.chatServerUrl = "192.168.200.10:9997";