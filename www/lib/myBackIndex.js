'use strict';








app.Views.Home = Backbone.View.extend({
  //el: '#container',
  initialize: function(options){
    this.render();
  },
  render: function(){
    this.$el.html("<h1>Welcome to Dylans's Users!</h1>");
    return this;
  }
});



app.Views.Search = Backbone.View.extend({
  //el: '#container',
  template: _.template( $('#searchById').html()),
  dataTemplate:_.template( $('#tempUser').html()),
  initialize: function(options){
    this.render();
  },
  render: function(){
    this.$el.html(this.template);
    return this;
  },
  getUser: function(){
    var id = this.$el.find('input').val();
    var user = new app.Models.User({id: id});
    user.fetch({success: this.renderUser.bind(this)});
  },
  renderUser: function(user) {
    // console.log('in rendermain: ',user);    
    if(user.fetched){
      var userview = new app.Views.User({model: user});
      this.$el.find('#disUser').html(userview.render().el);
    }else{
      this.$el.find('#disUser').html('<h3>Could not find a user with that id</h3>');
    }
  },
  events: {
    'click button':'getUser'
  }
});





app.Views.Users = Backbone.View.extend({
  template: "<ul id='user-list'></ul>",
  initialize: function(options){
    //this.render();
  },
  render: function(){
    this.$el.html(this.template);
    this.getUsers();
    return this;
  },
  getUsers: function(){
    var users = new app.Collections.Users();
    users.fetch({success: this.renderusers.bind(this)});
  },
  renderusers: function(users) {
    var userview;
    for (var n in users.models) {
      userview = new app.Views.UsersList({model: users.models[n]});
      this.$el.find('#user-list').append(userview.render().el);
    }
  },
});


//router
app.Router = Backbone.Router.extend({
  routes:{
    'home': 'home',
    'search': 'search',
    'users': 'users',
    '*path': 'home'
  },
  home: function(){
    var view = new app.Views.Home();
    $('#container').html(view.render().el);
  },
  search: function(){
    var view = new app.Views.Search();
    $('#container').html(view.render().el);
  },
  users: function(){
    var view = new app.Views.Users();
    $('#container').html(view.render().el);
  }
});


$(document).ready(function(){
    app.Router.Instance = new app.Router();
    Backbone.history.start();
});
