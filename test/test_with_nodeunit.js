var utils = require("../utils");

module.exports = {
  testMiscCreateResponse: function(test) {
  	var response = JSON.parse(utils.Misc.createResponse());
  	test.equal(utils.Misc.isNullOrUndefined(response.body), true, "Expecting \'isNullOrUndefined(response.body)\' to give \'true\'");
  	test.equal(response.code, 1000, "Expecting \'response.code\' to give \'1000\'");
  	test.equal(utils.Misc.isNullOrUndefined(response.error), true, "Expecting \'isNullOrUndefined(response.error)\' to give \'true\'");

  	response = JSON.parse(utils.Misc.createResponse(null));
  	test.equal(utils.Misc.isNullOrUndefined(response.body), true, "Expecting \'isNullOrUndefined(response.body)\' to give \'true\'");
  	test.equal(response.code, 1000, "Expecting \'response.code\' to give \'1000\'");
  	test.equal(utils.Misc.isNullOrUndefined(response.error), true, "Expecting \'isNullOrUndefined(response.error)\' to give \'true\'");

  	response = JSON.parse(utils.Misc.createResponse(null, {}));
  	test.equal(utils.Misc.isNullOrUndefined(response.body), true, "Expecting \'isNullOrUndefined(response.body)\' to give \'true\'");
  	test.equal(response.code, 1000, "Expecting \'response.code\' to give \'1000\'");
  	test.equal(utils.Misc.isNullOrUndefined(response.error), false, "Expecting \'isNullOrUndefined(response.error)\' to give \'false\'");

  	response = JSON.parse(utils.Misc.createResponse(null, {}, 123));
  	test.equal(utils.Misc.isNullOrUndefined(response.body), true, "Expecting \'isNullOrUndefined(response.body)\' to give \'true\'");
  	test.equal(response.code, 123, "Expecting \'response.code\' to give \'123\'");
  	test.equal(utils.Misc.isNullOrUndefined(response.error), false, "Expecting \'isNullOrUndefined(response.error)\' to give \'false\'");

  	response = JSON.parse(utils.Misc.createResponse({}));
  	test.equal(utils.Misc.isNullOrUndefined(response.body), false, "Expecting \'isNullOrUndefined(response.body)\' to give \'false\'");
  	test.equal(response.code, 0, "Expecting \'response.code\' to give \'0\'");
  	test.equal(utils.Misc.isNullOrUndefined(response.error), true, "Expecting \'isNullOrUndefined(response.error)\' to give \'true\'");

  	response = JSON.parse(utils.Misc.createResponse({}, null));
  	test.equal(utils.Misc.isNullOrUndefined(response.body), false, "Expecting \'isNullOrUndefined(response.body)\' to give \'false\'");
  	test.equal(response.code, 0, "Expecting \'response.code\' to give \'0\'");
  	test.equal(utils.Misc.isNullOrUndefined(response.error), true, "Expecting \'isNullOrUndefined(response.error)\' to give \'true\'");

  	response = JSON.parse(utils.Misc.createResponse({}, null, 123));
  	test.equal(utils.Misc.isNullOrUndefined(response.body), false, "Expecting \'isNullOrUndefined(response.body)\' to give \'false\'");
  	test.equal(response.code, 123, "Expecting \'response.code\' to give \'123\'");
  	test.equal(utils.Misc.isNullOrUndefined(response.error), true, "Expecting \'isNullOrUndefined(response.error)\' to give \'true\'");

  	response = JSON.parse(utils.Misc.createResponse({}, {}, 123));
  	test.equal(utils.Misc.isNullOrUndefined(response.body), false, "Expecting \'isNullOrUndefined(response.body)\' to give \'false\'");
  	test.equal(response.code, 123, "Expecting \'response.code\' to give \'123\'");
  	test.equal(utils.Misc.isNullOrUndefined(response.error), false, "Expecting \'isNullOrUndefined(response.error)\' to give \'false\'");

    test.done();
  },
  testMiscExtractModel: function(test) {
  	var model = {a: "a", b: "b", c: "c"};
  	var extractedModel = utils.Misc.extractModel(model, ["a", "c"]); //extract only properties "a" and "c"
    test.equal(extractedModel.a, "a", "Expecting \'extractedModel.a\' to give \"a\"");
    test.equal(typeof extractedModel.b, "undefined", "Expecting \'typeof extractedModel.b\' to give \"undefined\"");
    test.equal(utils.Misc.isNullOrUndefined(extractedModel.b), true, "Expecting \'isNullOrUndefined(extractedModel.b)\' to give \'true\'");
    test.equal(extractedModel.c, "c", "Expecting \'extractedModel.c\' to give \"c\"");
    test.done();
  },
  testMiscIsNullOrUndefined: function(test) {
    test.equal(utils.Misc.isNullOrUndefined(null), true, "Expecting \'null\' to give \'true\'");
    //test.equal(utils.Misc.isNullOrUndefined(undefinedObject), true, "Expecting \'undefinedObject\' to give \'true\'");
    test.equal(utils.Misc.isNullOrUndefined(""), false, "Expecting \'\"\"\' to give \'false\'");
    test.equal(utils.Misc.isNullOrUndefined(false), false, "Expecting \'false\' to give \'false\'");
    test.equal(utils.Misc.isNullOrUndefined({}), false, "Expecting \'{}\' to give \'false\'");
    test.done();
  },
  testStringStartsWith: function(test) {
    test.equal(utils.String.startsWith("characters", "c"), true, "Expecting \"characters\" to start with \"c\"");
    test.equal(utils.String.startsWith("characters", "c", 0), true, "Expecting \"characters\" to start with \"c\" at index \'0\'");
    test.equal(utils.String.startsWith("characters", "h", 1), true, "Expecting \"characters\" to start with \"h\" at index \'1\'");
    test.equal(utils.String.startsWith("characters", "t", 6), true, "Expecting \"characters\" to start with \"t\" at index \'6\'");
    test.done();
  },
  testStringTrim: function(test) {
    test.equal(utils.String.trim("characters"), "characters", "Expecting \'trim(\"characters\")\' to give \"characters\"");
    test.equal(utils.String.trim("   characters"), "characters", "Expecting \'trim(\"   characters\")\' to give \"characters\"");
    test.equal(utils.String.trim("characters   "), "characters", "Expecting \'trim(\"characters   \")\' to give \"characters\"");
    test.equal(utils.String.trim("   characters   "), "characters", "Expecting \'trim(\"   characters   \")\' to give \"characters\"");

    test.equal(utils.String.trim("characters", " "), "characters", "Expecting \'trim(\"characters\", \" \")\' to give \"characters\"");
    test.equal(utils.String.trim("   characters", " "), "characters", "Expecting \'trim(\"   characters\", \" \")\' to give \"characters\"");
    test.equal(utils.String.trim("characters   ", " "), "characters", "Expecting \'trim(\"characters   \", \" \")\' to give \"characters\"");
    test.equal(utils.String.trim("   characters   ", " "), "characters", "Expecting \'trim(\"   characters   \", \" \")\' to give \"characters\"");

    test.equal(utils.String.trim("characters", "-"), "characters", "Expecting \'trim(\"characters\", \"-\")\' to give \"characters\"");
    test.equal(utils.String.trim("---characters", "-"), "characters", "Expecting \'trim(\"   characters\", \"-\")\' to give \"characters\"");
    test.equal(utils.String.trim("characters---", "-"), "characters", "Expecting \'trim(\"characters   \", \"-\")\' to give \"characters\"");
    test.equal(utils.String.trim("---characters---", "-"), "characters", "Expecting \'trim(\"   characters   \", \"-\")\' to give \"characters\"");

    test.done();
  },
  testStringTrimEnd: function(test) {
    test.equal(utils.String.trimEnd("characters"), "characters", "Expecting \'trimEnd(\"characters\")\' to give \"characters\"");
    test.equal(utils.String.trimEnd("   characters"), "   characters", "Expecting \'trimEnd(\"   characters\")\' to give \"   characters\"");
    test.equal(utils.String.trimEnd("characters   "), "characters", "Expecting \'trimEnd(\"characters   \")\' to give \"characters\"");
    test.equal(utils.String.trimEnd("   characters   "), "   characters", "Expecting \'trimEnd(\"   characters   \")\' to give \"   characters\"");

    test.equal(utils.String.trimEnd("characters", " "), "characters", "Expecting \'trimEnd(\"characters\", \" \")\' to give \"characters\"");
    test.equal(utils.String.trimEnd("   characters", " "), "   characters", "Expecting \'trimEnd(\"   characters\", \" \")\' to give \"   characters\"");
    test.equal(utils.String.trimEnd("characters   ", " "), "characters", "Expecting \'trimEnd(\"characters   \", \" \")\' to give \"characters\"");
    test.equal(utils.String.trimEnd("   characters   ", " "), "   characters", "Expecting \'trimEnd(\"   characters   \", \" \")\' to give \"   characters\"");

    test.equal(utils.String.trimEnd("characters", "-"), "characters", "Expecting \'trimEnd(\"characters\", \"-\")\' to give \"characters\"");
    test.equal(utils.String.trimEnd("---characters", "-"), "---characters", "Expecting \'trimEnd(\"---characters\", \"-\")\' to give \"---characters\"");
    test.equal(utils.String.trimEnd("characters---", "-"), "characters", "Expecting \'trimEnd(\"characters---\", \"-\")\' to give \"characters\"");
    test.equal(utils.String.trimEnd("---characters---", "-"), "---characters", "Expecting \'trimEnd(\"---characters---\", \"-\")\' to give \"---characters\"");

    test.done();
  },
  testStringTrimStart: function(test) {
    test.equal(utils.String.trimStart("characters"), "characters", "Expecting \'trimStart(\"characters\")\' to give \"characters\"");
    test.equal(utils.String.trimStart("   characters"), "characters", "Expecting \'trimStart(\"   characters\")\' to give \"characters\"");
    test.equal(utils.String.trimStart("characters   "), "characters   ", "Expecting \'trimStart(\"characters   \")\' to give \"characters   \"");
    test.equal(utils.String.trimStart("   characters   "), "characters   ", "Expecting \'trimStart(\"   characters   \")\' to give \"characters   \"");

    test.equal(utils.String.trimStart("characters", " "), "characters", "Expecting \'trimStart(\"characters\", \" \")\' to give \"characters\"");
    test.equal(utils.String.trimStart("   characters", " "), "characters", "Expecting \'trimStart(\"   characters\", \" \")\' to give \"characters\"");
    test.equal(utils.String.trimStart("characters   ", " "), "characters   ", "Expecting \'trimStart(\"characters   \", \" \")\' to give \"characters   \"");
    test.equal(utils.String.trimStart("   characters   ", " "), "characters   ", "Expecting \'trimStart(\"   characters   \", \" \")\' to give \"characters   \"");

    test.equal(utils.String.trimStart("characters", "-"), "characters", "Expecting \'trimStart(\"characters\", \"-\")\' to give \"characters\"");
    test.equal(utils.String.trimStart("---characters", "-"), "characters", "Expecting \'trimStart(\"   characters\", \"-\")\' to give \"characters\"");
    test.equal(utils.String.trimStart("characters---", "-"), "characters---", "Expecting \'trimStart(\"characters   \", \"-\")\' to give \"characters---\"");
    test.equal(utils.String.trimStart("---characters---", "-"), "characters---", "Expecting \'trimStart(\"   characters   \", \"-\")\' to give \"characters---\"");

    test.done();
  }
}