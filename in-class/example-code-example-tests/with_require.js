// this demonstrates two ways of getting common libraries into require.js code
// without lots of boiler plate: extending a prototype with all libraries, or 
// making a rolled up library file that exposes them all

// 1. Extending prototypes
// setup_view.js - relies on side-effects: changes existing data-structures
define(["vendor/backbone","vendor/jquery","vendor/underscore"],function(Backbone,$,_) {
  Backbone.View.prototype.$ = $
  Backbone.View.prototype._ = _
})
// main
require(["extend_libraries"],function(_e) {
});
// someview.js
define(["view"],function(View) {
  return View.extend({
    initialize: function() {
      this._ // access via prototype
    }
  })
})

// 2. Rolled-up library file
// best option for require.js - explicit deps
// util.js
define(["vendor/backbone","vendor/jquery","vendor/underscore"],function(Backbone,$,_) {
  return {
    $: $,
    _: _,
    Backbone: Backbone
  }
})
define(["util"],function(util) {
  return util.Backbone.View.extend({
    initialize: function() {
      util._ // access via helper library
    }
  })
})

// models/user.js
define(["util"],function(util) {

  var User = util.Backbone.Model.extend({
  })

  User.Collection = util.Backbone.Collection.extend({
    model: User
  })

  return User;
})

// main.js
require(["v/app_view","router"],function main(AppView,Router) {
  new Router
  var view = new AppView({
  })
  Backbone.history.start();
})
// <script src=require.js data-main=main></script>


// lazy-loading
define(["util"],function(util) {
  return util.Backbone.View.extend({
    showCharts: function() {
      this.displaySpinner()
      require(["v/chart_view"],function(ChartView) {
        this.show(ChartView)
      }.bind(this))
    }
  })
})





