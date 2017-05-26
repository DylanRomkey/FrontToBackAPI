app.Views.Auth = Backbone.View.extend({
    template: _.template($('#tempUser').html()),
    initialize: function(options){
      this.render();
    },
    render: function(){
      this.$el.html(this.template());
      return this;
    },
    getAuth: function(){
      var pass = this.$el.find('#password').val();
      var name = this.$el.find('#username').val();
      this.model = new app.Models.Auth({data:{username: name, password: pass}});
      this.model.save({success: this.renderMain(this)});
    },
    renderMain: function(auth) {
      console.log(auth, auth.data);
      // var mainview = new app.Views.Main({model: auth.models[0]});
      // this.$el.find('#user').text(userview.render().el.innerHTML);
    },
    events: {
      'click #button-login':'getAuth'
    }
});






$(document).ready(function(){
  var view = new app.Views.Auth();
  $('#container').html(view.render().el);
});
