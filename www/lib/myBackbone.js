'use strict';


// namespace
var app = {
  Views: {},
  Models: {},
  Collections: {},
  Storage: {},
  Router: {},
  Navigate: function (url) { window.location = url; }
};





// token storage
app.Storage.setToken = function(token){
  var storage = window.sessionStorage;
  if (typeof(window.Storage) !== "undefined") {
    storage.token = token
    return true;
  } else {
    return false;
  }
}
app.Storage.getToken = function(){
  var storage = window.sessionStorage;
  if (storage.token) {
    return storage.token
  } else {
    return false;
  }
}






//model
app.Models.User = Backbone.Model.extend({
    initialize: function(options) {
        if (options.id){
          this.id = options.id;
        };
    },
    url: function(){
      return "http://localhost:3000/user/"+this.id;
    },
    parse: function(response){
      this.fetched = response.success
      return this.fetched ? response.data[0] : null;
    }
});

// app.Models.Auth = Backbone.Model.extend({
//     initialize: function(options) {
//         if (options){
//           // console.log('in model: ', this);
//         };
//     },
//     url: function(){
//       console.log("in url", this);
//       // return "http://localhost:3000/auth";
//       return '/v1/auth';
//     },
//     parse: function(response){
//       console.log('in model parse: ',response);
//       return response;
//     }
// });




//Collections

//auth
app.Collections.Auth = Backbone.Collection.extend({
  initialize: function(options) {
    if (options.username && options.password){
      this.username = options.username;
      this.password = options.password;
    }
  },
  url: function(){
    return "http://localhost:3000/auth";
  },
  parse: function(response){
    return response.data;
  }
});

//all users
app.Collections.Users = Backbone.Collection.extend({
  initialize: function(options) {},
  url: function(){
    return "http://localhost:3000/users";
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

app.Views.User = Backbone.View.extend({
    template: _.template( $('#tempUser').html()),
    initialize: function(options) {
      if (options.model){
        this.model = options.model;
      }
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
