'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'router'
],
 function($, _, Backbone,Router) {

  // namespace
  var App = {
    Init: {},
    Views: {},
    Models: {},
    Collections: {},
    Storage: {},
    Router: {}
  };

  App.Init = function(){
    Router.Init();
  }

  return App;
});
