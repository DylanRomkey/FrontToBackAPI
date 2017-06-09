
define([
  'underscore',
  'jquery',
  'backbone',
  'js/app',
  'view/UserCardView',
  'text!/templates/tplUserDelete.html'
],
function(_,$,Backbone,app,User,template) {

  var DeleteView = Backbone.View.extend({
    //el: '#container',
    template: _.template( template),
    initialize: function(options){},
    render: function(options){
      this.$el.html(this.template);
      this.getUser(options);
      return this;
    },
    getUser: function(id){
      this.model = app.Collections.users.get(id);
      if (this.model.attributes.firstname){
          this.renderUser();
      }else{
        this.$el.find('#delUser').html('<h3>Could not find a user with that id</h3>');
      }
    },
    renderUser: function(){
      this.userView = new User({model: this.model});
      this.$el.find('#delUser').html(this.userView.render().el);
    },
    deleteUser: function(){
      this.model.destroy();
      window.location = '/index.html#users/1';
    },
    events: {
      'click #button-deleteUser':'deleteUser'
    }
  });
  return DeleteView;
});
