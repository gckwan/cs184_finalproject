var pg = require('pg');
var conString = "postgres://postgres:pcchen@localhost:5432/cs184";
var client = new pg.Client(conString);
client.connect();


/////////////////////
// User 
/////////////////////
function add_user(username, email, response){
  client.query("INSERT INTO user_list(username, email) values($1,$2)",[username,email]);
  get_user_by_username(username);
}
exports.add_user = add_user;

function delete_user(user_id, response){
  client.query("DELETE FROM user_list WHERE user_id = $1",[user_id]);
  get_user_by_id(user_id);
}
exports.delete_user = delete_user;

function get_user_by_id(user_id, response){
  var query = client.query("SELECT * FROM user_list WHERE user_id= $1",[user_id]);
  json_all_rows(query, response);
}
exports.get_user_by_id = get_user_by_id;

function get_user_by_username(username, response){
  var query = client.query("SELECT * FROM user_list WHERE username = $1",[username]);
  json_all_rows(query, response);
}
exports.get_user_by_username = get_user_by_username

/////////////////////
// Language Proficiency
/////////////////////
function set_lang_prof(user_id, language_id, prof_level, response){
  client.query("UPDATE user_languages SET prof_level = $1 WHERE user_id = (SELECT user_id FROM user_list WHERE user_id = $2) AND language_id = $3", [prof_level, user_id, language_id]);
  get_user_prof(user_id, response);
}
exports.set_lang_prof = set_lang_prof;

function get_user_prof(user_id, response){
  var query = client.query("SELECT * FROM user_languages WHERE user_id = $1",[user_id]);
  json_all_rows(query, response);
}
exports.get_user_prof = get_user_prof;

/////////////////////
// Account Credits 
/////////////////////
function set_user_credits(user_id, gold_amount, silver_amount, response){
  client.query("UPDATE user_credits SET gold_credits = $1, silver_credits = $2 WHERE user_id = $3", [gold_amount, silver_amount, user_id]);
  get_user_credits(user_id, response);
}
exports.set_user_credits = set_user_credits

// Note: can be negative
function add_user_credits(user_id, gold_amount, silver_amount, response){
  var query = client.query("SELECT * FROM user_credits WHERE user_id = $1", [user_id]);
  query.on('row', function(row, result){
      gold = row.gold_credits;
      silver = row.silver_credits;
      set_user_credits(user_id, gold + gold_amount, silver + silver_amount, response);
  });
}
exports.add_user_credits = add_user_credits

function get_user_credits(user_id, response){
  var query = client.query("SELECT * FROM user_credits WHERE user_id = $1",[user_id]);
  json_all_rows(query, response);
}
exports.get_user_credits = get_user_credits;

/////////////////////
// Requests
/////////////////////
function get_user_requests_all(user_id, response){
  var query = client.query("SELECT * FROM requests WHERE requester = $1",[user_id]);
  json_all_rows(query, response);
}
exports.get_user_requests_all = get_user_requests_all;

function get_user_requests_current(user_id, response){
  var query = client.query("SELECT * FROM requests WHERE requester = $1 AND status_id = 1",[user_id]);
  json_all_rows(query, response);
}
exports.get_user_requests_current = get_user_requests_current;

function get_user_requests_completed(user_id, response){
  var query = client.query("SELECT * FROM requests WHERE requester = $1 AND status_id = 2",[user_id]);
  json_all_rows(query, response);
}
exports.get_user_requests_completed = get_user_requests_completed;

/////////////////////
// Responses 
/////////////////////
function get_request_responses(request_id, response){
  var query = client.query("SELECT * FROM req_responses WHERE request_id = $1",[request_id]);
  json_all_rows(query, response);
}
exports.get_request_responses = get_request_responses;

/////////////////////
/////////////////////
// Helper Methods & Exports
/////////////////////
/////////////////////

function json_all_rows(query, response){
  query.on('row', function(row, result){
    result.addRow(row);
  });
  query.on('end', function(result) {
    jsonString = JSON.stringify(result.rows, null, " ");
    console.log("DATABASE QUERY:")
    console.log(query.text);
    console.log("PARAMETERS: " + query.values);
    console.log(jsonString);
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Content-Length", jsonString.length);
    response.end(jsonString);
  });
}

