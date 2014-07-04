function boot() {
  // create view
  // pass router to view
  // kick off backbone history
  var app = new AppView({
    exercises: new Exercise.Collection,
    router: new AppRouter
  });
  app.router.on("all",console.log.bind(console));
  app.render();
  app.$el.appendTo(document.body);
  Backbone.history.start();
}


// AppView
// - listen to top-level routes
var AppView = Backbone.View.extend({
  initialize: function(opts) {
    this.router = opts.router;
    this.listenTo(this.router,"route:home",
      this.home,this);
    this.listenTo(this.router,"route:exerciseAdd",
      this.add,this);
    this.listenTo(this.router,"route:exerciseList",
      this.list,this);
    this.exercises = opts.exercises;
  },
  render: function() {
    this.$el.html("<nav></nav><div class=stage></div>");
    this.$stage = this.$(".stage");
    var nav = new NavView({
      el: this.$("nav")[0]
    });
    nav.render();
  },
  switchView: function(view) {
    if(this.currentView) this.currentView.remove();
    this.currentView = view;
    this.currentView.render();
    this.$stage.html("").append(this.currentView.el);
  },
  home: function() {
    var view = new HomeView;
    // create models and pass to view, using route params
    this.switchView(view);
  },
  add: function(id) {
    var view = new ExerciseAddView({
      collection: this.exercises
    })
    this.switchView(view);
  },
  list: function() {
    var view = new ExerciseListView({
      collection: this.exercises
    });
    this.switchView(view);
  }
});

var Exercise = Backbone.Model.extend();

Exercise.Collection = Backbone.Firebase.Collection.extend({
  model: Exercise,
  firebase: "https://blazing-fire-7478.firebaseio.com"
});

var HomeView = Backbone.View.extend({
  render: function() {
    this.el.innerHTML = "home";
  }
})

var ExerciseItemView = Backbone.Marionette.ItemView.extend({
  events: {
    "click .remove": "removeItem"
  },
  initialize: function() {
    this.listenTo(this.model,"change",this.render);
  },
  removeItem: function(event) {
    this.model.collection.remove(this.model);
  },
  render: function() {
    this.el.innerHTML = 
      this.model.get("name") +
      " <a class='remove'>x</a>";
  }
});

var ExerciseListView = Backbone.Marionette.CollectionView.extend({
  itemView: ExerciseItemView
});

var ExerciseAddView = Backbone.View.extend({
  tagName: "form",
  events: {
    "submit": "createExercise"
  },
  createExercise: function(event) {
    event.preventDefault();
    this.collection.add({
      name: this.$("[name=name]").val()
    })
  },
  render: function() {
    this.el.innerHTML = 
      "<label>Name: <input type=text name=name></label>";
  }
});

var NavView = Backbone.View.extend({
  render: function() {
    this.el.innerHTML = 
      "<a href='#'>Home</a> " +
      "<a href='#exercises/new'>Add</a> " +
      "<a href='#exercises'>All exercises</a>";
  }
})
// AppRouter
// - define routes
var AppRouter = Backbone.Router.extend({
  routes: {
    "": "home",
    "exercises/new": "exerciseAdd",
    "exercises": "exerciseList"
  }
});
