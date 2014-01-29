

describe("User",function() {
  it("fires login after id",function() {
    var spy = jasmine.createSpy();

    var user = new User
    user.on("login",spy)

    user.set("id",1)

    expect(spy.callCount).toBe(1);
  })
});


function newPubSub() {
  return _.extend({},Backbone.Events)
}


describe("UserView",function() {
  var pubSub;
  var view;
  beforeEach(function() {
    pubSub = newPubSub()
    view = new UserView({pubSub: pubSub})
  })

  it("responds correctly to login",function() {
    pubSub.trigger("login")
    expect(view.$el.hasClass("success")).toBe(true)
  })

  it("publishes back correctly",function() {
    var spy = jasmine.createSpy();
    pubSub.on("back",spy)

    view.render()
    view.$(".back").click();

    expect(spy.callCount).toBe(1);
  })

  describe("login behaviour",function() {
    var view
    beforeAll(function() {
      view = new View
    })

    it("works correctly in way A",function() {
      expect(view.x).toBe(y)
    })
    it("works correctly in way B",function() {
      expect(view.z).toBe(a)
    })
  })
});


describe("smoke test",function() {

  var appView;

  beforeAll(function() {
    appView = new AppView({pubSub: pubSub})
    createFakeServer()
  })

  it("creates new entry when 'play' is clicked",function(done) {
    appView.$(".enter").click();

    setTimeout(function() {
      assert(appView.$el.contains(".enter_screen"))
      done()
    },0)

  })
})
