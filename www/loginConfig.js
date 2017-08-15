require.config({
  baseUrl: "/",
  paths: {
    "jquery":"lib/jquery-3.2.1.min",
    "bootstrap":"lib/bootstrap/js/bootstrap",
    "underscore":"lib/underscore-amd",
    "backbone":"lib/backbone-amd",
    "backbone-val":"lib/backbone.validation.amd.min",
    "text":"lib/text",
    tool : "js/tool",
    view : "js/view"
  },
  shim: {
    'bootstrap': {
        deps: ['jquery']
    }
  }
})


require(["view/AuthView"], function(AuthView) {
  console.log("pre-auth");
  var auth = new AuthView();
  $("#content").html(auth.render().$el);
});
