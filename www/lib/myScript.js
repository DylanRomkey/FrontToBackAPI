'use strict';

$( document ).ready(function(){
  authorized(false);
});


$("#button-login").click(function(){


  authorized(true);
});



var authorized = function(x){
  if(x){
    $("#login").removeClass("display");
    $("#login").addClass("hide");
      $("#content").removeClass("hide");
      $("#content").addClass("display");
  }else{
    $("#login").removeClass("hide");
    $("#login").addClass("display");
      $("#content").removeClass("display");
      $("#content").addClass("hide");
  }
}
