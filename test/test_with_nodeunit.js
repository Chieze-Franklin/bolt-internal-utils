var utils = require("bolt-internal-utils");

module.exports = {
  testStringStartsWith: function(test) {
    test.equal(utils.String.startsWith("characters", "c"), true, "Expecting \"characters\" to start with \"c\"");
    test.done();
  }
}