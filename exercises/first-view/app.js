console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);


var ExerciseView = Backbone.View.extend({
  tagName: "p",
  className: "created-by-backbone"
});

var el = document.createElement("ul");

var viewA = new ExerciseView({})
var viewB = new ExerciseView({el: el})

console.log("auto created el",viewA.el.outerHTML)
console.log("supplied el",viewB.el.outerHTML)

document.body.appendChild(viewA.el);
