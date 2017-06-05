


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
    app.Views.Home = new HomeView();
    $('#container').html(app.Views.Home.render().el);
  },
  users: function(){
    app.Views.UsersView = new UsersView();
    $('#container').html(app.Views.UsersView.render().$el);
  },
  usersWithMsg: function(m){
    app.Views.UsersView = new UsersView();
    $('#container').html(app.Views.UsersView.render(m).el);
  },
  search: function(){
    app.Views.Search = new SearchView();
    $('#container').html(app.Views.Search.render().el);
  },
  searchById: function(id){
    app.Views.Search = new SearchView();
    $('#container').html(app.Views.Search.render(id).el);
  },
  update: function(id){
    app.Views.Update = new UpdateView();
    $('#container').html(app.Views.Update.render(id).el);
  },
  insert: function(){
    app.Views.Insert = new InsertView();
    $('#container').html(app.Views.Insert.render().el);
  },
  delete: function(id){
    app.Views.Delete = new DeleteView();
    $('#container').html(app.Views.Delete.render(id).el);
  }
});

//tie router to page
$(document).ready(function(){
    app.Router.Instance = new app.Router();
    Backbone.history.start();
});
