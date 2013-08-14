Marionette.Region.prototype.show = function(view) {
  this.ensureEl();

  var isViewClosed = view.isClosed || _.isUndefined(view.$el);

  var isDifferentView = view !== this.currentView;

  if (isDifferentView) {
    this.close();
  }

  // view.render();

  if (isDifferentView || isViewClosed) {
    this.open(view);
  }
  
  this.currentView = view;

  Marionette.triggerMethod.call(this, "show", view);
  Marionette.triggerMethod.call(view, "show");
};
