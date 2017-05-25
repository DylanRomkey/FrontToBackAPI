'use strict';


    // namespace
    var app = {
      Views: {},
      Models: {},
      Collection: {},
      Router: {}
    };








    //model
    app.Models.Users = Backbone.Model.extend({
        initialize: function(options) {
            console.log(options);
        }
    });

    //Collections
    //all
    app.Collection.Users = Backbone.Collection.extend({
      initialize: function(options) {},
      url: function(){
        return "http://localhost:3000/users";
      },
      parse: function(response){
        return response.data;
      }
    });
    //by id
    app.Collection.User = Backbone.Collection.extend({
      initialize: function(options) {
        if (options.id){
          this.id = options.id;
        }
      },
      url: function(){
        return "http://localhost:3000/user/"+this.id;
      },
      parse: function(response){
        return response.data;
      }
    });









    //views
    app.Views.UsersList = Backbone.View.extend({
      tagName: 'li',
      initialize: function(options) {
        if (options.model){
          this.model = options.model;
        }
      },
      render: function(){
        this.$el.html(this.model.attributes.username);
        return this;
      }
    });

    app.Views.UserById = Backbone.View.extend({
        //tagName: 'p',
        initialize: function(options) {
          if (options.model){
            this.model = options.model;
          }
        },
        render: function(){
          this.$el.html(this.model.attributes.username+": "+this.model.attributes.email);
          return this;
        }
      });



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
      template: "<input type='text' placeholder='id'> \
                <button>fetch</button> \
               <p id='user'></p>",
      initialize: function(options){
        this.render();
      },
      render: function(){
        this.$el.html(this.template);
        return this;
      },
      getUser: function(){
        var id = this.$el.find('input').val();
        var user = new app.Collection.User({id: id});
        user.fetch({success: this.renderuser.bind(this)});
      },
      renderuser: function(user) {
        var userview;
        for (var n in user.models) {
          userview = new app.Views.UserById({model: user.models[n]});
          this.$el.find('#user').text(userview.render().el.innerHTML);
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
        var users = new app.Collection.Users();
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
