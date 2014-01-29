var User = Backbone.Model.extend({
  initialize: function() {
    this.on("change:id",function(id) {
      if(id != null) this.trigger("login")
    },this)
  }
});

var UserView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.options.pubSub,"login",this.renderSuccess,this);
  },
  render: function() {
    this.el.innerHTML = "<a class=back></a>";
  },
  events: {
    "click .back": "back"
  },
  renderSuccess: function() {
    this.$el.addClass("success")
  },
  back: function() {
    this.options.pubSub.trigger("back")
  }
});


var Untestable = Backbone.View.extend({
  someAsyncyStuff: function() {
    this.model.fetch({
      success: function(respA) {
        this.another.fetch({
          success: function(respB) {
            // most common hard to 
            // refactor out nesting
            third(respA,respB)
          }
        })
      }
    })
  }
})

var Testable = Backbone.View.extend({
  someAsyncyStuff: function() {
    this.model.fetch({
      success: this.stepA
    })
  },
  stepA: function(respA) {
    this.another.fetch({
      success: 
        this.third.bind(this,respA)
    })
  },
  third: function(respA,respB) {
    // happily use both
  }
})


var calledCorrectly = false
var db = {save: function(argA) {
  if(argA.a === 1) calledCorrectly = true;
  return mockData
})


db.save({a:1})

assert(calledCorrectly)




function User() {
}
User.prototype.DB = RealDatabaseConstructor;
User.prototype.update = function() {
  this.db = new this.DB;
}


try {
  User.prototype.DB = StubbedDatabase;


  // unit test

} finally {
  User.prototype.DB = RealDatabaseConstructor;
}

withStubs([
  [User.prototype,"DB",StubbedDatabase]
],function() {
  // unit tests
})
