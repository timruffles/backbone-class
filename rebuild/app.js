console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);
// our views and models have been included above
// and exposed as globals on window.
// alternatively we could have used require.js

var AppRouter = Backbone.Router.extend({
  routes: {
    "": "root",
    "exercises/:id": "show",
    "*unknown": "fourOhFour"
  }
});

function main() {
  // our pubSub object which we'll share
  // so objects can communicate without
  // being coupled. We can have more than
  // one to have subsystems
  var pubSub = _.extend({},Backbone.Events);

  var appRouter = new AppRouter;

  // create a collection of exercises
  var exercises = new Exercise.Collection([
      { name: "swimming" },
      { name: "squat" },
  ]);

  // wire up the app router. We've decoupled
  // routing from view showing - if we have 
  // saved the view to show in a localStorage
  // or similar, perhaps for phone gap, we just
  // fire the same view: events.
  appRouter.on("route",function(routeName) {
    pubSub.trigger("view:" + routeName,[].slice.call(arguments,1));
  });

  // create app view
  var app = new AppView({
    pubSub: pubSub,
    exercises: exercises
  })

  // fire the routing - this probably
  // render the first view.
  // since nothing is attached to DOM
  // at this point, rendering will happen
  // faster (no re-draws), which is always
  // a possible optimisation (detach, render, attach)
  Backbone.history.start();

  
  // attach app to dom
  document.body.appendChild(app.el);
}

// initialize app
main();

