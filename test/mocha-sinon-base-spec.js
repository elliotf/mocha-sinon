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

      chai.use(require('sinon-chai'));
      test(chai, subject);

    }());
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    test(chai, false);
  }
})(function(chai, subject){

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

  if (subject) {
    (function() {
      var sinon = require('sinon');

      describe("mocha-sinon on the backend", function() {
        var sandbox;

        beforeEach(function() {
          sandbox = sinon.sandbox.create();
        });

        afterEach(function(){
          sandbox.restore();
        });

        it("exports a function to register beforeEach/afterEach", function() {
          sandbox.spy(global, 'beforeEach');
          sandbox.spy(global, 'afterEach');
          sandbox.spy(global, 'before');
          sandbox.spy(global, 'after');

          expect(subject).to.be.a('function');

          subject();

          expect(global.beforeEach).to.have.been.called;
          expect(global.afterEach).to.have.been.called;
          expect(global.before).to.have.been.called;
          expect(global.after).to.have.been.called;
        });
      });
    })();
  }
}));
