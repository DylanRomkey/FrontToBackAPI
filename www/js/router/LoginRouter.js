

//router
app.Router = Backbone.Router.extend({
  routes:{
    '': 'login',
    'm/:m': 'wMessage'

  },
  login: function(){
    var view = new app.Views.Auth();
    $('#container').html(view.el);
  },
  wMessage: function(m){
    var view = new app.Views.Auth();
    if (app){
      app.Storage.KillSession();
    }
    $('#container').html(view.el);
    if (m == 1){
        $('#errorMsg').html("<h3>Something went wrong, please login again</h3>");
    }else if (m == 2){
      $('#errorMsg').html("<h3>You have been logged out</h3>");
    }

  }
});





$(document).ready(function(){
  app.Router.Instance = new app.Router();
  Backbone.history.start();
});
