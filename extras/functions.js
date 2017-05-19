
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

  if (!name || name.length > 45 || !pass || pass.length > 45 || !email || email.length > 45){
    return false;
  }
  return true;
}
