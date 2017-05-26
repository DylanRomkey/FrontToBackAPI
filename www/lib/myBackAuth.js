




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
      var that = this;
      $.ajax({
          url:"/v1/auth",
          method: "POST",
          dataType: "json",
          processData : false,
          data: JSON.stringify({
              username: name,
              password: pass
          }),
          beforeSend: function (request){
              request.setRequestHeader("Accept", 'application/json');
              request.setRequestHeader("Content-Type", 'application/json');
          }
      }).done(function(data, textStatus, xhr){
          if(xhr.status==200 && data.success){
            console.log(data.token);
            that.$el.find('#error').text("<h3>"+data.token+"</h3>");
              //location.href = mySelfCare.root;
              // return false;
          } else {
              that.$el.find('#error').text("<h3>"+data.message+"</h3>");
          }
      }).fail(function(jqXHR, textStatus, errorThrown){
        console.log('ajax ', errorThrown);
          that.$el.find('#error').text("<h3>"+errorThrown+"</h3>");
      });
    },
    renderMain: function(auth) {
      console.log('in rendermain: ',auth);
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
