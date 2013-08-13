
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

  suite("calculations", function() {
    beforeEach(function() {
      exercise.set({reps: 5, sets: 5})
    })
    test("volume",function() {
      assert.equal( 25, exercise.volume() )
    })
    test("suggested % of RM",function() {
      assert.near( 0.95, exercise.suggestedRm(), 0.05, "rm not accurate" )
    })
  })

  // these tests are repetitive, how could we abstract?

})
