console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);

var Exercise = Backbone.Model.extend({
  hello: function() {
    return "hi from my subclass";
  },
  myProperty: "is defined",
  validate: function(attrs) {
    var errors = [];
    var setsInvalid = isNaN(attrs.sets) ||
       attrs.sets > 20 || 
       attrs.sets < 1;
    if(setsInvalid) {
       errors.push({
         attribute: "sets",
         value: attrs.sets,
         type: "invalid-attribute"
       });
    }
    if(errors.length > 0) {
      return errors;
    }
  }
});

var exercise = new Exercise

console.log("I am an exercise, I say %s, I have a property '%s'",
  exercise.hello(),
  exercise.myProperty);

exercise.on("change:name",function(model,name) {
  console.log("Name changed to %s, from %s",name,
    model.previous("name"));
})

exercise.on("invalid",function(model,error) {
  console.log(error);
})
  

exercise.set("name","jumping");
exercise.set("name","running");



var saved = exercise.save();
console.log("saved %s",saved);
var validated = exercise.validate();
console.log("validate %s",validated)










