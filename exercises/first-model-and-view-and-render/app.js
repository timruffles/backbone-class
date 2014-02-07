console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);

var model = new Backbone.Model({
  name: "jumping"
});


var ExerciseView = Backbone.View.extend({
  events: {
    "submit": "handle"
  },
  initialize: function () {
    this.listenTo(this.model,"change",this.render,this);
  },
  handle: function(evt) {
    evt.preventDefault();
    this.model.set("name",this.$("input").val());
  },
  template: _.template([
    "<h1><%= model.get('name') %></h1>",
    "<form><input type=text><input type=submit></form>"
  ].join("")),
  render: function() {
    this.$el.html(this.template(this));
  }
});

var view = new ExerciseView({
  model: model
})
view.render()
document.body.appendChild(view.el)













