


app.Views.User = Backbone.View.extend({
    template: _.template( $('#tempUser').html()),
    linkTemplate:_.template( $('#udLinks').html()),
    updateTemplate:_.template( $('#update').html()),
    initialize: function(options) {
      if (options && options.model){
        this.model = options.model;
      }else{
        this.model = new app.Models.User();
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
