// this is responsible for rendering the
// collection, working with its ListItem
// - in Marionette it'd be a CollectionView
var ExerciseListView = Backbone.View.extend({
  tagName: "ul",
  className: "exercise-list",
  initialize: function() {
    this.listenTo(this.collection,"add remove reset",this.render,this);
  },
  render: function() {
    this.el.innerHTML = "";
    this.collection.each(function(model) {
      var view = new ExerciseListItem({
        model: model
      });
      view.render();
      this.$el.append(view.el);
    },this);
  }
});

// this view is responsible for 
// rendering a single model
var ExerciseListItem = Backbone.View.extend({
  tagName: "li",
  className: "exercise",
  template: 
    _.template("<h3><%= name %></h3><button>Remove</button>"),
  events: {
    "click button": "remove"
  },
  remove: function() {
    this.model.collection.remove(this.model);
  },
  render: function() {
    this.el.innerHTML = this.template({
      name: this.model.get("name")
    })
  }
});

// the app view is our parent view
// manging the whole app UI at the 
// top level. It only knows about
// top-level views and behaviour - as
// little as possible - and everything
// is handled by lower-level views
var AppView = Backbone.View.extend({
  initialize: function() {
    this.pubSub = this.options.pubSub;
    this.pubSub.on("view:root",this.exerciseList,this);
  },
  exerciseList: function() {
    // create an exercise list view
    var exercisesView = new ExerciseListView({
      collection: this.options.exercises
    });

    exercisesView.render();
    this.el.appendChild(exercisesView.el);
  }
});

