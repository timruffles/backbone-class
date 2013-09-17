suite("localStorageSync",function() {

  var model
  var ModelWithLocalStorage
  beforeEach(function() {
    localStorage.clear()
    ModelWithLocalStorage = Backbone.Model.extend({
      sync: Backbone.localStorageSync
    })
    model = new ModelWithLocalStorage({
      id: 10,
      name: "bob"
    })
    model.sync = Backbone.localStorageSync
  })
  
  test("can read & write", function() {
    model.save()
    var newInstance = new ModelWithLocalStorage({id: 10})
    newInstance.fetch()
    assert.equal( model.get("name"), newInstance.get("name") )
  })

  test("can update", function() {
    var newInstance = new ModelWithLocalStorage({id: 10})
    model.save()
    model.set("name","tom")
    model.save()
    newInstance.fetch()
    assert.equal( "tom", newInstance.get("name") )
  })

  test("can update partially", function() {
    var newInstance = new ModelWithLocalStorage({id: 10})
    var thirdInstance = new ModelWithLocalStorage({id: 10})
    model.save()
    newInstance.save()
    thirdInstance.fetch()
    assert.equal( model.get("name"), thirdInstance.get("name") )
  })

  test("can delete", function() {
    var newInstance = new ModelWithLocalStorage({id: 10})
    model.save()
    model.destroy()
    newInstance.fetch()
    assert.isUndefined( newInstance.get("name") )
  })


})
