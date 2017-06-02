


var DeleteView = Backbone.View.extend({
  //el: '#container',
  template: _.template( $('#delete').html()),
  dataTemplate:_.template( $('#tempUser').html()),
  initialize: function(options){},
  render: function(options){
    this.$el.html(this.template);
    this.getUser(options);
    return this;
  },
  getUser: function(id){
    this.model = app.Collections.users.get(id);
    this.renderUser()
  },
  renderUser: function() {
    var userview = new app.Views.User({model: this.model});
    if (userview.model.attributes.firstname){
      this.$el.find('#delUser').html(userview.render().el);
    }else{
      this.$el.find('#delUser').html('<h3>Could not find a user with that id</h3>');
    }
  },
  deleteUser: function(){
    this.model.destroy();
    window.location = '/index.html#users/1';
  },
  events: {
    'click #button-deleteUser':'deleteUser'
  }
});
