


//send request with token
$(document).ajaxSend(function(event, request) {
   var token = app.Storage.getToken();
   if (token) {
      request.setRequestHeader("x-access-token", token);
   }
});

//handle unotherized
$(document).ajaxError(function(event, xhr) {
   if (xhr.status == 403) {
      app = null;
      window.sessionStorage.clear();
      window.location = 'login.html#message';
      return;
   }
});



$(document).ready(function(){

    //tie router to page
    app.Router.Instance = new app.Router();
    Backbone.history.start();


    KillSession = function (){
      var storage = window.sessionStorage;
      storage.clear();
    }
});
