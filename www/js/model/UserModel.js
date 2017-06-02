


//model
app.Models.User = Backbone.Model.extend({
    defaults: {
      firstname: '',
      lastname: '',
      username: '',
      email: ''
    },
    initialize: function(options) {
        if (options && options.id){
          this.id = options.id;
        };
    },
    url: function(){
      if(this.id){
          return "http://localhost:3000/user/"+this.id;
      }
      return "http://localhost:3000/user";
    },
    getFullName : function(){
      return this.get('firstname') + ' ' + this.get('lastname')
    },
    parse: function(response){
      return response;
    }
});
