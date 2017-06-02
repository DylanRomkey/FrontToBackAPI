//views
app.Views.UsersList = Backbone.View.extend({
  tagName: 'li',
  initialize: function(options) {
    if (options.model){
      this.model = options.model;
    }
  },
  render: function() {
    this.$el.html(this.model.attributes.username);
    return this;
  },
  events: {
    'click' : 'view'
  },
  view: function (){
    window.location = '/index.html#search/' + this.model.attributes.id;
  }
});
