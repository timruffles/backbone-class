

var Exercise = Backbone.Model.extend({
  url: function() {
    return "/exercises"
  },
  validate: function() {
  }
});

Exercise.Collection = Backbone.Collection.extend({
  model: Exercise
});

var ExerciseList = Backbone.View.extend({
  initialize: function() {
    this.listenTo(
      this.collection,
      "add",
      this.render,
      this
    );
  },
  tagName: "ul",
  template: _.template(
    document.querySelector("#exercise_list").innerHTML
  ),
  render: function() {
    this.el.innerHTML = this.template(
      {exercises: this.collection}
    )
  }
});

var ExerciseForm = Backbone.View.extend({
  initialize: function() {
    this.listenTo(
      this.collection,
      "add",
      this.render,
      this
    );
  },
  tagName: "form",
  events: {
    "submit": "addExercise"
  },
  template: _.template(
      document.querySelector("#form").innerHTML
  ),
  render: function() {
    this.el.innerHTML = this.template()
  },
  addExercise: function(event) {
    event.preventDefault();
    var name = this.$("[name=name]").val()
    this.collection.add([{
      name: name
    }]);
  }
});

var AppRouter = Backbone.Router.extend({
  routes: {
    "": "list",
    "form": "form"
  },
  initialize: function(opts) {
    this.rootEl = opts.el
    this.listView = opts.list;
    this.formView = opts.form;
  },
  list: function() {
    this.rootEl.html(this.listView.el)
  },
  form: function() {
    this.rootEl.html(this.formView.el)
  }
});



function main() {
  var a = new Exercise({
    name: "curl",
    reps: 5,
    sets: 5
  })
  var b = new Exercise({
    name: "deadlift",
    reps: 5,
    sets: 5
  })
  var c = new Exercise({
    name: "dancing",
    reps: 5,
    sets: 5
  })

  var exercises = new Exercise.Collection([
      a,b,c
  ])


  var exerciseListView = new ExerciseList({
    collection: exercises
  });
  exerciseListView.render()

  var exerciseFormView = new ExerciseForm({
    collection: exercises
  });
  exerciseFormView.render()

  var router = new AppRouter({
    el: $(document.body),
    list: exerciseListView,
    form: exerciseFormView
  });
    
  Backbone.history.start();
  

}

main();
