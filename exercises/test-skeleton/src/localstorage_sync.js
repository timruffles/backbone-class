Backbone.localStorageSync = function(method,model,options) {

  switch(method) {
    case "read":
      var stored = localStorage[model.id]
      if(stored) {
        return options.success(JSON.parse(stored));
      }
      break;
    case "update":
    case "patch":
      var toStore = model.toJSON();
      var stored = localStorage[model.id]
      if(stored) {
        toStore = _.extend(JSON.parse(stored),toStore);
      }
      localStorage[model.id] = JSON.stringify(toStore)
      break;

    case "delete":
      delete localStorage[model.id]
      break;

    default:
      throw new Error("No idea how to " + method);
  }

}
