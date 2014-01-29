// shim configs allow non-AMD deps, even those with their own non-AMD deps
var require = {
  shim: {
    jquery: {
      exports: "jQuery",
    },
    underscore: {
      exports: "_",
    },
    backbone: {
      exports: "Backbone",
      deps: ["underscore","jquery"]
    }
  }
}


require(["underscore"],function(_) {
})


// pseudo-code implementation of shims:
// append script tag with correct
// poll / listen to onload for global
// require.modules[moduleName] = window[shim.exports]
