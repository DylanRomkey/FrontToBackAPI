
define([
  'jquery',
  'underscore',
  'backbone',
  'model/UserModel',
  'text!/templates/tplUserInfo.html',
  'text!/templates/tplUpdateDeleteLinks.html',
  'text!/templates/tplUserUpdate.html'
],
 function($, _, Backbone,model,tempInfo,tempLinks,tempUpdate) {

  var User = Backbone.View.extend({
      template: _.template( tempInfo),
      linkTemplate:_.template( tempLinks),
      updateTemplate:_.template( tempUpdate),
      initialize: function(options) {
        if (options && options.model){
          this.model = options.model;
        }else{
          this.model = new model();
        }
      },
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      },
      renderWithLinks: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.append(this.linkTemplate(this.model.toJSON()));
        return this;
      },
      renderForUpdates: function(){
        this.$el.html(this.updateTemplate(this.model.toJSON()));
        return this;
      }
    });
    return User;
  });
