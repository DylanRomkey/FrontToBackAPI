'use strict';








app.Views.Home = Backbone.View.extend({
  //el: '#container',
  initialize: function(options){
    this.render();
  },
  render: function(){
    this.$el.html("<h1>Welcome to Dylans's Users!");
    return this;
  }
});



app.Views.Users = Backbone.View.extend({
  template: "<ul id='user-list'></ul><p class='msg'></p>",
  initialize: function(options){},
  render: function(m){
    this.$el.html(this.template);
    this.getUsers();
    if (m != undefined){
      if (m == 1){
        this.$el.find('.msg').html('<i>User has been deleted</i>');
      }
    }
    return this;
  },
  getUsers: function(){
    var users = new app.Collections.Users();
    users.fetch({
      success: this.renderUsers.bind(this)
    });
  },
  renderUsers: function(users) {
    users.sort();
    var userview;
    if(!users){
      window.location = 'login.html#message';
    }else if (users.models.length == 0){
      this.$el.find('#user-list').html('<p><i>Could not find any users</i></p>');
    }else{
      for (var n in users.models) {
        userview = new app.Views.UsersList({model: users.models[n]});
        this.$el.find('#user-list').append(userview.render().el);
      };
    };
  }
});



app.Views.Search = Backbone.View.extend({
  template: _.template( $('#searchById').html()),
  initialize: function(options){
    this.render();
  },
  render: function(id){
    this.$el.html(this.template);
    if (id != undefined){
      this.getUser(id);
    };
    return this;
  },
  getUser: function(id){
    if (typeof id === 'object'){
      id = this.$el.find('input').val();
    };
    var user = new app.Models.User({id: id});
    user.fetch({success: this.renderUser.bind(this)});
  },
  renderUser: function(user) {
    var userview = new app.Views.User({model: user});
    if (userview.model.attributes.firstName){
      this.$el.find('#disUser').html(userview.renderWithLinks().el);
    }else{
      this.$el.find('#disUser').html('<h3>Could not find a user with that id</h3>');
    }
  },
  events: {
    'click button':'getUser'
  }
});




app.Views.Update = Backbone.View.extend({
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
    var user = new app.Models.User({id: id});
    user.fetch({success: this.renderUser.bind(this)});
  },
  renderUser: function(user){
    this.userView = new app.Views.User({model: user});
    if (this.userView.model.attributes.firstName){
      this.$el.html(this.userView.renderForUpdates().el);
    }else{
      this.$el.html('<h3>Could not find a user with that id</h3>');
    }
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
    console.log(this.userView.model);
  },
  events: {
    'click #button-insertUser':'update',
    'change input':'changed'
  }
});











app.Views.Insert = Backbone.View.extend({
  template: _.template( $('#insert').html()),
  initialize: function(options){},
  render: function(){
    this.$el.html(this.template);
    return this;
  },
  insert: function (){

  },
  events:{
    'click button':'insert'
  }
});













app.Views.Delete = Backbone.View.extend({
  //el: '#container',
  template: _.template( $('#delete').html()),
  dataTemplate:_.template( $('#tempUser').html()),
  initialize: function(options){},
  render: function(options){
    this.$el.html(this.template);
    this.getUser(options);
    return this;
  },
  getUser: function(id){
    this.model = new app.Models.User({id: id});
    this.model.fetch({success: this.renderUser.bind(this)});
  },
  renderUser: function(user) {
    var userview = new app.Views.User({model: user});
    if (userview.model.attributes.firstName){
      this.$el.find('#delUser').html(userview.render().el);
    }else{
      this.$el.find('#delUser').html('<h3>Could not find a user with that id</h3>');
    }
  },
  deleteUser: function(){
    this.model.destroy();
    window.location = '/index.html#users/1';
  },
  events: {
    'click #button-deleteUser':'deleteUser'
  }
});



//router
app.Router = Backbone.Router.extend({
  routes:{
    '': 'home',
    'home': 'home',
    'users': 'users',
    'users/:m': 'usersWithMsg',
    'search': 'search',
    'search/:id': 'searchById',
    'update/:id':'update',
    'insert':'insert',
    'delete/:id':'delete'

  },
  home: function(){
    var view = new app.Views.Home();
    $('#container').html(view.render().el);
  },
  users: function(){
    var view = new app.Views.Users();
    $('#container').html(view.render().el);
  },
  usersWithMsg: function(m){
    var view = new app.Views.Users();
    $('#container').html(view.render(m).el);
  },
  search: function(){
    var view = new app.Views.Search();
    $('#container').html(view.render().el);
  },
  searchById: function(id){
    var view = new app.Views.Search();
    $('#container').html(view.render(id).el);
  },
  update: function(id){
    var view = new app.Views.Update();
    $('#container').html(view.render(id).el);
  },
  insert: function(){
    var view = new app.Views.Insert();
    $('#container').html(view.render().el);
  },
  delete: function(id){
    var view = new app.Views.Delete();
    $('#container').html(view.render(id).el);
  }
});

//tie router to page
$(document).ready(function(){
    app.Router.Instance = new app.Router();
    Backbone.history.start();
});

//send request with token
$(document).ajaxSend(function(event, request) {
   var token = app.Storage.getToken();
   if (token) {
      request.setRequestHeader("x-access-token", token);
   }
});

//handle unotherized
$(document).ajaxError(function(event, xhr) {
   if (xhr.status == 403) {
      window.sessionStorage.clear();
      window.location = 'login.html#message';
      return;
   }
});
