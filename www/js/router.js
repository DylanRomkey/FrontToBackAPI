define([
  'jquery',
  'underscore',
  'backbone',
  'view/MasterView',
  'view/HomeView',
  'view/UserListView',
  'view/SearchView',
  'view/UpdateView',
  'view/InsertView',
  'view/DeleteView'
], function($, _, Backbone,MasterView, HomeView,UsersView,SearchView,UpdateView,InsertView,DeleteView){
console.log("in router");

  var Router = Backbone.Router.extend({
    routes:{
      '': 'home',
      'home': 'home',
      'users': 'users',
      'search': 'search',
      'search/:id': 'searchById',
      'update/:id':'update',
      'insert':'insert',
      'delete/:id':'delete',
      'fake' : 'admin',
      'fake' : 'profile',
      'logout' : 'logout'
    },
    initialize : function(){
      console.log("in router init");
      this.MasterView = new MasterView();
      $('#app').html(this.MasterView.render().el);
      this.home();
    },
    home: function(){
      var view = new HomeView();
      this.MasterView.renderContent(view);
    },
    users: function(){
      console.log("in users")
      var view = new UsersView();
      this.MasterView.renderContent(view);
    },
    search: function(){
      var view = new SearchView();
      this.MasterView.renderContent(view);
    },
    searchById: function(id){
      var view = new SearchView();
      this.MasterView.renderContent(view, id);
    },
    update: function(id){
      var view = new UpdateView();
      this.MasterView.renderContent(view, id);
    },
    insert: function(){
      var view = new InsertView();
      this.MasterView.renderContent(view);
    },
    delete: function(id){
      var view = new DeleteView();
      this.MasterView.renderContent(view, id);
    }
  });



  return Router;
});
