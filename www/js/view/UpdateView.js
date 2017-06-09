
define([
  'jquery',
  'underscore',
  'backbone',
  'js/app',
  'view/UserCardView',
  'text!/templates/tplUserInsert.html'
],
 function($, _, Backbone,app,User,template) {


  var UpdateView = Backbone.View.extend({
    initialize: function(options){ },
    render: function(id){
      if (id != undefined){
        this.getUser(id);
        return this;
      }else{
        this.$el.html('<h3>Something went wrong, try again</h3>');
      }
    },
    getUser: function(id){
      var currModel = app.Collections.users.get(id);
      if (currModel.attributes.firstname){
          this.renderUser(currModel);
      }else{
        this.$el.html('<h3>Could not find a user with that id</h3>');
      }
    },
    renderUser: function(currModel){
      this.userView = new User({model: currModel});
      this.$el.html(this.userView.renderForUpdates().el);
    },
    update: function(){
      this.userView.model.save();
      window.location = '/index.html#users';
    },
    changed: function(e){
      var changed = e.currentTarget.className;
      var value = $(e.currentTarget).val();
      var obj = {};
      obj[changed] = value;
      this.userView.model.set(obj);
    },
    events: {
      'click #button-insertUser':'update',
      'change input':'changed'
    }
  });

  return UpdateView;
});
