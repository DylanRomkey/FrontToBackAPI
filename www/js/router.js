define([
  'jquery',
  'underscore',
  'backbone',
  'view/HomeView',
  'view/UsersView',
  'collection/UserCollection',
  'view/SearchView',
  'view/UpdateView',
  'view/InsertView',
  'view/DeleteView'
], function($, _, Backbone, HomeView,UsersView,Users,SearchView,UpdateView,InsertView,DeleteView){
console.log("in router");

  var Router = Backbone.Router.extend({
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
    initialize : function(){
      console.log("in router init");
    },
    home: function(){
      var view = new HomeView();
      $('#content').html(view.render().el);
    },
    users: function(){
      var view = new UsersView();
      $('#content').html(view.render().$el);
    },
    usersWithMsg: function(m){
      var view = new UsersView();
      $('#content').html(view.render(m).el);
    },
    search: function(){
      var view = new SearchView();
      $('#content').html(view.render().el);
    },
    searchById: function(id){
      var view = new SearchView();
      $('#content').html(view.render(id).el);
    },
    update: function(id){
      var view = new UpdateView();
      $('#content').html(view.render(id).el);
    },
    insert: function(){
      var view = new InsertView();
      $('#content').html(view.render().el);
    },
    delete: function(id){
      var view = new DeleteView();
      $('#content').html(view.render(id).el);
    }
  });



  return Router;
});
