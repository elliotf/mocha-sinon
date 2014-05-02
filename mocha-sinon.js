(function(){

function mochaSinon(sinon){
  if (typeof beforeEach !== "function") {
    throw "mocha-sinon relies on mocha having been loaded.";
  }

  beforeEach(function() {
    if (null == this.sinon) {
      this.sinon = sinon.sandbox.create();
    }
  });

  before(function() {
    if (null == this.sinon) {
      this.sinon = sinon.sandbox.create();
    }
  });

  afterEach(function() {
    if (this.sinon && 'function' === typeof this.sinon.restore) {
      this.sinon.restore();
    }
  });

  after(function() {
    if (this.sinon && 'function' === typeof this.sinon.restore) {
      this.sinon.restore();
    }
  });
}

(function(plugin){
  if (
    typeof window === "object"
    && typeof window.sinon === "object"
  ) {
    plugin(window.sinon);
  } else if (typeof require === "function" && typeof window === 'undefined') {
    var sinon = require('sinon');

    module.exports = function () {
      plugin(sinon);
    };

    plugin(sinon);
  } else {
    throw "This module loading schema is unsupported.  Pull requests are welcome!";
  }
})(mochaSinon);

})();

