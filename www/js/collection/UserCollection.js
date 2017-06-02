

//Collections

//all users
app.Collections.Users = Backbone.Collection.extend({
  model: app.Models.User,
  url: function(){
    // console.log("in collection url");
    return "http://localhost:3000/user";
  },
  comparator: 'username',
  parse: function(response){
    return response.success ? response.data : null;
  }
});
