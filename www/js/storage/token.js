'use strict';



// token storage
app.Storage.setToken = function(token){
  var storage = window.sessionStorage;
  if (typeof(window.Storage) !== "undefined") {
    storage.token = token
    return true;
  } else {
    return false;
  }
}
app.Storage.getToken = function(){
  var storage = window.sessionStorage;
  if (storage.token) {
    return storage.token
  } else {
    return false;
  }
}
app.Storage.KillSession = function (){
  var storage = window.sessionStorage;
  storage.clear();
}
