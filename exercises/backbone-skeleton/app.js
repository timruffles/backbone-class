console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);

// define a model subclass
// - put a validate method on it
// - validate(attrs) -> truthy = error, your choice on what to return

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

// make new instances
// - giving it attributes in constructor
// - define an initialize and see arguments
// - set/get
// - on("invalid"), on("change"), on("change:SOME_ATTR");


var exercise = new Exercise({
  sets: 20,
  reps: 20,
  name: "jumping"
});

console.log("name is %s",exercise.get("name"));

exercise.on("change",function(model) {
  console.log("Model %s changed",model.cid)
});

exercise.on("change:name",function(model,newVal) {
  console.log("name was %s now %s",
    model.previous("name"),
    newVal);
});

exercise.set({name: "swimming"});

exercise.on("loggedIn",function(model) {
  console.log("Heard custom event from %s",
  model.cid);
})
exercise.trigger("loggedIn",exercise);






