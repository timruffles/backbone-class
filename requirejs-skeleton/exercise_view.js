define(["libs/backbone"],function(Backbone) {
  var ExerciseView = Backbone.View.extend({
    initialize: function() {
      this.el.innerHTML = "<h1>I'm an ExerciseView, hear me roar!</h1>"
    }
  })

  return ExerciseView;
})
