// Persistance - handling with sync
// example api response with a nested object. by default it'll
// emerge as just that - a js object. If we need it to be a Model
// we'll have either to handle it in Model.parse (which mixes
// persistance with model and only handles a specific implementation)
// or handle it in a modified Sync.
var apiResponse = {
  user: {
    account: {
      name: "account 54"
    }
  }
}

// example of problem:
var user = new User;
user.fetch() // user.sync("read") -> user.set(user.parse(response))


// user.attributes -> {account: {}}
user.get("account") // {}
user.get("account").get("name") // No method error: get()

// solution - via parse
// mixes up our concerns: if we have another sync method we'll have to make
// this more complex
var Account = Backbone.Model.extend({
  parse: function(resp) {
    resp.account = new Account(resp.account)
    return resp
  }
})


// solution - via custom sync
var User = Backbone.Model.extend({
  type: "User",
  sync: CustomSync
})
var Account = Backbone.Model.extend({})



// custom sync implementation that uses reflection
// on model.type to find  out where to store and how.
// keeps neat separation between persistance and model 
// concerns
var CustomSync = function(method,model,options) {
  var url = model.type.toLowerCase() + "/" + model.id

  $.ajax({
    data: parsers[model.type].toServer(model),
    success: parsers[model.type].fromServer
  })
}

// we can do similar things for each persistance source -
// it's likely that they'll have different parsing requirements.
var parsers = {
  User: {
    toServer: function(model) {
    },
    fromServer: function(resp) {
      resp.account = new Account(resp.account)
      return resp
    }
  }
}



        
