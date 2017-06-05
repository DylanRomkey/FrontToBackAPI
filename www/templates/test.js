define(['underscore','jquery','backbone'], function() {
  var showname = function(n){
    var temp = _.template("Hello <%= name %>");
    $("body").html(temp({name: n}));
  };
  return {
    showname: showname
  };
})
