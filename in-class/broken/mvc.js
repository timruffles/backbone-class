(function(){
  var Excercises, Exercise, ExerciseList, ExerciseShow, exerciseList, exercises, idEvent;
  var Model = Backbone.Model,
      View = Backbone.View,
      Collection = Backbone.Collection;

  var toJSON = function(form) {
    return form.serializeArray().reduce(function(json,kv) {
      json[kv.name] = kv.value;
      return json;
    },{});
  };
  Exercise = Model.extend({
    url: function() {
      return "/exercise" + (this.isNew() ? "s" : "/" + this.id);
    },
    validate: function(attrs) {
      attrs.sets = parseInt(attrs.sets)
      attrs.reps = parseInt(attrs.reps)
      var errors = []
      if(attrs.sets > 20 || attrs.sets < 1) errors.push("sets must be between 1-20");
      if(attrs.reps > 20 || attrs.reps < 1) errors.push("reps must be between 1-20");
      if(errors.length > 0) {
        return "Exercise item invalid: " + errors.join(" and ") + ".";
      }
    }
  });
  Exercises = Collection.extend({
    model: Exercise,
    url: "/exercises"
  });
  var templates = {
    exercise: document.head.querySelector("#exercise_tpl").innerHTML,
    exercises: document.head.querySelector("#exercises_tpl").innerHTML,
    show: document.head.querySelector("#show_tpl").innerHTML
  };
  ExerciseList = View.extend({
    events: {
      "click .remove": "remove",
      "submit .exercises form": "update",
      "submit": "create"
    },
    attributes: {
      style: "display:none;"
    },
    initialize: function() {
      _.bindAll(this,"render","error");
      this.listenTo(this.collection,"add", this.render);
      this.listenTo(this.collection,"error",this.error);
      this.render();
    },
    error: function(model,msg){
      alert(msg);
    },
    form: function() {
      return this.$(".create form");
    },
    create: function(evt) {
      evt.preventDefault();
      this.collection.create(toJSON(this.form()),{
        error: this.error,
        wait: true
      });
    },
    update: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var form = $(evt.currentTarget);
      var id = form.attr("data-id");
      this.collection.get(id).save(toJSON(form),{
        error:this.error
      });
    },
    remove: function(evt) {
      evt.preventDefault();
      var exercise = $(evt.currentTarget).parents(".exercise");
      var id = exercise.attr("data-id");
      this.collection.remove(id);
      exercise.fadeOut()
              .promise()
              .then(function(eles) { exercise.remove() });
    },
    template: _.template(templates.exercises),
    exercisePartial: _.template(templates.exercise),
    render: function() {
      var self;
      self = this;
      var markup = $(this.template({
        exercises: this.collection.toJSON(),
        exercisePartial: function(exercise) {
          return self.exercisePartial({exercise:exercise || {} })
        }
      }));
      this.collection.each(function(exercise) {
        var sel = "[data-id=" + exercise.id + "] select option[value=" + (exercise.get("type")) + "]";
        markup.find(sel).prop("selected",true);
      });
      this.$el.html(markup);
    }
  });
  
  ExerciseShow = View.extend({
    initialize: function() {
      this.render();
    },
    className: "exercise-detail row",
    attributes: {
      style: "display: none"
    },
    template: _.template(templates.show),
    render: function() {
      this.el.innerHTML = this.template({exercise: this.model.toJSON()});
    }
  });

  exercises = new Exercises;
  exerciseList = new ExerciseList({
    collection: exercises
  });
  var showView;
  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "list",
      "exercises/:id": "show"
    },
    list: function() {
      var fadeIn = function() {
        exerciseList.$el.fadeIn();
      };
      if(showView) {
        showView.$el.fadeOut(fadeIn);
        showView = false;
      } else {
        fadeIn();
      }
    },
    show: function(id) {
      exerciseList.$el.fadeOut(function() {
        if(showView) {
          showView.$el.remove();
        }
        showView = new ExerciseShow({
          model: exercises.get(id)
        });
        showView.$el.appendTo(document.body).fadeIn();
      });
    }
  });
  new AppRouter()
  $(function() {
    exerciseList.$el.appendTo($("#exercise_list"));
    exercises.fetch({
      success: function() {
        Backbone.history.start({pushState:false,root:""});
      }
    });
  });
})();

