var jwt = require('jsonwebtoken');


exports.genToken = function(username){
  var claims = {
    sub: username,
    iss: 'https://DylansUsers.com',
    permissions: 'basic-auth'
  }
  console.log("token claim: ",claims);
  var myToken = jwt.sign(claims, 'myfirsttoken', {
    expiresIn: '100m'
  });
  return myToken;
}

exports.varToken = function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
   jwt.verify(token, 'myfirsttoken', function(err, decoded) {
     if (err) {
       return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
     } else {
       req.decoded = decoded;
       next();
     }
   });
 } else {
    // if there is no token
    return res.status(403).json({
        success: false,
        message: 'No token provided.'
    });
  };
};
