'use strict'
//require('./app/index')
var db = require('./db/DylansDB')

//server set up --using express
const express = require('express')
const app = express()
const port = 3000

app.get('/Users', (request, response) => {



  db.sqlQuery("SELECT username FROM user", function(usernames){
    console.log("usernames ", usernames);
    response.statusCode = 200;
    response.send({
      success: true,
      rows: usernames.length,
      data : usernames
    });
  },
  function(err){
    response.statusCode = 200;
    response.send({
      success: false,
      rows: 0,
      data : null,
      message: ''
    });
    console.log(err);
  });



  console.log('data recieved');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Port ' + err);
  };
  console.log(`server is listening on ${port}`);
});





// db.sqlQuery(function(cn) {
//   cn.query("SELECT username FROM dylansdb.user", function(err, row) {
//       if(err){
//         console.log('Query ' + err);
//         return;
//       }
//     cn.release();
//   });
// });





//user
// const users = []
//
// app.post('/users', function (req, res) {
//     // retrieve user posted data from the body
//     const user = req.body
//     users.push({
//       name: user.name,
//       age: user.age
//     })
//     res.send('successfully registered')
// })
