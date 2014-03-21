(function(){

  // in reality this would be one class per file,
  // but for easier comparison with non_mvc.js 
  // here all classes, & the boot script, are together

  var Excercises, Exercise, ExerciseList, ExerciseShow, exerciseList, exercises, showView;
  var Model = Backbone.Model,
      View = Backbone.View,
      Collection = Backbone.Collection;

  // models 
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

  // views
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
      this.listenTo(this.collection,"add", this.render,this);
      this.listenTo(this.collection,"error",this.error,this);
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
      // once you're learned a bit more about backbone, you
      // should a problem in this function: are the responsibilities
      // of views & models correct?
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

  function toJSON(form) {
    return form.serializeArray().reduce(function(json,kv) {
      json[kv.name] = kv.value;
      return json;
    },{});
  }

  // define routes
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


  // here's where our app boots. This is the point
  // where we join up the global environment (global DOM, preloaded data etc)
  // with our modular components
  function boot() {

    new AppRouter()

    exercises = new Exercises;
    exerciseList = new ExerciseList({
      collection: exercises
    });

    exerciseList.$el.appendTo($("#exercise_list"));
    exercises.fetch({
      success: function() {
        Backbone.history.start({pushState:false,root:""});
      }
    });
  }

  $(boot);
})();

