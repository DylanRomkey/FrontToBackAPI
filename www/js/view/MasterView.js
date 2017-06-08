
define([
  'underscore',
  'jquery',
  'backbone',
  'bootstrap',
  'text!/templates/tplMaster.html',
  'text!/templates/tplHome.html',
  'text!/templates/tplNavBarTop.html',
  'text!/templates/tplFooter.html',
  'view/UsersView'
],
function(_,$,Backbone,bootstrap,tempMaster,tempHome,tempTopNav,tempFooter, UsersView) {
  var MasterView = Backbone.View.extend({
    templateMaster: _.template(tempMaster),
    templateHome: _.template(tempHome),
    templateTopNav: _.template(tempTopNav),
    templateFooter: _.template(tempFooter),
    // templateContent: _.template(),
    initialize: function(options){},
    render: function(){
      this.$el.html(this.templateMaster);
      this.$el.find("#top").html(this.templateTopNav);
      this.$el.find("#footer").html(this.templateFooter);
      this.contentView = new UsersView();
      this.$el.find("#left").html(this.contentView.render().$el);
      this.renderHome();
      return this;
    },
    renderHome: function(){
      this.$el.find("#contents").html(this.templateHome);
    }
    // renderContent: function(view, id){
    //   if (id){
    //       this.$el.find("#contents").html(view.render(id).el);
    //   }else{
    //     this.$el.find("#contents").html(view.render().el);
    //   }
    // }
  });
  return MasterView;
});
