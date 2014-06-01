var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response, postData) {
  console.log("Request handler 'start' was called.");
  
  var body = 
    '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html;' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    /*
    '<form action="/upload" method="post">' +
    '<textarea name="text" rows="20" cols="60"></textarea>' +
    */
    '<form action="/upload" enctype="multipart/form-data"' +
    ' method="post">' +
    '<input type="file" name="upload">' +
    '<input type="submit" value="Upload text" />' +
    '</form>' +
    '</body>' +
    '</html>';
  
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write(body);
    response.end();
}

function sendMessage(response, postData) {
  console.log("Request handler 'sendMessage' was called.");
  response.writeHead(200, {"Content-Type" : "text/plain"});
  response.write("You've sent: " + 
      querystring.parse(postData).text);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    console.log("files.upload: " , files.upload);
    fs.renameSync(files.upload.path, "./public/images/test.jpeg");
    
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write("received mage: <br> ");
    response.write("<img src='/show' />");
    response.end();
  });
  
  
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./public/images/test.jpeg", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type" : "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type" : "image/jpeg"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.sendMessage = sendMessage;
exports.upload = upload;
exports.show = show;




