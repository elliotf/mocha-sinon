((function(test){
  if (
    typeof require === "function"
    && typeof exports === "object"
    && typeof module === "object"
  ) {
    // NodeJS
    (function(){
      var chai    = require('chai');
      var subject = require('../mocha-sinon');

      test(chai, subject);

    }());
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    test(chai);
  }
})(function(chai){
  var expect;

  // Purposefully leaky fixture data, to be able to test mocha-sinon's cleanup
  // Normally you want to set your fixture data in a beforeEach
  var someGlobal = {
    someFunction: function() {
      return "someGlobal's function";
    },
  };

  beforeEach(function() {
    expect = chai.expect;
  });

  describe("mocha-sinon", function() {
    it("exposes sinon via the mocha context object", function() {
      expect(this.sinon).to.exist;
      expect(this.sinon.spy).to.be.a('function');
    });

    it("allows use of sinon to spy on globals", function() {
      this.sinon.stub(someGlobal, 'someFunction').returns("OHAI. IMMA SPAI!");
      expect(someGlobal.someFunction()).to.equal("OHAI. IMMA SPAI!");
    });

    it("automatically cleans up spies after each spec", function() {
      expect(someGlobal.someFunction()).to.equal("someGlobal's function");
    });
  });
}));
