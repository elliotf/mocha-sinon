(function(){

function mochaSinon(sinon){
  if (typeof beforeEach !== "function") {
    throw "mocha-sinon relies on mocha having been loaded.";
  }

  beforeEach(function() {
    if (null == this.sinon) {
      if (sinon.createSandbox) {
        // Sinon 2+ (sinon.sandbox.create triggers a deprecation warning in Sinon 5)
        this.sinon = sinon.createSandbox();
      } else {
        this.sinon = sinon.sandbox.create();
      }
    } else {
      this.sinon.restore();
    }
  });

  after(function() {
    // avoid test pollution for the last test that runs
    if (this.sinon) {
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
  } else if (typeof require === "function") {
    var sinon = require('sinon');

    module.exports = function () {
      plugin(sinon);
    };

    plugin(sinon);
  } else {
    throw "We could not find sinon through a supported module loading technique.  Pull requests are welcome!";
  }
})(mochaSinon);

})();
