'use strict'
var db = require('./db/DylansDB');
var func = require('./extras/functions');

module.exports = function (app){
  app.post('/auth', function (request, response) {
    var input = request.body;
    if (!func.isLogin(input)){
      console.log("bad data");
      func.sendToFront(501, null, response);
    }else{
      input.password = func.hash(input.password);
      var query = "UPDATE user SET lastLogin = DEFAULT WHERE username='"+input.username+"' AND password='"+input.password+"'";
      db.sqlQuery(query, function(result){
        func.sendToFront(200, result.affectedRows, response);
        },
        function(err){
          console.log(err);
          func.sendToFront(500, null, response);
        });
      }
    });
}
