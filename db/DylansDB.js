'use strict'
var mysql = require('mysql');
var pool = mysql.createPool({
        host:'localhost',
        port:3306,
        user: 'root',
        password: '',
        database : 'dylansdb'
    });


      exports.sqlQuery = function (myQuery, success_callback, error_callback){
        pool.query(myQuery, function(err, rows) {
           if(err){
             error_callback('SQLCALLBACK ' + err);
             //console.log('SQL ' + err);
             return;
           };
           console.log('Connection established');
           success_callback(rows);
           return;
         });
       };


      // conn.query("SELECT username FROM dylansdb.user", function(err, row) {
      //     if(err){
      //       console.log('Query ' + err);
      //       return;
      //     }
      //
      //     console.log('Data received from Db:\n');
      //     console.log(row);
      // });
