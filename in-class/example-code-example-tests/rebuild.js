


// define our models + collections



// views
var View = Backbone.View;

// simple collection view
var ExerciseList = View.extend({
  initialize: function() {
    this.listenTo(this.collection,"add",this.renderNew,this);
    this.listenTo(this.collection,"remove",this.removeElement,this);
    this.children = {};
  },
  tagName: "ul",
  renderNew: function(model) {
    var view = new ExerciseShow({
      model: model
    })
    view.render()
    this.children[model.id] = view;
    this.el.appendChild(view.el);
  },
  removeElement: function(model) {
    var childView = this.children[model.id];
    if(childView) childView.remove();
    delete this.children[model.id];
  }
})

// item view - only worries about one model
var ExerciseShow = View.extend({
  initialize: function() {
    this.listenTo(this.model,"change",this.render,this);
  },
  tagName: "li",
  template: _.template("<p><%= model.get('name') %></p>"),
  // mustache:
  render: function() {
    this.el.innerHTML = this.template(this.model)
  }
})

// a collection view that doesn't use itemViews - will have to read/write model ids to DOM
var ExerciseListWithoutChildViews = View.extend({
  initialize: function() {
    this.listenTo(this.collection,"remove",this.removeElement,this);
  },
  tagName: "ul",
  template: _.template("<% collection.each(function(model) { ... }) %>"),
  removeElement: function(model) {
    this.$("[data-id=" + model.id + "]");
  }
});

// stage view responsible for managing child views
var StageView = View.extend({
  initialize: function() {
  },
  show: function(view) {
    if(this.view) {
      this.view.transitionOut().then(this.view.remove.bind(this.view)).then(function() {
        this.el.appendChild(view.el);
      }.bind(this))
    }
  }
});




var AppView = Backbone.View.extend({
  initialize: function() {

    this.stage = new StageView()
    this.$("#stage").replaceWith(this.stage.el)

  }
});


// /search  - responsibility of parent of search view
// /search/query?foo=bar - responsibility of the search

var SearchView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.pubSub,"route:search:specific",this.renderSearch,this);
  },
  remove: function() {
    this.stopListening( /* source */, /* event name */, /* function */, /* context */)
  }
});
