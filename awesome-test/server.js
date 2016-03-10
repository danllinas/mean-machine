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

//create routes for the admin section

//get an instance of the router
var adminRouter = express.Router();

//route middleware that will happen on every request
adminRouter.use(function(req, res, next) {

  //log each request tot he console
  console.log(req.method, req.url);

  //continue doing what we were doing and go to the route
  next();
});

adminRouter.param('name', function(req, res, next, name) {
  //do validation on name here
  //blah blah validation
  //log something so we know it's working
  console.log('doing name validations on ' + name);

  //once validation is done save the new item in the req
  req.name = name;
  //go to the next thing
  next();
});

adminRouter.get('/hello/:name', function(req, res) {
  res.send('hello ' + req.name + '!');
});

//admin main page. The dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, res){
  res.send("I am the dashboard!");
});

//users page (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res) {
  res.send('I show all the users!');
});

//posts page(http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res) {
  res.send('I show all the posts!');
});

//route with parameters (:1337/admin/users/:name)
adminRouter.get('/users/:name', function(req, res) {
  res.send('hello ' + req.params.name + '!');
});

//apply the routes to our application

app.use('/admin', adminRouter);

app.route('/login')
  //show the form (get :1337/login)
  .get(function(req, res) {
    res.send('this is the login form');
  })

  //process the form (POST :1337/login)
  .post(function(req, res) {
    console.log('processing');
    res.send('processing the login form');
});

//start the server
app.listen(1337);
console.log('1337 is the magic port!');
