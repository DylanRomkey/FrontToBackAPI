require.config({
  baseUrl: "/",
  paths: {
    "jquery":"lib/jquery-3.2.1.min",
    "bootstrap":"lib/bootstrap/js/bootstrap",
    "underscore":"lib/underscore-amd",
    "backbone":"lib/backbone-amd",
    "text":"lib/text",
    tool : "js/tool",
    view : "js/view",
    model : "js/model",
    collection : "js/collection"
  }
})


require(["js/main"]);
