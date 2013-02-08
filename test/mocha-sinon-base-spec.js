(function(test){
  if (
    typeof require === "function"
    && typeof exports === "object"
    && typeof module === "object"
  ) {
    // NodeJS
    (function(){
      var chai = require('chai');
      require('../mocha-sinon');
      test(chai, true);

    }());
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    test(chai, false);
  }
}(function(chai){

  var expect = chai.expect;
  var someGlobal = {};
  someGlobal.someFunction = function() {
    return "someGlobal's function";
  };

  var someGlobalFunction = function() {
    return "someGlobalFunction";
  };

  describe("mocha-sinon", function() {
    it("exposes sinon via the mocha context object", function() {
      expect(this.sinon).to.exist;
      expect(this.sinon.spy).to.be.a('function');
    });

    it("allows use of sinon to spy on globals", function() {
      this.sinon.stub(someGlobal, 'someFunction').returns("OHAI. IMMA SPAI!");
      expect(someGlobal.someFunction()).to.equal("OHAI. IMMA SPAI!");
    });

    it("cleans up spies after each spec", function() {
      expect(someGlobal.someFunction()).to.equal("someGlobal's function");
    });
  });
}));
