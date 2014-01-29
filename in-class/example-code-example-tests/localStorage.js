// constructor for localStorageSync, pass in storage object
// for testability
var LocalStorageSync = function(storage) {

  function publicApi(method,model,options) {
     // dispatch based on method
     publicApi[method](method,model,options)
  }

  // implementing verbs fairly simple in this case
  publicApi.read = function(method,model,options) {
    var store = storage[model.type + model.id]
    if(!store) return
    store = JSON.parse(store)
    return store
  }
  publicApi.save = function(method,model,options) {
    storage[model.type + model.id] = JSON.stringify(model.toJSON())
  }

  // return out publicApi - a single Backbone.sync compatible function
  return publicApi;
}

// useage: set sync on prototype, or even instance
var User = Backbone.Model.extend({
  sync: LocalStorageSync(localStorage)
})


