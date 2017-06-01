'use strict';








app.Views.Home = Backbone.View.extend({
  //el: '#container',
  initialize: function(options){},
  render: function(){
    this.$el.html("<h1>Welcome to Dylans's Users!</h1>");
    if (app.Collections.users == undefined){
      app.Collections.users = new app.Collections.Users();
      app.Collections.users.fetch();
      app.Collections.users.sort();
    }
    return this;
  }
});



var UsersView = Backbone.View.extend({
  template: _.template("<ul id='user-list'></ul><p class='msg'></p>"),
  initialize: function(options){},
  render: function(m){
    this.$el.html(this.template());
    this.getUsers();
    if (m != undefined){
      if (m == 1){
        this.$el.find('.msg').html('<i>User has been deleted</i>');
      }else if (m == 2){
        this.$el.find('.msg').html('<h3>There was an error trying to add user</h3>');
      }
    }
    return this;
  },
  getUsers: function(){
    if (app.Collections.users != undefined){
      this.renderUsers();
    }else{
      window.location = 'login.html#message';
    }
  },
  renderUsers: function() {
    if (app.Collections.users.models.length == 0){
      this.$el.find('#user-list').html('<p><i>Could not find any users</i></p>');
    }else{
      app.Views.usersList = {};
      for (var n in app.Collections.users.models) {
        app.Views.usersList[n] = new app.Views.UsersList({model: app.Collections.users.models[n]});
        this.$el.find('#user-list').append(app.Views.usersList[n].render().el);
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
    var user = app.Collections.users.get(id);
    this.renderUser(user);
  },
  renderUser: function(user) {
    var userview = new app.Views.User({model: user});
    if (userview.model.attributes.firstname){
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
    var that = this;
    app.Models.user = app.Collections.users.get(id);
    this.renderUser();
  },
  renderUser: function(){
    this.userView = new app.Views.User({model: app.Models.user});
    if (this.userView.model.attributes.firstname){
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
    this.userView = new app.Views.User();
    return this;
  },
  insert: function (){
    app.Collections.users.add(this.userView.model);
    app.Collections.users.get(this.userView.model).save(null,{
      success: function(){
        window.location = 'index.html#users'
      },
      error: function(){
        app.Collections.users.get(this.userView.model).destroy();
        window.location = 'index.html#users/2';
      }
    });

  },
  changed: function(e){
    var changed = e.currentTarget.className;
    var value = $(e.currentTarget).val();
    var obj = {};
    obj[changed] = value;
    this.userView.model.set(obj);
  },
  events:{
    'click #button-insertUser':'insert',
    'change input':'changed'
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
    this.model = app.Collections.users.get(id);
    this.renderUser()
  },
  renderUser: function() {
    var userview = new app.Views.User({model: this.model});
    if (userview.model.attributes.firstname){
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
    // if(app.Views.UsersView){
    //   app.Views.UsersView.remove();
    //   app.Views.UsersView.undelegateEvents();
    // }
    app.Views.UsersView = new UsersView();
    $('#container').html(app.Views.UsersView.render().$el);
  },
  usersWithMsg: function(m){
    app.Views.UsersView = new UsersView();
    $('#container').html(app.Views.UsersView.render(m).el);
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
      app = null;
      window.sessionStorage.clear();
      window.location = 'login.html#message';
      return;
   }
});
