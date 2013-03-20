var express = require('express');
var database = require('./database');
var url = require('url');
var app = express();

//database.set_lang_prof('EpicPhilure','1','4')
app.set('title', 'My Site');
app.get('title');

/////////////////////
// User 
/////////////////////
app.get("/get_user_by_id", function(request, response){
  var queryData = url.parse(request.url, true).query;   
  database.get_user_by_id(queryData.userid, response);
});

app.get("/get_user_by_username", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.get_user_by_username(queryData.username, response);
});

//TODO: Change to post request
app.get("/add_user", function(request, response){
  var queryData = url.parse(request.url, true).query;   
  database.add_username(queryData.username, queryData.email, response);
});

//TODO: Change to post request
app.get("/delete_user", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.delete_user(queryData.userid, response);
});

/////////////////////
// Language Proficiency
/////////////////////
app.get("/get_user_prof", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.get_user_prof(queryData.userid, response);
});

//TODO: Change to post request
app.get("/set_lang_prof", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.set_lang_prof(queryData.userid, queryData.langid, querydata.prof, response);
});


/////////////////////
// Account Credits
/////////////////////
//TODO: POST
app.get("/set_user_credits", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.set_user_credits(queryData.userid, queryData.gold, queryData.silver, response);
});

//TODO: POST
app.get("/add_user_credits", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.add_user_credits(queryData.userid, queryData.gold, queryData.silver, response);
});

app.get("/get_user_credits", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.get_user_credits(queryData.userid, response);
});


/////////////////////
// Requests
/////////////////////
/////////
// POST
/////////
app.get("/add_request", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.add_request(queryData.userid, queryData.fromlang, queryData.fromtext, queryData.tolang, response);
});

app.get("/delete_request", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.delete_request(queryData.requestid, response);
});

app.get("/complete_request", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.complete_request(queryData.requestid, response);
});

/////////
// GET
/////////
app.get("/get_request", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.get_request(queryData.requestid, response);
});

app.get("/get_requests_all", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.get_requests_all(queryData.userid, response);
});

app.get("/get_requests_current", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.get_requests_current(queryData.userid, response);
});

app.get("/get_requests_completed", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.get_requests_completed(queryData.userid, response);
});

/////////////////////
// Requests
/////////////////////

/////////
// POST
/////////
app.get("/add_response", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.add_response(queryData.requestid, queryData.responder, queryData.response, response);
});

app.get("/edit_response", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.edit_response(queryData.responseid, queryData.response, response);
});

/////////
// GET
/////////
app.get("/get_response", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.get_response(queryData.responseid, response);
});

app.get("/get_responses", function(request, response){
  var queryData = url.parse(request.url, true).query;
  database.get_responses(queryData.requestid, response);
});

var port = 8888;
app.listen(port)//, "greed.stanford.edu");
console.log("Listening on port " + port);
