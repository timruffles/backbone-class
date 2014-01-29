// class RedditView extends Backbone.View
var RedditView = Backbone.View.extend({
  events: {
    "click button": "renderName"
  },
  initialize: function() {
    this.listenTo(this.collection,"reset",this.render,this);
    this.collection.fetch({reset: true});
  },
  template: _.template("<% collection.each(function(s) { %><h2><%= s.get('title') %></h2><%}) %>"),
  render: function() {
    this.el.innerHTML = this.template(this.transform())
  },
  transform: function() {
    return {collection: this.collection};
  },
  renderName: function() {
  }
});


var redditSync = function(method,model,options) {
  if(method != "read") throw new Error("Only read implemented");
  $.ajax({
    dataType: "jsonp",
    url: "http://www.reddit.com/r/javascript.json?jsonp=?",
    success: function(data) {
      var cleaned = _.pluck(data.data.children,"data");
      options.success(cleaned);
    },
    error: options.error
  })
};

var RedditStories = Backbone.Collection.extend({
  sync: redditSync
});

var ExerciseListView = Backbone.View.extend({
});


var Exercise = Backbone.Model.extend({
});

function main() {

  var collection = new Backbone.Collection([
    {name: "tim"},
    {name: "jim"},
    {name: "kim"},
  ])

  var stories = new RedditStories;
  var mainView = new RedditView({
    collection: stories
  });
  document.body.appendChild(mainView.el);
}

main();
