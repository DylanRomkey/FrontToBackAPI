
define([
  'underscore',
  'jquery',
  'backbone',
  'bootstrap',
  'text!/templates/tplNavBarTop.html'
],
function(_,$,Backbone,bootstrap,template) {
  var View = Backbone.View.extend({
    template: _.template(template),
    initialize: function(options){},
    render: function(){
      this.$el.html(this.template);
      return this;
    }
  });
  return View;
});
