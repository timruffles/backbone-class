var View = Backbone.View.extend({
  initialize: function(opts) {
    this.model.on("change",function() {
      
    },this);
    // this.model._events["change"].push(event)
    this.listenTo(this.model,"change",fn,ctx)
    this.stopListening()
    this.children = []
    this.navView = new NavView
    this.children.push(this.navView)
  },
  remove: function() {
    this.stopListening()
    _.invoke(this.children,"remove");
    this.$el.remove()
  }
})

var mustachetpl = "<div>{{ name }}</div>"
var el = Mustache.to_html(mustachetpl,model.attributes);

var underscoreTpl = "<div><%= model.get('name') %></div>"
var compiled = _.template(underscoretpl)
compile({model: model})

this.el.innerHTML = stringOfHtml


var View = Backbone.View.extend({
  initialize: function(opts) {
    opts = opts || {};
   // pre 1.1
   this.model
   this.collection
   this.el.href
   
   this.$("input[type=text]")
   // 1.1
   var user = opts && opts.user;
  }
})

Backbone.View.prototype.$ = function(query) {
  return $(query,this.el)
}


(function() {
  // definition
  function main(){ 
  }
  main();
})()
Backbone.Model.prototype.sync = function() { /* ... */}

var User = Backbone.Model.extend({
  sync: function(method) {
    if(method === "sync") return websocketSync.apply(null,arguments)
    return Backbone.sync.apply(null,arguments);
  }
});

var cruftyRestfulBackend = function(method,model,opts) {
  // format data for server
  var data = format(model.toJSON());
  var originalSuccess = opts.success;
  opts.success = function(resp) {
    var formatted = parseResponse(resp);
    originalSuccess(formatted);
  }
  
  function format() {
    
  }
  function parseResponse() {
    
  }
}


var User = (function() {
  // definition
  var User = Backbone.Model.extend();
  // setup
  
  return User;
})()

(function() {
  // definition
  var User = Backbone.Model.extend();
  // setup
  
  window.User = User;
})()


(function() {
  // definition
  User = Backbone.Model.extend();
  // setup
  
})()