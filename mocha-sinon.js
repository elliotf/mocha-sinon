(function(plugin){
  if (
    typeof window === "object"
    && typeof window.sinon === "object"
  ) {
    plugin(window.sinon);
  } else if (typeof require === "function"){
    var sinon = require('sinon');
    plugin(sinon);
  } else {
    throw "This module loading schema is unsupported.  Pull requests are welcome!";
  }
}(function(sinon){
  if (typeof beforeEach !== "function") {
    throw "mocha-sinon relies on mocha having been loaded.";
  }

  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sinon.restore();
  });
}));

