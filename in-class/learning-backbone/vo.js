
var PeriodView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model,"change:period",this.render,this)
  },
  render: function() {
  }
})
