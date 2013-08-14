// console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);
;(function(){
	// debugger
	
	var Exercise = Backbone.Model.extend({

		validate: function(attrs){
			//attrs.sets, attrs.reps

			var errors = [];
			if( attrs.reps < 1 || attrs.reps > 20 ) { errors.push("Reps invalid!") };
			if( attrs.type.length < 1 || attrs.type.length > 140 ) {
				errors.push({
					field: "type",
					message: "Need a valid name"
				})
			};
			if (errors.length > 0){
				return errors;
			}
	
		}
	});

	Exercise.Collection = Backbone.Collection.extend({
		model: Exercise,
		url: "/exercises"
	});

	var ExerciseListItemView = Backbone.Marionette.ItemView.extend({
		className: "exercise-item",
		events: {
			"click .remove":"removeItem"
		},
		render: function(){
			this.$el.append("<h1>" + this.model.get("type") + "</h1><a class='remove'>Remove</a>");
		},
		removeItem: function(event){
			// removes model from collection
			this.model.collection.remove(this.model);
		}
	});

	var ExerciseListView = Backbone.Marionette.CollectionView.extend({
		className: "exercise-list",
		renderLoading: function(){
			this.$el.prepend('<span class="loading">Loading...</span>');
		},
    itemView: ExerciseListItemView,
		clearLoading: function(){
			this.$('.loading').fadeOut(function(){ this.remove()});
		}
	});


	//form view
	//give the form view our collection
	//when the form view is submited, add the new exercise to collection #add()

	var ExerciseFormView = Backbone.View.extend({

		initialize: function(options){
			
			this.render();

		}, events: {
			"submit":"submitted"
		},

		tagName: "form",
		submitted: function(event){
			event.preventDefault();
			var val = this.$('input').val();
			var model = new Exercise({type: val});
			if(model.isValid()){
				this.collection.create(model,{wait: true});
			} else {
				console.error(model.validationError);
			}
		},
		render: function(){
			// this.el, this.$el, this.$()
			this.$el.html("<input type='' name='' /><button>Add</button>")
		}

	});

	var ExerciseDetailsView = Backbone.View.extend({
		initialize: function(options) {
			this.render()
		},
		className: "exercise-item",
		render: function(){
			this.$el.append("<h1>" + this.model.get("type") + "</h1><br/>Sets: " + this.model.get("sets") + "<br/>Reps: " + this.model.get("reps"));
		},
		removeItem: function(event){
			// removes model from collection
			this.model.collection.remove(this.model);
		}
	});

  var HomeView = Backbone.View.extend({
		initialize: function() {
			var exerciseList = new ExerciseListView({
				collection: this.collection
			});
			var exerciseForm = new ExerciseFormView({
				collection: this.collection
			});
			this.el.appendChild(exerciseList.el);
			this.el.appendChild(exerciseForm.el);
    }
  })

	var AppView = Backbone.View.extend({
		initialize: function() {
			this.exercises = new Exercise.Collection();
      this.exercises.fetch();

      this.stage = new Backbone.Marionette.Region({
        el: document.createElement("div")
      })
      this.$el.append(this.stage.el)
		},
		home: function() {
			this.showExerciseList();
		},
		showExerciseList: function() {
      var homeView = new HomeView({
        collection: this.exercises
      });
      this.stage.show(homeView);
		},
		showExercise: function(id) {
			//console.log("Show exercise ",id);
			// get exercise from collection
			var item = this.exercises.get(id);
			if (!item) {
				return this.showError({message:'No such exercise exists'})
			}
			var exerciseDetails = new ExerciseDetailsView({
				model: this.exercises.get(id)
			});
      this.stage.show(exerciseDetails);
		},
		showError: function(err) {
			console.log(err.message);
		}
	});

	var AppRouter = Backbone.Router.extend({
		initialize: function(opts) {
			this.appView = opts.appView
		},
		routes: {
			"": "home",
			"exercise/:id": "exercise",
			"*path": "unknown"
		},
		home: function() {
			this.appView.home()
			//this.appView.showExercise(parseInt(1,10))
		},
		exercise: function(id) {
			this.appView.showExercise(parseInt(id,10))
		},
		unknown: function(path) {
			this.appView.showError({message: "I have no idea what '" + path + "' means"})
		}
	});

	/*var user = new User();
	user.get('loggedIn');
	user.fetch();*/

	function init(){
		//specific dom elements will be used
		console.log("start boot");

		var rootEl = document.body;
		var app = new AppView({
			el: rootEl
		});
		var router = new AppRouter({
			appView: app
		});
		Backbone.history.start();

		console.log("finish boot");
	}

	init();

})();
