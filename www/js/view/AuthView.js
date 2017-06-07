
define([
  'underscore',
  'jquery',
  'backbone',
  'bootstrap',
  'tool/token',
  'tool/msg',
  'text!/templates/tplLogin.html'
], function(_,$,Backbone,bootstrap,token,msg,template) {


  var auth = Backbone.View.extend({
      template: _.template(template),
      initialize: function(options){},
      render: function(){
        this.$el.html(this.template());
        var msgCode = msg.getMsg();
        if (msgCode){
          this.writeMsg(msgCode);
          window.sessionStorage.clear();
        };
        return this;
      },
      getAuth: function(){
        console.log("in get auth");
        var pass = this.$el.find('#password').val();
        var name = this.$el.find('#username').val();
        var that = this;
        console.log(pass, name);
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
                msg.setMsg(4);
                console.log("token fail");
              };
              return false;
            } else {
              msg.setMsg(4);
              console.log(data.message);
            }
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log('ajax fail'+ errorThrown);
            msg.setMsg(3);
            // that.$el.find('#errorMsg').html("<h3>"+errorThrown+"</h3>");
        });
      },
      events: {
        'click #button-login':'getAuth'
      },
      writeMsg: function(er){
        console.log("in write error:",er);
        switch(er){
          case '1':
            this.$el.find('#errorMsg').html("<h3>Something went wrong, please login again</h3>");
            break;
          case '2':
            this.$el.find('#errorMsg').html("<p><i>You have been logged out</i></p>");
            break;
          case '3':
            this.$el.find('#errorMsg').html("<h3>Can not find a user with that username and password</h3>");
            break;
          case '4':
            this.$el.find('#errorMsg').html("<h3>Problem storing your authorization</h3>");
            break;
          default:
            this.$el.find('#errorMsg').html("<h3>"+er+"</h3>");
            break;
        };
      }
  });
  return auth;
});
