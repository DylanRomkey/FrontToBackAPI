
var HomeView = Backbone.View.extend({
  //el: '#container',
  initialize: function(options){
    if (app.Collections.users == undefined){
      app.Collections.users = new app.Collections.Users;
      app.Collections.users.fetch({
        success: function(){
          app.Collections.users.sort();
        }
      });
    }
  },
  render: function(){
    this.$el.html("<h1>Welcome to Dylans's Users!</h1>");
    return this;
  }
});
