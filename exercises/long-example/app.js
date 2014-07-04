console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);
// errors.js
var ERRORS = {
  // use a function rather than value to turn mistyped or missing
  // constant names into run-time errors
  MISSING: function() { return "missing" },
}


var CoffeeOrder = Backbone.Model.extend({
  initialize: function(attrs) {
  },
  validate: function(attrs) {
    var errs = []
    if(!attrs.name) {
      errs.push({ attribute: "name", error: ERRORS.MISSING() })
    }
    // checking for non-varying 'variable'
    if(attrs.isCoffee !== this.get("isCoffee")) {
      errs.push({ attribute: "name", error: ERRORS.IS_CONSTANT() })
    }
    if(errs.length > 0) {
      return errs;
    }
  },
  // make set validate by default
  //set: function(attrs,opts) {
  //  return CoffeeOrder.__super__.set.call(this,attrs,_.defaults({validate: true},opts));
  //}
},{
  // class specific errors
  ERRORS: {
    TOO_WEAK: "watery",
  },
});


CoffeeOrder.Collection = Backbone.Collection.extend({
  model: CoffeeOrder,
});

// define view subclass
var CoffeeOrderEditor = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model,"change:name",this.renderName,this);
  },
  tagName: "form",
  // listen for an input event
  events: {
    "input": "edited",
  },
  edited: function(event) {
    this.model.set({name:this.$("input").val()});
  },
  // define a render method 
  render: function() {
    this.el.innerHTML = "<input><p>Name: <span class=name></span></p>"; 
    this.$("input").val(this.model.get("name"));
    this.renderName();
  },
  // feel free to have multiple render methods - if you need to avoid
  // re-writing the whole of a view's el via template etc
  renderName: function() {
    this.$(".name").text(this.model.get("name"));
  }
});


main();


function main() {

  var coffee = new CoffeeOrder({name: "flat white",foo:"bar"});

  var view = new CoffeeOrderEditor({
    model: coffee,
  });

  // views don't do initial render themselves, nor attach themselves to DOM
  // this is a consequence of "views only know about their el and immediate child views"
  view.render();
  document.body.appendChild(view.el);



}

function old() {
  coffee.on("invalid",function(model,errors) {
    console.log("errors '%s'",JSON.stringify(errors));
  })
  var valid = coffee.set({name: false});
  console.log(valid);


  coffee.on("change:name",function(model,newName) {
    console.log("name changed to '%s'",newName);
  })
  coffee.on("change",function(model) {
    console.log("model changed '%s'",model.cid);
  })
  coffee.set({name: "mocha"});

  var coffees = new CoffeeOrder.Collection([
    {name : "mocha"},
    new CoffeeOrder({name : "macciato"}),
  ])

}
