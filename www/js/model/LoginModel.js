'use strict';

define([
  'jquery',
  'backbone',
  'backbone-val'
],
function($, Backbone, Validator) {
  var login = Backbone.Model.extend({
      defaults: {
        username: '',
        password: ''
      },
      validation: {
        name: {
          required: true
        },
        'address.street': {
          required: true
        },
        'address.zip': {
          length: 4
        },
        age: {
          range: [1, 80]
        },
        email: {
          pattern: 'email'
        },
        someAttribute: function(value) {
          if(value !== 'somevalue') {
            return 'Error message';
          }
        }
      }
      initialize: function(options) {      },
      url: function(){
        return "http://localhost:3000/auth";
      },
      parse: function(response){
        return response;
      }
  });
  return login;
});
