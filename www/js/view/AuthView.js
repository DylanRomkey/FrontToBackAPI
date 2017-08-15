
define([
  'underscore',
  'jquery',
  'backbone',
  'bootstrap',
  'tool/token',
  'tool/msg',
  'text!/templates/tplLogin.html'
], function(_,$,Backbone,bootstrap,token,msg,template) {
console.log("in auth render");

  var auth = Backbone.View.extend({
      template: _.template(template),
      initialize: function(options){console.log("in auth init");},
      render: function(){
        console.log("in auth render");
        this.$el.html(this.template());
        var msgCode = msg.getMsg();
        if (msgCode){
          this.writeMsg(msgCode);
          window.sessionStorage.clear();
        };
        return this;
      },
      getAuth: function(e){
        e.preventDefault();
        console.log("in get auth");
        var pass = this.$el.find('#password').val();
        var name = this.$el.find('#username').val();
        // var that = this;
        if(this.validator(name, pass)){
          console.log(pass, name);
          window.sessionStorage.clear();
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
              console.log("ajax call success");
              if(xhr.status==200 && data.success){
                if (token.setToken(data.token)){
                  window.location = 'index.html';
                }else{
                  msg.setMsg(4);
                  console.log("token fail", data.message);
                };
                return false;
              } else {
                msg.setMsg(4);
                console.log(data.message);
              }
          }).fail(function(jqXHR, textStatus, errorThrown){
              console.log('ajax fail '+textStatus);
              msg.setMsg(3);
              // that.$el.find('#errorMsg').html("<h3>"+errorThrown+"</h3>");
          });
        }
      },
      events: {
        'click #button-login':'getAuth'
      },
      validator: function(name, pass){
        //todel
        return true;

        if (name == '' || pass == ''){
          this.writeMsg("6");
          return false;
        }
        //upper/lower case and numbers
        var usernameRegex = /^[a-zA-Z0-9]+$/;
        //a number, upper/lower and at least 6
        var passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (usernameRegex.test(name) && passwordRegex.test(pass)){
          return true
        }else{
          this.writeMsg("5");
          return false;
        }
      },
      writeMsg: function(er){
        console.log("in write error:",er);
        this.$el.find('#errorMsg').addClass("alert alert-danger");
        switch(er){
          case '1':
            this.$el.find('#errorMsg').html("Something went wrong, please login again");
            break;
          case '2':
            this.$el.find('#errorMsg').removeClass("alert-danger");
            this.$el.find('#errorMsg').addClass("alert-info");
            this.$el.find('#errorMsg').html("<p><i>You have been logged out</i></p>");
            break;
          case '3':
            this.$el.find('#errorMsg').html("Can not find a user with that username and password");
            break;
          case '4':
            this.$el.find('#errorMsg').html("Problem storing your authorization");
            break;
          case '5':
            this.$el.find('#errorMsg').html("Invalid entry, make sure to mix upper/lower case and numbers");
            break;
          case '6':
            this.$el.find('#errorMsg').html("Must fill out both fields");
            break;
          default:
            this.$el.find('#errorMsg').html(er);
            break;
        };
      }
  });
  return auth;
});
