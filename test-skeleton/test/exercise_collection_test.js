
suite("ExerciseCollection",function() {
  
  var exercises;
  beforeEach(function() {
    exercises = new Exercise.Collection([
      {reps: 5, sets: 6, id: 1},
      {reps: 4, sets: 8, id: 2}
    ])
  });

  test("can initialize",function() {
  })

  test("keeps sorted by suggestedRmPercent",function() {
    exercises.each(function(exercise,index) {
      var stubbed = sinon.stub(exercise,"suggestedRmPercent");
      stubbed.returns(index / exercises.length)
    })

    exercises.sort();

    assert.equal( 2, exercises.at(0).id );
  });


})
