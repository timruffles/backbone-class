console.log("Backbone, jQuery, underscore",!!Backbone,!!jQuery,!!_);

var UserView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model,"request",this.renderLoading,this);
    this.listenTo(this.model,"sync",this.render,this);
  },
  events: {
    "change": "updatePreferences"
  },
  updatePreferences: function() {
    this.model.set("soundOn",
      this.$("input").prop("checked"));
    this.model.save();
  },
  renderSaving: function() {
    this.$el.html("Saving...");
  },
  renderLoading: function() {
    console.log("Loading")
    this.$el.html("Loading...");
  },
  render: function() {
    var checked = this.model.get("soundOn") ?
      "checked" : "";
    this.$el.html(
      "Sound: <input type=checkbox " + checked + ">"
    );
  }
});

var User = Backbone.Model.extend({
  sync: preferencesSync
})

function preferencesSync(method,model,options) {
  model.trigger("request",model)
  setTimeout(function() {
    if(method === "read") {
      options.success({
        soundOn: localStorage.soundOn === "true"
      })
    } else if (method === "create" || 
      method === "update") {
        localStorage.soundOn = !!model.get("soundOn")
    } else {
      throw new Error(method + " not implemented");
    }
    model.trigger("sync",model)
  },500);
}

var user = new User
var view = new UserView({model: user})
view.render()
document.body.appendChild(view.el)

user.fetch()





