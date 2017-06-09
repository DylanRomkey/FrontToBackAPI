define([
  'jquery',
  'underscore',
  'backbone',
  'text!../templates/tplUserCard.html'
], function($, _, Backbone,template){

  var view = Backbone.View.extend({
    template: _.template(template),
    initialize: function(options) {
      if (options && options.model){
        this.model = options.model;
      }else{
        this.model = new model();
      }
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    events: {
      'click #btnEdit' : 'edit',
      'click #btnDelete' : 'delete'
    },
    edit: function (){
      window.location = '/index.html#update/' + this.model.attributes.id;
    },
    delete: function (){
      window.location = '/index.html#delete/' + this.model.attributes.id;
    }
  });
  return view;
});
