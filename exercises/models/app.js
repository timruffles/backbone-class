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

exercise.validate();
exercise.set({name: "foo"},{validate: true});
exercise.save();

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

var Model = Backbone.Model;

Model.prototype.aliasEvent = function(event,newName) {
  this.on(event,function() {
    this.trigger(newName)
  },this);
}

var User = Model.extend({
  initialize: function() {
    this.aliasEvent("change:id","loginStatus");
  },
  idAttribute: "email"
})
var user = new User({email: "bob@bob.me"});
console.log("Custom id works: %s",user.id === user.get("email"));

// make a collection of your models
// - define sub class
// - add plain data or model subclasses
// - listen to events - 'add'


Exercise.Collection = Backbone.Collection.extend({
  model: Exercise,
  findByName: function(name) {
    return this.findWhere({name: name});
  }
});

function exportExamples() {
  // browserify
  module.exports = Exercise;
  // requireJs
  return Exercise;
}

exercise.attributes;

var exerciseList = new Exercise.Collection([
  new Exercise({name: "jumping"}),
  {name: "swimming"}
]);

exerciseList.models;

console.log(
  "first %s last %s",
  exerciseList.at(0).get("name"),
  exerciseList.at(exerciseList.length - 1).get("name"));
  
// has underscore's methods
console.log(
  "first %s last %s",
  exerciseList.first().get("name"),
  exerciseList.last().get("name"));

console.log(exercise,exerciseList);

function fn() {}

// for every element in a collection, do something
for(var i = 0, len = exerciseList.length; i < len; i++) {
  var exercise = exerciseList.at(i);
  fn(exercise)
}
exerciseList.forEach(function(element) {
  fn(exercse)
});
// for every element in a collection, get something out
var names = [];
for(var i = 0, len = exerciseList.length; i < len; i++) {
  var exercise = exerciseList.at(i);
  names.push(exercise.get("name"));
}
var namesPlucked = exerciseList.pluck("name");
// for every element in a collection, make something
var exerciseCache = [];
for(var i = 0, len = exerciseList.length; i < len; i++) {
  var exercise = exerciseList.at(i);
  exerciseCache.push({
    cid: exercise.cid
  });
}
var namesMapped = exerciseList.map(function(exercise,index) {
  return {
    cid: exercise.cid
  }
})

// only give me certain elements in a collection
var startsWithJ = [];
for(var i = 0, len = exerciseList.length; i < len; i++) {
  var exercise = exerciseList.at(i);
  if(exercise.get("name")[0] === "j") {
    startsWithJ.push({
      cid: exercise.cid
    });
  }
}
// squash collection down into one object
var totalWork = 0;
for(var i = 0, len = exerciseList.length; i < len; i++) {
  var exercise = exerciseList.at(i);
  totalWork += exercise.get("reps") * exercise.get("sets");
}

var users = exerciseList;

var userWithEmail = users.find(function(user) {
  return user.get("email") === "something";
})


// some -> true/false any object passes test
// every
// filter/reject













