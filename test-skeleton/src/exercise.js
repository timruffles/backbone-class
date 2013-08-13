;(function(global) {

  var Exercise = Backbone.Model.extend({

    validate: function(attrs) {
      var errors = []
      if(attrs.reps == null || attrs.reps < 1 || attrs.reps > 20) {
        errors.push({
          field: "reps",
          message: "Invalid"
        })
      }
    }

  })

  global.Exercise = Exercise;

})(this);
