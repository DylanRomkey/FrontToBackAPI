



var SearchView = Backbone.View.extend({
  template: _.template( $('#searchById').html()),
  initialize: function(options){
    this.render();
  },
  render: function(id){
    this.$el.html(this.template);
    if (id != undefined){
      this.getUser(id);
    };
    return this;
  },
  getUser: function(id){
    if (typeof id === 'object'){
      id = this.$el.find('input').val();
    };
    var user = app.Collections.users.get(id);
    this.renderUser(user);
  },
  renderUser: function(user) {
    var userview = new app.Views.User({model: user});
    if (userview.model.attributes.username){
      this.$el.find('#disUser').html(userview.renderWithLinks().el);
    }else{
      this.$el.find('#disUser').html('<h3>Could not find a user with that id</h3>');
    }
  },
  events: {
    'click button':'getUser'
  }
});