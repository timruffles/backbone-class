var ExerciseDetailView = Backbone.View.extend({
  events: {
  },

  backClicked: function() {
    this.options.bus.trigger() 
  }

})
