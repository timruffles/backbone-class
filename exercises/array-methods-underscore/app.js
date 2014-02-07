console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);

var numbers = [1,23,4,35,35,45,46,6]
for(var sum = 0, i = 0, len = numbers.length;
     i < len;
     i++) {
       sum += numbers[i];
}

// forEach [A], fn
// map: [A], fn -> [B]
// reduce: [A], fn, b -> b
// every [A], fn -> boolean
// some [A], fn -> boolean

numbers.forEach(function(number) {
  console.log("I got a %d",number);
})

var squares = numbers.map(function(number) {
  return number * number
})
var users = [{name: "sue"},{name:"bob"}]
var squares = _.pluck(users,"name");

var sum = numbers.reduce(function(sum,el) {
  return sum + el
},0)
console.log(sum);
// in ECMAScript 6, becomes numbers.reduce((sum,el) => sum + el)

var users = new Backbone.Collection([
  new Backbone.Model({name: "sue"}),
  new Backbone.Model({name: "sarah"})
])

var standardUnderscore = _.pluck(users.models,"name");
var backboneCollection_ = users.pluck("name");










