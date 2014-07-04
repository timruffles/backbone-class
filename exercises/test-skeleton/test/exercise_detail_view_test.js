
suite.only("ExerciseDetailView",function() {
  
  var view;
  beforeEach(function() {
    view = new ExerciseDetailView({
      model: new Exercise({
        name: "swimming"
      })
    })
  })
  
  test("renders exercise name",function() {
    
    view.render();
    

    
    assert.equal(view.$(".name").text(),
      view.model.get("name"));
    
  });
  
  test("triggers remove event on remove button clicked",function() {
    
    view.render();
    
    var called = false;
    view.on("remove",function() {
      called = true;
    })
    
    view.$(".remove").click();

    assert(called,"remove not called")
  });

});





