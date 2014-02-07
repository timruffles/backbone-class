console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);

var Exercise = Backbone.Model.extend({
  isAnExercise: true
});

var Exercises = Backbone.Collection.extend({
  model: Exercise
});

var exerciseList = new Exercises([
  {id: 5, name: "jumping"},
  new Exercise({id: 7, name: "swimming"})
]);

console.log("Converted object to model: .set is a %s",
  typeof exerciseList.get(5).set)
console.log("Converted object to right type of model",
  exerciseList.get(5).isAnExercise)
  
  
var exerciseListWithoutIds = new Exercises([
  {name: "jumping"},
  new Exercise({name: "swimming"})
]);

var anExerciseWithoutId = exerciseListWithoutIds.at(0);
var cid = anExerciseWithoutId.cid;
console.log("Can get model by .cid",
  anExerciseWithoutId === exerciseListWithoutIds.get(cid));

var ExerciseIdentifiedByName = Backbone.Model.extend({
  idAttribute: "name"
});
var exWithNameId = new ExerciseIdentifiedByName({
  name : "jumping"
})

console.log("idAttribute maps transparently to .id",
  exWithNameId.id);























  
  
  