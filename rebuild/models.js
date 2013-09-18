// define our model
// define exercise model
// validate that 1-20 reps, 1-20 sets
var Exercise = Backbone.Model.extend({
  validate: function(attrs) {
    if(attrs.reps != null && (attrs.reps > 20 || attrs.reps < 1)) {
      return "You have supplied an invalid reps value"
    }
  }
});

// define exercise collection
Exercise.Collection = Backbone.Collection.extend({
  model: Exercise
});
