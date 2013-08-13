define(["libs/backbone"],function(Backbone) {
  return Backbone.View.extend({
    initialize: function() {
      this.el.innerHTML = "<h1>App view</h1>"
    }
  })
});
