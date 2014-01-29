console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);


var Exercise = Backbone.Model.extend({
});

Exercise.Collection = Backbone.Collection.extend({
  // ????
});

var ExerciseItemView = Backbone.View.extend({
  className: "exercise",
  template: _.template([
    "<p><%= model.get('name') %></p>"
  ].join("")),
  render: function() {
    this.el.innerHTML = this.template({model: this.model});
  }
});

var AppView = Backbone.View.extend({
  className: "app-view",
  initialize: function() {
    this.itemView = new ExerciseItemView({
      model: new Exercise({
        name: "jumping"
      })
    })
  },
  render: function() {
    this.itemView.render()
    this.el.appendChild(this.itemView.el)
  }
});

main();

function main() {
  var appView = new AppView()
  appView.render()
  document.body.appendChild(appView.el);
}










