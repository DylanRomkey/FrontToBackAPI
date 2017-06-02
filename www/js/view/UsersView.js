





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
      window.location = 'login.html/1';
    }
  },
  renderUsers: function() {
    if (app.Collections.users.length == 0){
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