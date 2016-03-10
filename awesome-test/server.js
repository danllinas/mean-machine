/*Pure Node Method
//get the http and filesystem modules
var http = require('http'),
    fs = require('fs');

//create our server using the http module
http.createServer(function(req, res){

  //write to our server. set config for the response
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : '*'
  });

  //grab index.thml using fs
  var readStream = fs.createReadStream(__dirname + '/index.html');

  //send index.html to our user
  readStream.pipe(res)

}).listen(1337);

//tell ourselves what's happening
console.log("Visit me at http://localhost:1337");
*/

//Express Method

//load the express package and create the app
var express = require('express'),
    app = express(),
    path = require('path');

//send our index.html file to the user for the home page
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

//start the server
app.listen(1337);
console.log('1337 is the magic port!');
