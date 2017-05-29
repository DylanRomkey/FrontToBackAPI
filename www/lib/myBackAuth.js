




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
            if (app.Storage.setToken(data.token)){
              app.Navigate('index.html');
            }else{
              that.$el.find('#errorMsg').html("<h3>Problem storing your authorization</h3>");
            };
            return false;
          } else {
              that.$el.find('#errorMsg').html("<h3>"+data.message+"</h3>");
          }
      }).fail(function(jqXHR, textStatus, errorThrown){
          console.log('ajax ', errorThrown);
          that.$el.find('#errorMsg').html("<h3>"+errorThrown+"</h3>");
      });
    },
    events: {
      'click #button-login':'getAuth'
    }
});





$(document).ready(function(){
  var view = new app.Views.Auth();
  $('#container').html(view.el);
});
