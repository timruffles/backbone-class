window.assert = chai.assert;
mocha.setup('tdd')

beforeEach(function() {
  this.sinon = sinon.sandbox.create();
});

afterEach(function(){
  this.sinon.restore();
})
