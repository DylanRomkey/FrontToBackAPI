require.config({
  baseUrl: "/",
  paths: {
    "jquery":"lib/jquery-3.2.1.min",
    "underscore":"lib/underscore-amd",
    "backbone":"lib/backbone-amd",
    "text":"lib/text",
    tools : "js/tools",
    views : "js/view"
  }
})


require(["views/AuthView"], function(AuthView) {
  var auth = new AuthView();
  $("#content").html(auth.$el);
});
