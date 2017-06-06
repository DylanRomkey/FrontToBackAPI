
define([
  'underscore',
  'jquery',
  'backbone',
  'tool/token',
  'tool/msg',
  'text!/templates/tplLogin.html'
], function(_,$,Backbone,token,msg,template) {


  var auth = Backbone.View.extend({
      template: _.template(template),
      initialize: function(options){},
      render: function(){
        this.$el.html(this.template());
        var msgCode = msg.getMsg();
        if (msgCode){
          switch(msgCode){
            case 1:
              this.$el.find('#errorMsg').html("<h3>Something went wrong, please login again</h3>");
              break;
            case 2:
              this.$el.find('#errorMsg').html("<p><i>You have been logged out</i></p>");
              break;
          };
          window.sessionStorage.clear();
        };
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
              if (token.setToken(data.token)){
                window.location = 'index.html';
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
  return auth;
});
