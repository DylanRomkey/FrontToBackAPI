define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'view/UserView',
  'text!/templates/tplUserInsert.html'
],
 function($, _, Backbone,app,User,template) {


  var InsertView = Backbone.View.extend({
    template: _.template( template),
    initialize: function(options){},
    render: function(){
      this.$el.html(this.template);
      this.userView = new User();
      return this;
    },
    insert: function (){
      var that = this;
      this.userView.model.save(null,{
        success: function(){
          app.Collections.users.fetch({
            success: function(){
              app.Collections.users.sort();
              window.location = 'index.html#users';
            }
          });
        },
        error: function(){
          window.location = 'index.html#users/2';
        }
      });

    },
    changed: function(e){
      var changed = e.currentTarget.className;
      var value = $(e.currentTarget).val();
      var obj = {};
      obj[changed] = value;
      this.userView.model.set(obj);
    },
    events:{
      'click #button-insertUser':'insert',
      'change input':'changed'
    }
  });
  return InsertView;
});
