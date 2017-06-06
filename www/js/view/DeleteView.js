
define([
  'underscore',
  'jquery',
  'backbone',
  'app',
  'tool/token',
  'tool/msg',
  'view/UserView',
  'text!/templates/tplUserDelete.html',
  'text!/templates/tplUserInfo.html'
],
function(_,$,Backbone,app,token,msg,User,template,dataTemp) {

  var DeleteView = Backbone.View.extend({
    //el: '#container',
    template: _.template( template),
    dataTemplate:_.template( dataTemp),
    initialize: function(options){},
    render: function(options){
      this.$el.html(this.template);
      this.getUser(options);
      return this;
    },
    getUser: function(id){
      var currModel = app.Collections.users.get(id);
      if (currModel.attributes.firstname){
          this.renderUser(currModel);
      }else{
        this.$el.find('#delUser').html('<h3>Could not find a user with that id</h3>');
      }
    },
    renderUser: function(currModel){
      this.userView = new User({model: currModel});
      this.$el.find('#delUser').html(userview.render().el);
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
