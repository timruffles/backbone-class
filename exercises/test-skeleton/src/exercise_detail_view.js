
var ExerciseDetailView = Backbone.View.extend({
  events: {
    "click .remove": "triggerRemove"
  },
  render: function() {
    this.el.innerHTML = 
      "<span class=name>" + this.model.get("name")
      + "</span><span class=remove>X</span>";
  },
  triggerRemove: function() {
    this.trigger("remove")
  }
});