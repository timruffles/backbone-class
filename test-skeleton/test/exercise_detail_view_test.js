
suite("ExerciseDetailView",function() {
  this.pending = true
  
  var view;
  var bus;
  beforeEach(function() {
    bus = _.extend({},Backbone.Events)
    view = new ExerciseDetailView({
      bus: bus,
      model: new Exercise({
        sets: 4,
        reps: 6
      })
    })
  })

  test("renders reps",function() {
    var reps = $(view.el).find(".reps").text()
    reps = parseInt(reps,10)
    assert.equal( view.model.get("reps"), reps )
    assert.equal( 1,
      $(view.el).find(".reps").length )
  })

  test("lets user edit reps",function() {
    var newVal = 12;
    $(view.el).find(".reps_input").val(newVal);
    $(view.el).find("form").submit();
    assert.equal( newVal, view.model.get("reps") );
  })


  test("event bus receives back when user clicks back",function() {
    var mockedBus = sinon.mock(bus);
    mockedBus.expects("trigger");

    $(view.el).find(".back").click();

    mockedBus.verify()
  })


})
