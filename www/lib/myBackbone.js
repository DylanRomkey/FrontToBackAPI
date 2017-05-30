'use strict';


// namespace
var app = {
  Views: {},
  Models: {},
  Collections: {},
  Storage: {},
  Router: {}
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
      if (this.id){
        return "http://localhost:3000/user/"+this.id;
      }else{
        return "http://localhost:3000/user";
      }
    },
    parse: function(response){
      return response.data ? response.data[0] : null;
    }
});






//Collections

//all users
app.Collections.Users = Backbone.Collection.extend({
  initialize: function(options) {},
  url: function(){
    return "http://localhost:3000/users";
  },
  comparator: 'username',
  parse: function(response){
    return response.success ? response.data : null;
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
  },
  events: {
    'click' : 'view'
  },
  view: function (){
    window.location = '/index.html#search/' + this.model.attributes.id;
  }
});

app.Views.User = Backbone.View.extend({
    template: _.template( $('#tempUser').html()),
    linkTemplate:_.template( $('#udLinks').html()),
    updateTemplate:_.template( $('#update').html()),
    initialize: function(options) {
      if (options.model){
        this.model = options.model;
      }
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    renderWithLinks: function(){
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.append(this.linkTemplate(this.model.toJSON()));
      return this;
    },
    renderForUpdates: function(){
      this.$el.html(this.updateTemplate(this.model.toJSON()));
      return this;
    }
  });
