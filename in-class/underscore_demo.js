

_.each([1,2,3,4,5],function(n,index) {
  console.log(n)
});
_.each([1,2,3,4,5],(n) => console.log(n))
_.each({a:1,b:3,c:3},function(val,key) {
  console.log(val)
});

var users = [{name: "A"},{name: "b"}];
var names = [];
for(var i = 0, len = users.length; i < len; i++) {
  var el = users[i];
  names.push(el.name);
}
// [a] -> [b]
var usernames = _.map(users,function(user) { return user.name })


  function map(xs,fn) {
    xs.reduce(function(list,el) {
      return list.concat([fn(el)])
    },[])
  }



var obj = { name: "barry" }
var child = Object.create(obj);

for(var prop in child) {
  if(!child.hasOwnProperty(prop)) return
  // code you'd want to write
}


[].forEach(function(el,index) {
})
$.each([1,2,3,4],function(index,el) {
})

var numbers = [1,23,4,56];
var sum = 0;
for(var i = 0, len = numbers.length; i < len; i++) {
  var el = numbers[i];
  sum += el;
}

// [a] -> a
// [] -> singleThing
var sumOfAges = _.reduce(numbers,((sum,el) => sum + el.age),0)
