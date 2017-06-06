'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'js/app',
  'js/router',
  'tool/token',
  'tool/msg',
  'collection/UserCollection'
],
 function($, _, Backbone,App,Router, token,msg,Users) {

    //send request with token
  $(document).ajaxSend(function(event, req) {
    // console.log('in ajax send');
     var tokens = token.getToken();
     if (tokens) {
        req.setRequestHeader("x-access-token", tokens);
     }
  });

  //handle unotherized
  $(document).ajaxError(function(event, xhr) {
     console.log('in ajax error');
     if (xhr.status == 403) {
        App = null;
        msg.setMsg(1);
        window.location = 'login.html';
        return;
     }
  });

    App.Collections.users = new Users();
    App.Collections.users.fetch({
      success: function(){
        App.Collections.users.sort();
        console.log('collection has', App.Collections.users.length);

        //tie router to page
        var router = new Router();
        Backbone.history.start();

      }
    });

});
