
define([
  'underscore',
  'jquery',
  'backbone',
  'bootstrap',
  'text!/templates/tplMaster.html',
  'view/NavTopView',
  'view/NavLeftView',
  'view/FooterView'
],
function(_,$,Backbone,bootstrap,template, NavTopView, NavLeftView, footerView) {
  var MasterView = Backbone.View.extend({
    template: _.template(template),
    viewNavTop: new NavTopView(),
    viewNavLeft: new NavLeftView(),
    viewFooter: new footerView(),
    initialize: function(options){},
    render: function(){
      this.$el.html(this.template);
      this.$el.find("#topNav").html(this.viewNavTop.render().el);
      this.$el.find("#leftNav").html(this.viewNavLeft.render().el);
      this.$el.find("#footer").html(this.viewFooter.render().el);
      return this;
    },
    renderContent: function(view, id){
      if (id){
          this.$el.find("#pageContent").html(view.render(id).el);
      }else{
        this.$el.find("#pageContent").html(view.render().el);
      }
    }
  });
  return MasterView;
});
