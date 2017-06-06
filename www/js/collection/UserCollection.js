'use strict';

define([
  'jquery',
  'backbone',
  'model/UserModel'
],
function($, Backbone,User) {

  var Users = Backbone.Collection.extend({
    model: User,
    url: function(){
      return "http://localhost:3000/user";
    },
    comparator: 'username',
    parse: function(response){
      return response.success ? response.data : null;
    }
  });
  return Users;
});
