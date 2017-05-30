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



app.Views.Search = Backbone.View.extend({
  //el: '#container',
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





app.Views.Users = Backbone.View.extend({
  template: "<ul id='user-list'></ul>",
  initialize: function(options){},
  render: function(){
    this.$el.html(this.template);
    this.getUsers();
    return this;
  },
  getUsers: function(){
    var users = new app.Collections.Users();
    users.fetch({
      success: this.renderUsers.bind(this)
    });
  },
  renderUsers: function(users) {
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


app.Views.Update = Backbone.View.extend({
  //el: '#container',
  template: _.template( $('#update').html()),
  initialize: function(options){
    this.render();
  },
  render: function(){
    this.$el.html(this.template);
    return this;
  }
});


app.Views.Insert = Backbone.View.extend({
  //el: '#container',
  template: _.template( $('#insert').html()),
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
  // insertUser: function(){
  //   var id = this.$el.find('input').val();
  //   var user = new app.Models.User({id: id});
  //   user.fetch({success: this.renderUser.bind(this)});
  // },
  // renderUser: function(user) {
  //   var userview = new app.Views.User({model: user});
  //   console.log(userview);
  //   if (userview.model.attributes.firstName){
  //     this.$el.find('#disUser').html(userview.render().el);
  //   }else{
  //     this.$el.find('#disUser').html('<h3>Could not find a user with that id</h3>');
  //   }
  // },
  // events: {
  //   'click button':'insertUser'
  // }
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
    console.log('in delete user')
    this.$el.find('#delUser').html('');
    this.model.destroy();
    this.$el.find('.msg').html('<p>User has been deleted</p>');
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
    'search': 'search',
    'search/:id': 'searchById',
    'update/:id':'update',
    'insert/:id':'insert',
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
  insert: function(id){
    var view = new app.Views.Insert();
    $('#container').html(view.render(id).el);
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
