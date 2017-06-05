'use strict';


define([],
 function() {

  var Storage = {};
  
  // login message
  Storage.setMsg = function(msg){
    var storage = window.sessionStorage;
    if (typeof(window.Storage) !== "undefined") {
      storage.msg = msg
      return true;
    } else {
      return false;
    }
  }
  Storage.getMsg = function(){
    var storage = window.sessionStorage;
    if (storage.msg) {
      return storage.msg
    } else {
      return false;
    }
  }




  return Storage;
});
