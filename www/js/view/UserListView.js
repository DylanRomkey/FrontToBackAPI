define([
  'jquery',
  'underscore',
  'backbone',
  'js/app',
  'text!../templates/tplUserList.html',
  'view/UserCardView'
], function($, _, Backbone,app,template,cardView){

  var view = Backbone.View.extend({
    template: _.template(template),
    initialize: function(options) {},
    render: function() {
      this.$el.html(this.template);
      var that = this;
      app.Collections.users.each(function(model){        
        var view = new cardView(model);
        that.$el.find("#user-cards").append(view.render().$el);
      })
      return this;
    }
  });
  return view;
});
