(function(){
 
  // model
  // - validation
  // - url function
  var Exercise = Backbone.Model.extend({
    url: function() {
      return this.isNew() ? "/exercises" : "/exercise" + this.id;
    },
    validate: function(attrs) {
      var errors = [];
      var invalidSets = isNaN(attrs.sets) || attrs.sets < 1 || attrs.sets > 20
      var invalidReps = isNaN(attrs.reps) || attrs.reps < 1 || attrs.reps > 20
      var invalidName = !attrs.name
      if(invalidName) errors.push({attribute: "name"})
      if(invalidSets) errors.push({attribute: "sets"})
      if(invalidReps) errors.push({attribute: "reps"})
      if(errors.length > 0) return errors;
    }
  })
  // collection
  // - url function
  Exercise.Collection = Backbone.Collection.extend({
    model: Exercise
  });
  
  // 10 mins
  
  // listView
  var ListViewHierarchical = Backbone.View.extend({
    initialize: function() {
      this.childViewsById = {};
      this.listenTo(this.collection,'add',this.add,this)
      this.listenTo(this.collection,'remove',this.removeChild,this)
      this.listenTo(this.collection,'reset',this.render,this)
      this.listenTo(this.collection,'sort',this.render,this)
    },
    tagName: "ul",
    ListItemView: function() { throw new Error("Define a list item constructor") },
    add: function(model) {
      var view = new this.ListItemView({model: model})
      view.render()
    console.log("added")
      this.$el.append(view.el);
      this.childViewsById[model.cid] = view
    },
    removeChild: function(model) {
      var view = this.childViewsById[model.cid]
      view.remove();
    },
    render: function() {
      console.log("render")
      _.each(this.childViewsById,function(view) {
        view.remove()
      })
      this.childViewsById = {}
      this.collection.each(this.add,this)
    },
    remove: function() {
      _.invoke(this.childViewsById,"remove");
      Backbone.View.prototype.remove.call(this);
    }
  })
  var ListItemView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.model,"change",this.render,this)
    },
    events: {
      "click .remove": "removeMe"
    },
    tagName: "li",
    render: function() {
      this.el.innerHTML = "<span>" +  this.model.get("name") + "</span>" 
        + "<button class=remove>X</button>"
        + "<a href='#exercises/" + this.model.cid + "'>Detail</a>";
    },
    removeMe: function() {
      this.model.collection.remove(this.model)
    }
  });

  var ExerciseListView = ListViewHierarchical.extend({
    initialize: function() {
      ListViewHierarchical.prototype.initialize.apply(
        this,arguments);
    },
    ListItemView: ListItemView
  })
  
  // detail View
  var DetailView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.model,"change",this.render,this)
    },
    render: function() {
      this.el.innerHTML = "<h1>" + this.model.get("name") + "</h1>" + "<a href='#'>Back</a>";
    }
  });
  
  // 10 mins
  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "list",
      "exercises/:id": "show"
    }
  });
  
  var AppView = Backbone.View.extend({
    initialize: function(opts) {
      this.router = opts.router;
      this.listenTo(this.router,"route:list",this.list,this);
      this.listenTo(this.router,"route:show",this.show,this);
      this.exercises = opts.exercises
    },
    switchView: function(to) {
      var el = this.el;
      if(this.currentView) {
        var old = this.currentView
        this.currentView.$el.fadeOut(function() {
          fadeIn();
          old.remove();
        });
      } else {
        fadeIn();
      }
      this.currentView = to;
      function fadeIn() {
        to.render();
        el.appendChild(to.el) 
        to.$el.fadeIn();
      }
    },
    list: function() {
      var newView = new ExerciseListView({
        collection: this.exercises
      });
      this.switchView(newView);
    },
    show: function(id) {
      var newView = new DetailView({
        model: this.exercises.get(id)
      });
      this.switchView(newView);
    }
  });
  
  // router
  
  function main() {
    var router = new AppRouter()
    
    var appView = new AppView({
      el: document.body,
      exercises: new Exercise.Collection([
        {id: 50, name: "jumping"},
        {id: 55, name: "jumping"}
      ]),
      router: router
    });

    Backbone.history.start({pushState:false,root:""});
  }
  
  // 10 mins
 
 
  $(main);
})();

