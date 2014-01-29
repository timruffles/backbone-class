// app main script - where we pass global dependencies
// into our modular code
function main() {

  // create pubSub object we'll use throughout app
  var pubSub = _.extend({},Backbone.Events);

  // setup View prototyp so `this.pubSub` accesses it 
  Backbone.View.prototype.pubSub = pubSub;

  // extending Backbone view constructor to
  // allow over-riding of pubSub object via
  // constructor for easy unit-testing or
  // control of exactly which events it hears
  Backbone.View = function(options) {
    options = options || {};
    if(options.pubSub) this.pubSub = options.pubSub;
    // call Backbone.View super method
    Backbone.View.call(this)
  }
}
