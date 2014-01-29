


var AppView = Backbone.View.extend({
  initialize: function() {
    // our code now has access to full API of all objects passed into
    // constructor via options
    this.listenTo(this.options.router,"route:show",this.show);
    // setup child views
  }
});


it("responds correctly to show route",function() {
  // setup or mock dependencies (in this case, just router, would be more complex)
  var mock;
  // ... mock router API, or create a real router with all of its dependencies
  var appView = new AppView({
    router: mock
  })
  mock.trigger("route:show")
  // ensure correct thing happened
})


var AppViewPubSub = Backbone.View.extend({
  initialize: function() {
    // now we have a single dependency for all collaborators we need to
    // listen for events on with a tiny API:
    // on, off, trigger
    this.listenTo(this.options.pubSub,"route:show",this.show);
    // setup child views
  }
});

it("responds correctly to show route",function() {
  var pubSub = _.extend({},Backbone.Events);
  // setup very much lower, creating a mock pubSub trivial
  var appView = new AppView({
    pubSub: pubSub
  })
  pubSub.trigger("route:show")
  // ensure correct thing happened
})


