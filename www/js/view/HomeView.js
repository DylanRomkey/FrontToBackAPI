
define([
  'underscore',
  'jquery',
  'backbone',
  'text!/templates/tplHome.html'
],
function(_,$,Backbone,template) {
  var HomeView = Backbone.View.extend({
    //el: '#container',
    template: _.template(template),
    initialize: function(options){},
    render: function(){
      this.$el.html(this.template);
      return this;
    }
  });
  return HomeView;
});
