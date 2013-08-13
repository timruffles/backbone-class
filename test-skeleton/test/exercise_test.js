
suite("Exercise",function() {

  var exercise;
  beforeEach(function() {
    exercise = new Exercise()
  })

  test("validates reps", function() {
    exercise.set("reps",0)
    exercise.isValid()

    assert.ok( exercise.validationError )
  })

  test("validates sets", function() {
    exercise.set("sets",0)
    exercise.isValid()

    assert.ok( exercise.validationError )
  })

  test("validates type", function() {
    // write test to expect a validation
  })

  // these tests are repetitive, how could we abstract?

})
