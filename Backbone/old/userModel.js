
'use strict';

define(function(require){
  var Backbone = require('Backbone');

  return Backbone.Model.extend({
    urlRoot: 'http://localhost:3000',
    url: function(){
      return this.urlRoot + '/' + this.id;
    }
  });


});
