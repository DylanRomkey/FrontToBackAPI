'use strict'
var crypto = require('crypto');
//var formator = require('dateformat');



exports.hash = function (input){
  return crypto.createHmac('sha256', 'not a salt')
                   .update(input)
                   .digest('hex');
};

// exports.getCurrentDBDate = function(){
//   const now = new Date();
//   return formator(now, 'isoDateTime');
//   //yyyy-MM-dd hh:mm:ss
// }


// validate
exports.isId = function (input){
  var id = parseInt(input);
  if (isNaN(id)){
    return false;
  }else{
    return id;
  }
}

exports.isUser = function (input){
  var fname = input.firstname;
  var lname = input.lastname;
  var uname = input.username;
  var email = input.email;

  if (!fname || fname.length > 45 || !lname || lname.length > 45 ||
    !uname || uname.length > 45 ||  !email || email.length > 45){
    return false;
  }
  return true;
}


exports.isLogin = function (input){
  var name = input.username;
  var pass = input.password;

  if (!name || name.length > 45 || !pass || pass.length > 64){
    return false;
  }
  return true;
}


//response
exports.sendToFront = function (code, data, res){
  res.statusCode = code;
  switch(code){
    case 200:
      if (data == 0 || data.length < 1){
        res.json({
          success: false,
          rows: 0,
          data : null,
          message: 'Request could not find match'
        });
      }else{
        res.json({
          success: true,
          data : data,
          message: 'Request was a success'
        });
      }
      break;
    case 500:
      res.json({
        success: false,
        rows: 0,
        data : null,
        message: 'An error occured making your request'
      });
    case 501:
      res.json({
        success: false,
        rows: 0,
        data : null,
        message: 'Incorrect data was sent in'
      });
  }
}
