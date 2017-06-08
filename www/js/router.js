define([
  'jquery',
  'underscore',
  'backbone',
  'view/MasterView',
  'view/HomeView',
  'view/UsersView',
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
      // 'users': 'users',
      // 'users/:m': 'usersWithMsg',
      'search': 'search',
      'search/:id': 'searchById',
      'update/:id':'update',
      'insert':'insert',
      'delete/:id':'delete'
    },
    initialize : function(){
      console.log("in router init");
      this.MasterView = new MasterView();
      $('#container').html(this.MasterView.render().el);
    },
    home: function(){
      this.MasterView.renderHome();
    },
    // users: function(){
    //   var view = new UsersView();
    //   $('#content').html(view.render().$el);
    // },
    // usersWithMsg: function(m){
    //   var view = new UsersView();
    //   $('#content').html(view.render(m).el);
    // },
    search: function(){
      var view = new SearchView();
      // this.MasterView.renderContent(view);
      $('#contents').html(view.render().el);
    },
    searchById: function(id){
      var view = new SearchView();
      $('#contents').html(view.render(id).el);
    },
    update: function(id){
      var view = new UpdateView();
      $('#contents').html(view.render(id).el);
    },
    insert: function(){
      var view = new InsertView();
      $('#contents').html(view.render().el);
    },
    delete: function(id){
      var view = new DeleteView();
      $('#contents').html(view.render(id).el);
    }
  });



  return Router;
});
