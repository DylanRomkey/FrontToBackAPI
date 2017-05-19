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

    exports.sqlQueryParms = function (myQuery, values, success_callback, error_callback){
      pool.query(myQuery, values, function(err, rows) {
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





        // exports.myAdapter = function (res, callback){
        //   pool.getConnection(function(err, conn) {
        //      if(err){
        //        console.log('Conn ' + err);
        //        res.statusCode = 500;
        //        res.send({
        //          success: false,
        //          rows: 0,
        //          data : null,
        //          message: 'An error occured making the connection'
        //        });
        //        return;
        //      };
        //      console.log('Connection established');
        //      callback(conn);
        //      return;
        //    });
        //  };
