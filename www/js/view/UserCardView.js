define([
  'jquery',
  'underscore',
  'backbone',
  'text!../templates/tplUserCard.html',
  'model/UserModel'
], function($, _, Backbone,template,Model){

  var view = Backbone.View.extend({
    template: _.template(template),
    initialize: function(options) {
      if (options && options.attributes){
        this.model = options.attributes;
      }else{
        this.model = new Model();
      }
    },
    render: function() {
      this.$el.html(this.template(this.model));
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
