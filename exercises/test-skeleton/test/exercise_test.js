
suite("Exercise",function() {

  var exercise;
  beforeEach(function() {
    exercise = new Exercise()
  })

  test("validates reps", function() {
    exercise.set("reps",0)
    exercise.isValid()

    assert.validationErrorFor( exercise, "reps" )
  })

  test("validates sets", function() {
    exercise.set("sets",0)
    exercise.isValid()

    assert.validationErrorFor( exercise, "sets" )
  })

  test("validates type", function() {
    // write test to expect a validation
  })

  suite("calculations", function() {
    beforeEach(function() {
      exercise.set({reps: 5, sets: 5})
    })
    test("volume",function() {
      assert.equal( 25, exercise.volume() )
    })
  })

  // these tests are repetitive, how could we abstract?

})
