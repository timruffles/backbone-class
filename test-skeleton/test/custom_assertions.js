chai.use(function(chai,util) {
  // add the assertion to the Assertion object
  chai.Assertion.addMethod('validationErrorFor', function (field) {
    var model = this._obj;
    var msg = "Expected '" + field + "' to be";
    var posMsg = msg + " invalid";
    var negMsg = msg + " valid";
    if(!this.negate) {
      this.assert(
        model.validationError,
        posMsg + ", but there was no `validationError` present"
      )
    }
    this.assert(
      model.validationError[field] != null,
      posMsg,
      negMsg
    )
  });
  // write a wrapper for the `assert` API
  chai.assert.validationErrorFor = function(model,field) {
    new chai.Assertion(model).to.have.validationErrorFor(field)
  }
})
