console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);

var Exercise = Backbone.Model.extend({
  validate: function(attrs) {
    var errors = [];
    if(typeof attrs.sets != "number"
       || attrs.sets > 20 || attrs.sets < 1) {
         var error;
         if(typeof attrs.sets != "number") {
           error = "wrong-type"
         }
         if(!error && attrs.sets > 20) {
           error = "too-high"
         }
         if(!error && attrs.sets < 1) {
           error = "too-low"
         }
         errors.push({
           attribute: "sets",
           error: error
         });
    }
    if(errors.length > 0) {
      return errors;
    }
  }
});

// view form, classname


var ExerciseFormView = Backbone.View.extend({
  tagName: "form",
  className: "exercise-form",
  template: _.template($("#exercise-tpl").html()),
  events: {
    "input [name=name]": "changeName"
  },
  changeName: function(event) {
    this.model.set("name",event.target.value);
  },
  render: function() {
    // <h1><%= model.get("name") %></h1>
    // in underscore's template means insert name into template
    this.el.innerHTML = this.template(this)
  }
});

var ExercisePreview = Backbone.View.extend({
  className: "exercise-preview",
  template: _.template($("#preview-tpl").html()),
  initialize: function() {
    this.model.on("change:name",this.render,this);
  },
  render: function() {
    // <h1><%= model.get("name") %></h1>
    // in underscore's template means insert name into template
    this.el.innerHTML = this.template(this)
  }
});

var exercise = new Exercise;

var exerciseForm = new ExerciseFormView({
  model: exercise
});
var exercisePreview = new ExercisePreview({
  model: exercise
})

console.log("form tag name: %s",exerciseForm.el.tagName)

// render - the el is now presenting the data
exerciseForm.render();
// actually attach to DOM so user can see it
exerciseForm.$el.appendTo(document.body);

exercisePreview.render();
exercisePreview.$el.appendTo(document.body);








