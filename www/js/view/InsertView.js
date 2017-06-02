


var InsertView = Backbone.View.extend({
  template: _.template( $('#insert').html()),
  initialize: function(options){},
  render: function(){
    this.$el.html(this.template);
    this.userView = new app.Views.User();
    return this;
  },
  insert: function (){
    var that = this;
    this.userView.model.save(null,{
      success: function(){
        app.Collections.users = new app.Collections.Users();
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
