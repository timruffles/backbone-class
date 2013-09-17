define([
  "libs/backbone",
  "exercise_view",
  "exercise"],
function(
  Backbone,
  ExerciseView,
  Exercise
) {
  var AppView = Backbone.View.extend({
    initialize: function() {
      this.el.innerHTML = "<h1>App view</h1>"
      this.exerciseView = new ExerciseView({
        model: new Exercise
      });
      this.$el.append(this.exerciseView.el);
    }
  })

  return AppView;
});
