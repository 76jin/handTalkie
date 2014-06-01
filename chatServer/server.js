var formidable = require("formidable");
var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    if (pathname == "/upload") {
      // 파일 업로드 처리
      console.log('#### pathname: upload');
      route(handle, pathname, response, request);
    } else {
       // 채팅 기능 처리 
      request.setEncoding("utf8");

      request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunck '" + 
            postDataChunk + "'.");
      });

      request.addListener("end", function() {
        route(handle, pathname, response, postData);
      });
    }
    
  }
  
  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
}

exports.start = start;