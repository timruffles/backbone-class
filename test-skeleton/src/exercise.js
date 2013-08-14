;(function(global) {

  var Exercise = Backbone.Model.extend({

    validate: function(attrs) {
      var errors = {}
      var errorCount = 0
      if(attrs.reps == null || attrs.reps < 1 || attrs.reps > 20) {
        errorCount++
        errors.reps = {
          field: "reps",
          message: "Invalid"
        }
      }
      if(attrs.sets == null || attrs.sets < 1 || attrs.sets > 20) {
        errorCount++
        errors.sets = {
          field: "sets",
          message: "Invalid"
        }
      }
      if(errorCount > 0) return errors;
    },
    suggestedRmPercent: function() {
    },
    volume: function() {
      return this.get("sets") * this.get("reps")
    }

  })

  Exercise.Collection = Backbone.Collection.extend({
    model: Exercise,
    comparator: function(model) {
      return -model.suggestedRmPercent()
    }
  })

  global.Exercise = Exercise;

})(this);
