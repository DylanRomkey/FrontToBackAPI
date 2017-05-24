'use strict'
var db = require('../db/DylansDB');
var func = require('../extras/functions');
var mw = require('../extras/middleware');

module.exports = function (app){

  //get all usernames
  app.get('/users', function(request, response) {
    db.sqlQuery("SELECT username FROM user", function(usernames){
      func.sendToFront(200, usernames, response);
    },
    function(err){
      console.log(err);
      func.sendToFront(500, null, response);
    });
  });




  //get user by id
  app.get('/user/:id', function (request, response) {
    var id = func.isId(request.params.id);
    if (!id){
      console.log("bad data");
      func.sendToFront(501, null, response);
    }else{
      var q = "SELECT username, email FROM user WHERE id=?"
      var myQuery = q.replace("?", id)
      db.sqlQuery(myQuery, function(user){
        func.sendToFront(200, user, response);
        },
        function(err){
          console.log(err);
          func.sendToFront(500, null, response);
        });
    };
  });






  //update user
  app.post('/user/:id', mw.varToken, function (request, response) {
    var id = func.isId(request.params.id);
    var input = request.body;
    if (!id || !func.isUser(input)){
      console.log("bad data");
      func.sendToFront(501, null, response);
    }else{
      input.password = func.hash(input.password);
      db.sqlQueryParms("UPDATE user SET ? WHERE id=" + id, input, function(result){
        func.sendToFront(200, result.affectedRows, response);
        },
        function(err){
          console.log(err);
          func.sendToFront(500, null, response);
        });
      }
    });





  //insert user
  app.put('/user', mw.varToken, function (request, response) {
  var input = request.body;
  if (!func.isUser(input)){
    console.log("bad data");
    func.sendToFront(501, null, response);
  }else{
    input.password = func.hash(input.password);
    db.sqlQueryParms("INSERT user SET ?", input, function(result){
      func.sendToFront(200, result.affectedRows, response);
      },
        function(err){
          console.log(err);
          func.sendToFront(501, null, response);
        });
      }
    });




    //delete user
  app.delete('/user/:id', mw.varToken, function (request, response) {
    var id = func.isId(request.params.id);
    if (!id){
        console.log("bad data");
        func.sendToFront(501, null, response);
      }else{
        var q = "DELETE FROM user WHERE id=?"
        var myQuery = q.replace("?", id)
        db.sqlQuery(myQuery, function(user){
            func.sendToFront(200, user.affectedRows, response);
          },
            function(err){
              console.log(err);
              func.sendToFront(500, null, response);
            });
          }
        });
};
