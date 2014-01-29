(function() {
  // elements
  var list, form, exerciseEl;

  var exerciseElement = function() {
    return $('<li class="exercise"></li>').append(exerciseEl.clone());
  };

  var validateExercise = function(attrs) {
     attrs.sets = parseInt(attrs.sets)
     attrs.reps = parseInt(attrs.reps)
     var errors = []
     if(attrs.sets > 20 || attrs.sets < 1) errors.push("sets must be between 1-20");
     if(attrs.reps > 20 || attrs.reps < 1) errors.push("reps must be between 1-20");
     if(errors.length > 0) {
       return "Exercise item invalid: " + errors.join(" and ") + ".";
     }
  };

  var showErrors = function(errors) {
    alert(errors);
  }

  var addExercise = function(exercise) {
    var el = exerciseElement().attr('data-id',exercise.id);
    el.find('[name=reps]').attr('value',exercise.reps);
    el.find('[name=sets]').attr('value',exercise.sets);
    el.find('option[value='+exercise.type+']').attr('selected',true);
    list.prepend(el);
  };

  var toJSON = function(form) {
    return form.serializeArray().reduce(function(json,kv) {
      json[kv.name] = kv.value;
      return json;
    },{});
  };

  $(function() {
    // pointers to existing UI
    list = $('#exercises');
    form = $('.exercise-form');

    // used for new exercises
    exerciseEl = $("<div>").append(form.clone()).append($('<div class="large-2 columns without-label"><button class="remove small button alert">Remove</button></div>'));

    // ui handlers
    list.delegate('.exercise .remove','click',function(evt) {
      var exercise = $(evt.target).parents(".exercise");
      exercise.fadeOut()
              .promise()
              .then(function(eles) { exercise.remove() });
      $.ajax({
        url: '/exercise/' + exercise.attr("data-id"),
        type: 'DELETE'
      }).then(function() {},function() {/* error handling */})
    });
    // create handler
    form.submit(function(evt) {
      evt.preventDefault();
      var data = toJSON(form);
      var errors = validateExercise(data);
      if(errors) {
        return showErrors(errors)
      }
      $.ajax({url:'/exercises',type:"POST",data:JSON.stringify(data)}).then(addExercise);
    });
    // update handler
    list.on("submit","form",function(evt) {
      evt.preventDefault();
      var form = $(evt.currentTarget);
      var data = toJSON(form);
      var errors = validateExercise(data);
      if(errors) {
        return showErrors(data)
      }
      var id = form.parents(".exercise").data("id");
      $.ajax({
        url: '/exercise/' + id,
        data: JSON.stringify(data),
        type: 'PUT'
      });
    });
  });

  // get started with AJAX asap, no need to wait for DOM
  $.ajax({url:'/exercises',type: 'get'}).then(function(exercises) {
    _.each(exercises,addExercise);
  },'json');
})();


