'use strict';


define([],
 function() {

  var Storage = {};

  //token
  Storage.setToken = function(token){
    var storage = window.sessionStorage;
    if (typeof(window.Storage) !== "undefined") {
      storage.token = token
      return true;
    } else {
      return false;
    }
  }
  Storage.getToken = function(){
    var storage = window.sessionStorage;
    if (storage.token) {
      return storage.token
    } else {
      return false;
    }
  }



  return Storage;
});
