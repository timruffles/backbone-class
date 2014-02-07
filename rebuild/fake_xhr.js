(function(){
  var ids = 1;
  $.ajax = function(opts) {
    console.log("Ajax request",opts);
    var p = $.Deferred();
    var type = opts.type.toUpperCase();
    var respond = function(response) {
      setTimeout(function() { 
        p.resolve(response);
        opts.success && (opts.success(response));
      },700);
    };
    var error = function(response) {
      setTimeout(function() { p.reject(response || "404 - type/path unknown") },700);
      opts.error && (opts.error(response));
    };
    switch(true) {
      case /^\/exercises/.test(opts.url):
        switch(type) {
          case "GET":
            respond([{
             id: 1,
             type: 'deadlift',
             reps: 6,
             sets: 5
            }]);
            break;
          case "POST":
            ids += 1;
            var data = JSON.parse(opts.data);
            data.id = ids;
            respond(data);
            break;
          default:
            error();
        }
        break;
      case /\/exercise\/\d+/.test(opts.url):
        switch(type) {
          case "PUT":
            respond({});
            break;
          case "DELETE":
            respond({});
            break;
          default:
            error();
        }
        break;
      default:
        error();
    }
    return p;
  };
})();
