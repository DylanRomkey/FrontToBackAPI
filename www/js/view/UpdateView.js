


var UpdateView = Backbone.View.extend({
  initialize: function(options){ },
  render: function(id){
    if (id != undefined){
      this.getUser(id);
      return this;
    }else{
      this.$el.html('<h3>Something went wrong, try again</h3>');
    }
  },
  getUser: function(id){
    var that = this;
    app.Models.user = app.Collections.users.get(id);
    this.renderUser();
  },
  renderUser: function(){
    this.userView = new app.Views.User({model: app.Models.user});
    if (this.userView.model.attributes.firstname){
      this.$el.html(this.userView.renderForUpdates().el);
    }else{
      this.$el.html('<h3>Could not find a user with that id</h3>');
    }
  },
  update: function(){
    this.userView.model.save();
    window.location = '/index.html#users';
  },
  changed: function(e){
    var changed = e.currentTarget.className;
    var value = $(e.currentTarget).val();
    var obj = {};
    obj[changed] = value;
    this.userView.model.set(obj);
  },
  events: {
    'click #button-insertUser':'update',
    'change input':'changed'
  }
});
