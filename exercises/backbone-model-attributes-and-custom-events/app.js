console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);


var exercise = new Backbone.Model
exercise.set("name","jumping")
console.log("We can read name from model.attributes: %s",
  exercise.attributes.name)
  
exercise.on("setFinished",function(model,something) {
  console.log("I heard a custom event");
})

exercise.trigger("setFinished",exercise,{hello: 1})