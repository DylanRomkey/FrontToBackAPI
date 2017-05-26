'use strict'
var db = require('../db/DylansDB');
var func = require('../extras/functions');
var mw = require('../extras/middleware');


module.exports = function (app){
  app.post('/v1/auth', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin','*');
    var input = request.body;
    if (!func.isLogin(input)){
      console.log("bad data");
      func.sendToFront(501, null, response);
    }else{
      input.password = func.hash(input.password);
      var query = "SELECT password FROM user WHERE username='"+input.username+"'";
      db.sqlQuery(query, function(result){
        console.log(result, input.password);
        if (result.length > 0 && result[0].password == input.password){
          var myToken = mw.genToken(input.username);
          response.statusCode = 200;
          response.json({
            success: true,
            message: 'Authorized',
            token: myToken
          });
        }else{
          response.statusCode = 200;
          response.json({
            success: false,
            message: 'Unauthorized',
            token: null
          });
        }
      },
      function(err){
        console.log(err);
        func.sendToFront(500, null, response);
      });
    }
  });
}
