// side-effects

// 'pure' or effect-free: just transform data


function square(x) {
  // nothing changed - pure transform
  return x * x
}

// side-effects: changes data-structures, does input out etc
function talk() {
  // side-effect: blocking UI interaction
  alert("hello")
}
function square(object) {
  // has a side-effect: object has been changed for everybody
  object.value *= object.value
}
