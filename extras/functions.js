'use strict'
var crypto = require('crypto');

exports.hash = function (input){
  return hash = crypto.createHmac('sha256', 'not a salt')
                   .update(input)
                   .digest('hex');
}


exports.isId = function (input){
  var id = parseInt(input);
  if (isNaN(id)){
    return false;
  }else{
    return id;
  }
}

exports.isUser = function (input){
  var name = input.username;
  var pass = input.password;
  var email = input.email;

  if (!name || name.length > 45 || !pass || pass.length > 64 || !email || email.length > 45){
    return false;
  }
  return true;
}


exports.sendToFront = function (code, data, res){
  res.statusCode = code;
  switch(code){
    case 200:
      if (data == 0 || data.length < 1){
        res.send({
          success: false,
          rows: 0,
          data : null,
          message: 'Request could not find match'
        });
      }else{
        res.send({
          success: true,
          rows: (data.length || data),
          data : data,
          message: 'Request was a success'
        });
      }
      break;
    case 500:
      res.send({
        success: false,
        rows: 0,
        data : null,
        message: 'An error occured making your request'
      });
    case 501:
      res.send({
        success: false,
        rows: 0,
        data : null,
        message: 'Incorrect data was sent in'
      });
  }
}