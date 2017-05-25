
'use strict';

define(function(require){
  var uModel = require('./userModel');
  var uView = require('./userView');
  var $ = require('jquery');

  var model = new uModel({id: });
  model.fetch();

  $(document).ready(function(){
    var user = new uView({
      el: $('.user').first(),
      model: model
    });
  });




});
