
// instrument by jscoverage, do not modifly this file
(function (file, lines, conds, source) {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (BASE._$jscoverage) {
    BASE._$jscmd(file, 'init', lines, conds, source);
    return;
  }
  var cov = {};
  /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
  function jscmd(file, type, line, express, start, offset) {
    var storage;
    switch (type) {
      case 'init':
        if(cov[file]){
          storage = cov[file];
        } else {
          storage = [];
          for (var i = 0; i < line.length; i ++) {
            storage[line[i]] = 0;
          }
          var condition = express;
          var source = start;
          storage.condition = condition;
          storage.source = source;
        }
        cov[file] = storage;
        break;
      case 'line':
        storage = cov[file];
        storage[line] ++;
        break;
      case 'cond':
        storage = cov[file];
        storage.condition[line] ++;
        return express;
    }
  }

  BASE._$jscoverage = cov;
  BASE._$jscmd = jscmd;
  jscmd(file, 'init', lines, conds, source);
})('utils.js', [1,7,8,10,12,16,30,97,3,5,13,17,19,27,23,31,33,36,34,39,40,43,41,47,50,51,54,52,57,60,61,64,62,67,70,71,74,72,77,80,81,84,82,87,90,91,94,92,104,146,108,123,134,142,166,167,169,173,177,170,174,178,179,183,192,201,206,211,214,223,232], {"13_9_26":0,"13_39_12":0,"18_4_65":0,"18_4_27":0,"18_35_34":0,"21_6_27":0,"22_6_30":0,"32_4_65":0,"32_4_27":0,"32_35_34":0,"107_7_26":0,"111_8_26":0,"118_7_26":0,"122_7_27":0,"126_8_34":0,"130_8_36":0,"138_8_38":0,"165_7_28":0,"187_6_5":0,"190_6_6":0,"200_6_6":0,"210_7_26":0,"217_6_5":0,"220_34_22":0,"220_60_6":0,"226_6_5":0,"229_18_22":0,"229_44_15":0}, ["var crypto;","try {"," \tcrypto = require('crypto');","} catch (err) {"," \tconsole.log('crypto support is disabled!');","}","var fs = require('fs')","var path = require(\"path\");","","var errors = require(\"bolt-internal-errors\");","","var __isNullOrUndefined = function(obj){","\treturn (typeof obj === 'undefined' || obj === null);","}","","var __extractModel = function(model, propsToGet) {","\tvar _model = model;","\tif(!__isNullOrUndefined(model) && !__isNullOrUndefined(model.toJSON)) _model = model.toJSON();","\tvar _object = {};","\tfor (var prop in _model) {","\t\tif (_model.hasOwnProperty(prop)) {","\t\t\tif(propsToGet.indexOf(prop) != -1) {","\t\t\t\t_object[prop] = _model[prop];","\t\t\t}","\t\t}","\t}","\treturn _object;","}","","var __sanitizeModel = function(model, propsToRemove) {","\tvar _model = model;","\tif(!__isNullOrUndefined(model) && !__isNullOrUndefined(model.toJSON)) _model = model.toJSON();","\tpropsToRemove.forEach(function(prop){","\t\tdelete _model[prop];","\t});","\treturn _model;","},","__sanitizeModels = function(models, propsToRemove) {","\tvar _models = [];","\tmodels.forEach(function(model){","\t\t_models.push(__sanitizeModel(model, propsToRemove));","\t});","\treturn _models;","},","","__sanitizeApp = function(model) {","\treturn __sanitizeModel(model, ['__v']); //dont remove 'appHash' because POST: /api/apps/start needs it","},","__sanitizeApps = function(models) {","\tvar _models = [];","\tmodels.forEach(function(model){","\t\t_models.push(__sanitizeApp(model));","\t});","\treturn _models;","},","__sanitizeAppRole = function(model) {","\treturn __sanitizeModel(model, ['__v']);","},","__sanitizeAppRoles = function(models) {","\tvar _models = [];","\tmodels.forEach(function(model){","\t\t_models.push(__sanitizeAppRole(model));","\t});","\treturn _models;","},","__sanitizeRole = function(model) {","\treturn __sanitizeModel(model, ['__v']);","},","__sanitizeRoles = function(models) {","\tvar _models = [];","\tmodels.forEach(function(model){","\t\t_models.push(__sanitizeRole(model));","\t});","\treturn _models;","},","__sanitizeUser = function(model) {","\treturn __sanitizeModel(model, ['__v', 'passwordHash']);","},","__sanitizeUsers = function(models) {","\tvar _models = [];","\tmodels.forEach(function(model){","\t\t_models.push(__sanitizeUser(model));","\t});","\treturn _models;","},","__sanitizeUserRole = function(model) {","\treturn __sanitizeModel(model, ['__v']);","},","__sanitizeUserRoles = function(models) {","\tvar _models = [];","\tmodels.forEach(function(model){","\t\t_models.push(__sanitizeUserRole(model));","\t});","\treturn _models;","};","","module.exports = {","\tMisc : {","\t\t//constructs an appropriate response object","\t\tcreateResponse: function(body, error, code, errorTraceId, errorUserTitle, errorUserMessage){","\t\t\t//TODO: support errorTraceId","\t\t\t//TODO: errorUserTitle and errorUserMessage should be change from strings to ints (==code) to support localization","","\t\t\tvar response = {};","","\t\t\t//set code","\t\t\tif (!__isNullOrUndefined(code)) {","\t\t\t\tresponse.code = code;","\t\t\t}","\t\t\telse {","\t\t\t\tif (!__isNullOrUndefined(body))","\t\t\t\t\tresponse.code = 0;","\t\t\t\telse //if (!__isNullOrUndefined(error))","\t\t\t\t\tresponse.code = 1000;","\t\t\t}","","\t\t\t//set body","\t\t\tif (!__isNullOrUndefined(body))","\t\t\t\tresponse.body = body;","","\t\t\t//set error","\t\t\tif (!__isNullOrUndefined(error)){","\t\t\t\tresponse.error = error;","","\t\t\t\t//set errorTraceId","\t\t\t\tif (!__isNullOrUndefined(errorTraceId))","\t\t\t\t\tresponse.errorTraceId = errorTraceId;","","\t\t\t\t//set errorUserTitle","\t\t\t\tif (!__isNullOrUndefined(errorUserTitle))","\t\t\t\t\tresponse.errorUserTitle = errorUserTitle; //TODO: this is not the real implementation","\t\t\t\telse {","\t\t\t\t\t//TODO: this is not the real implementation","\t\t\t\t\tresponse.errorUserTitle = \"Bolt Error \" + response.code.toString();","\t\t\t\t}","","\t\t\t\t//set errorUserMessage","\t\t\t\tif (!__isNullOrUndefined(errorUserMessage))","\t\t\t\t\tresponse.errorUserMessage = errorUserMessage; //TODO: this is not the real implementation","\t\t\t\telse {","\t\t\t\t\t//TODO: this is not the real implementation","\t\t\t\t\tresponse.errorUserMessage = errors[response.code];","\t\t\t\t}","\t\t\t}","","\t\t\treturn JSON.stringify(response);","\t\t},","\t\textractModel: __extractModel,","\t\tsanitizeApp: __sanitizeApp,","\t\tsanitizeApps: __sanitizeApps,","\t\tsanitizeAppRole: __sanitizeAppRole,","\t\tsanitizeAppRoles: __sanitizeAppRoles,","\t\tsanitizeModel: __sanitizeModel,","\t\tsanitizeModels: __sanitizeModels,","\t\tsanitizeRole: __sanitizeRole,","\t\tsanitizeRoles: __sanitizeRoles,","\t\tsanitizeUser: __sanitizeUser,","\t\tsanitizeUsers: __sanitizeUsers,","\t\tsanitizeUserRole: __sanitizeUserRole,","\t\tsanitizeUserRoles: __sanitizeUserRoles,","\t\tisNullOrUndefined: __isNullOrUndefined","\t},","\tSecurity: {","\t\tchecksumSync: function(_path, callback) {","\t\t\tif (!__isNullOrUndefined(crypto)) {","\t\t\t\tvar hash = crypto.createHash('sha256');","\t\t\t\tvar stream = fs.createReadStream(_path);","","\t\t\t\tstream.on('error', function(error){","\t\t\t\t\tcallback(error, null);","\t\t\t\t});","","\t\t\t\tstream.on('data', function(data){","\t\t\t\t\thash.update(data, 'utf8');","\t\t\t\t});","","\t\t\t\tstream.on('end', function(data){","\t\t\t\t\tvar hsh = hash.digest('hex');","\t\t\t\t\tcallback(null, hsh);","\t\t\t\t});","\t\t\t}","\t\t\telse {","\t\t\t\tcallback(null, _path);","\t\t\t}","\t\t},","\t\thashSync: function(word, salt){","\t\t\tif(!salt)","\t\t\t\tsalt = word;","","\t\t\tif(crypto){","\t\t\t\t//return crypto.createHash('sha256').update(word).digest('hex');","\t\t\t\treturn crypto.createHmac('sha512', salt).update(word).digest('hex');","\t\t\t}","\t\t\telse","\t\t\t\treturn word;","\t\t}","\t},","\tString: {","\t\tgetRandomString: function(length){","\t\t\tif(crypto) {","\t\t\t\treturn crypto.randomBytes(Math.ceil(length / 2))","\t\t            .toString('hex') /** convert to hexadecimal format */","\t\t            .slice(0, length);   /** return required number of characters */","\t\t\t}","\t\t\telse {","\t\t\t\treturn Date.now.toString();","\t\t\t}","\t\t},","\t\tstartsWith: function(word, chars, start){","\t\t\tif (__isNullOrUndefined(start)) start = 0;","\t\t\treturn word.indexOf(chars) == start;","\t\t},","\t\ttrim: function(word, char){","\t\t\treturn this.trimStart(this.trimEnd(word, char), char);","\t\t},","\t\ttrimEnd: function(word, char){","\t\t\tif(!char)","\t\t\t\tchar = \" \";","","\t\t\tfor(var i = (word.length - 1); word.charAt(i) == char && i > -1; --i)","\t\t\t\tword = word.substring(0, i);","","\t\t\treturn word;","\t\t},","\t\ttrimStart: function(word, char){","\t\t\tif(!char)","\t\t\t\tchar = \" \";","","\t\t\tfor(var i = 0; word.charAt(i) == char && i < word.length; )","\t\t\t\tword = word.substring(i + 1);","","\t\t\treturn word;","\t\t}","\t}","};"]);
_$jscmd("utils.js", "line", 1);

var crypto;

try {
    _$jscmd("utils.js", "line", 3);
    crypto = require("crypto");
} catch (err) {
    _$jscmd("utils.js", "line", 5);
    console.log("crypto support is disabled!");
}

_$jscmd("utils.js", "line", 7);

var fs = require("fs");

_$jscmd("utils.js", "line", 8);

var path = require("path");

_$jscmd("utils.js", "line", 10);

var errors = require("bolt-internal-errors");

_$jscmd("utils.js", "line", 12);

var __isNullOrUndefined = function(obj) {
    _$jscmd("utils.js", "line", 13);
    return _$jscmd("utils.js", "cond", "13_9_26", typeof obj === "undefined") || _$jscmd("utils.js", "cond", "13_39_12", obj === null);
};

_$jscmd("utils.js", "line", 16);

var __extractModel = function(model, propsToGet) {
    _$jscmd("utils.js", "line", 17);
    var _model = model;
    if (_$jscmd("utils.js", "cond", "18_4_65", _$jscmd("utils.js", "cond", "18_4_27", !__isNullOrUndefined(model)) && _$jscmd("utils.js", "cond", "18_35_34", !__isNullOrUndefined(model.toJSON)))) _model = model.toJSON();
    _$jscmd("utils.js", "line", 19);
    var _object = {};
    for (var prop in _model) {
        if (_$jscmd("utils.js", "cond", "21_6_27", _model.hasOwnProperty(prop))) {
            if (_$jscmd("utils.js", "cond", "22_6_30", propsToGet.indexOf(prop) != -1)) {
                _$jscmd("utils.js", "line", 23);
                _object[prop] = _model[prop];
            }
        }
    }
    _$jscmd("utils.js", "line", 27);
    return _object;
};

_$jscmd("utils.js", "line", 30);

var __sanitizeModel = function(model, propsToRemove) {
    _$jscmd("utils.js", "line", 31);
    var _model = model;
    if (_$jscmd("utils.js", "cond", "32_4_65", _$jscmd("utils.js", "cond", "32_4_27", !__isNullOrUndefined(model)) && _$jscmd("utils.js", "cond", "32_35_34", !__isNullOrUndefined(model.toJSON)))) _model = model.toJSON();
    _$jscmd("utils.js", "line", 33);
    propsToRemove.forEach(function(prop) {
        _$jscmd("utils.js", "line", 34);
        delete _model[prop];
    });
    _$jscmd("utils.js", "line", 36);
    return _model;
}, __sanitizeModels = function(models, propsToRemove) {
    _$jscmd("utils.js", "line", 39);
    var _models = [];
    _$jscmd("utils.js", "line", 40);
    models.forEach(function(model) {
        _$jscmd("utils.js", "line", 41);
        _models.push(__sanitizeModel(model, propsToRemove));
    });
    _$jscmd("utils.js", "line", 43);
    return _models;
}, __sanitizeApp = function(model) {
    _$jscmd("utils.js", "line", 47);
    return __sanitizeModel(model, [ "__v" ]);
}, __sanitizeApps = function(models) {
    _$jscmd("utils.js", "line", 50);
    var _models = [];
    _$jscmd("utils.js", "line", 51);
    models.forEach(function(model) {
        _$jscmd("utils.js", "line", 52);
        _models.push(__sanitizeApp(model));
    });
    _$jscmd("utils.js", "line", 54);
    return _models;
}, __sanitizeAppRole = function(model) {
    _$jscmd("utils.js", "line", 57);
    return __sanitizeModel(model, [ "__v" ]);
}, __sanitizeAppRoles = function(models) {
    _$jscmd("utils.js", "line", 60);
    var _models = [];
    _$jscmd("utils.js", "line", 61);
    models.forEach(function(model) {
        _$jscmd("utils.js", "line", 62);
        _models.push(__sanitizeAppRole(model));
    });
    _$jscmd("utils.js", "line", 64);
    return _models;
}, __sanitizeRole = function(model) {
    _$jscmd("utils.js", "line", 67);
    return __sanitizeModel(model, [ "__v" ]);
}, __sanitizeRoles = function(models) {
    _$jscmd("utils.js", "line", 70);
    var _models = [];
    _$jscmd("utils.js", "line", 71);
    models.forEach(function(model) {
        _$jscmd("utils.js", "line", 72);
        _models.push(__sanitizeRole(model));
    });
    _$jscmd("utils.js", "line", 74);
    return _models;
}, __sanitizeUser = function(model) {
    _$jscmd("utils.js", "line", 77);
    return __sanitizeModel(model, [ "__v", "passwordHash" ]);
}, __sanitizeUsers = function(models) {
    _$jscmd("utils.js", "line", 80);
    var _models = [];
    _$jscmd("utils.js", "line", 81);
    models.forEach(function(model) {
        _$jscmd("utils.js", "line", 82);
        _models.push(__sanitizeUser(model));
    });
    _$jscmd("utils.js", "line", 84);
    return _models;
}, __sanitizeUserRole = function(model) {
    _$jscmd("utils.js", "line", 87);
    return __sanitizeModel(model, [ "__v" ]);
}, __sanitizeUserRoles = function(models) {
    _$jscmd("utils.js", "line", 90);
    var _models = [];
    _$jscmd("utils.js", "line", 91);
    models.forEach(function(model) {
        _$jscmd("utils.js", "line", 92);
        _models.push(__sanitizeUserRole(model));
    });
    _$jscmd("utils.js", "line", 94);
    return _models;
};

_$jscmd("utils.js", "line", 97);

module.exports = {
    Misc: {
        //constructs an appropriate response object
        createResponse: function(body, error, code, errorTraceId, errorUserTitle, errorUserMessage) {
            _$jscmd("utils.js", "line", 104);
            //TODO: support errorTraceId
            //TODO: errorUserTitle and errorUserMessage should be change from strings to ints (==code) to support localization
            var response = {};
            //set code
            if (_$jscmd("utils.js", "cond", "107_7_26", !__isNullOrUndefined(code))) {
                _$jscmd("utils.js", "line", 108);
                response.code = code;
            } else {
                if (_$jscmd("utils.js", "cond", "111_8_26", !__isNullOrUndefined(body))) response.code = 0; else //if (!__isNullOrUndefined(error))
                response.code = 1e3;
            }
            //set body
            if (_$jscmd("utils.js", "cond", "118_7_26", !__isNullOrUndefined(body))) response.body = body;
            //set error
            if (_$jscmd("utils.js", "cond", "122_7_27", !__isNullOrUndefined(error))) {
                _$jscmd("utils.js", "line", 123);
                response.error = error;
                //set errorTraceId
                if (_$jscmd("utils.js", "cond", "126_8_34", !__isNullOrUndefined(errorTraceId))) response.errorTraceId = errorTraceId;
                //set errorUserTitle
                if (_$jscmd("utils.js", "cond", "130_8_36", !__isNullOrUndefined(errorUserTitle))) response.errorUserTitle = errorUserTitle; else {
                    _$jscmd("utils.js", "line", 134);
                    //TODO: this is not the real implementation
                    response.errorUserTitle = "Bolt Error " + response.code.toString();
                }
                //set errorUserMessage
                if (_$jscmd("utils.js", "cond", "138_8_38", !__isNullOrUndefined(errorUserMessage))) response.errorUserMessage = errorUserMessage; else {
                    _$jscmd("utils.js", "line", 142);
                    //TODO: this is not the real implementation
                    response.errorUserMessage = errors[response.code];
                }
            }
            _$jscmd("utils.js", "line", 146);
            return JSON.stringify(response);
        },
        extractModel: __extractModel,
        sanitizeApp: __sanitizeApp,
        sanitizeApps: __sanitizeApps,
        sanitizeAppRole: __sanitizeAppRole,
        sanitizeAppRoles: __sanitizeAppRoles,
        sanitizeModel: __sanitizeModel,
        sanitizeModels: __sanitizeModels,
        sanitizeRole: __sanitizeRole,
        sanitizeRoles: __sanitizeRoles,
        sanitizeUser: __sanitizeUser,
        sanitizeUsers: __sanitizeUsers,
        sanitizeUserRole: __sanitizeUserRole,
        sanitizeUserRoles: __sanitizeUserRoles,
        isNullOrUndefined: __isNullOrUndefined
    },
    Security: {
        checksumSync: function(_path, callback) {
            if (_$jscmd("utils.js", "cond", "165_7_28", !__isNullOrUndefined(crypto))) {
                _$jscmd("utils.js", "line", 166);
                var hash = crypto.createHash("sha256");
                _$jscmd("utils.js", "line", 167);
                var stream = fs.createReadStream(_path);
                _$jscmd("utils.js", "line", 169);
                stream.on("error", function(error) {
                    _$jscmd("utils.js", "line", 170);
                    callback(error, null);
                });
                _$jscmd("utils.js", "line", 173);
                stream.on("data", function(data) {
                    _$jscmd("utils.js", "line", 174);
                    hash.update(data, "utf8");
                });
                _$jscmd("utils.js", "line", 177);
                stream.on("end", function(data) {
                    _$jscmd("utils.js", "line", 178);
                    var hsh = hash.digest("hex");
                    _$jscmd("utils.js", "line", 179);
                    callback(null, hsh);
                });
            } else {
                _$jscmd("utils.js", "line", 183);
                callback(null, _path);
            }
        },
        hashSync: function(word, salt) {
            if (_$jscmd("utils.js", "cond", "187_6_5", !salt)) salt = word;
            if (_$jscmd("utils.js", "cond", "190_6_6", crypto)) {
                _$jscmd("utils.js", "line", 192);
                //return crypto.createHash('sha256').update(word).digest('hex');
                return crypto.createHmac("sha512", salt).update(word).digest("hex");
            } else return word;
        }
    },
    String: {
        getRandomString: function(length) {
            if (_$jscmd("utils.js", "cond", "200_6_6", crypto)) {
                _$jscmd("utils.js", "line", 201);
                return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
            } else {
                _$jscmd("utils.js", "line", 206);
                return Date.now.toString();
            }
        },
        startsWith: function(word, chars, start) {
            if (_$jscmd("utils.js", "cond", "210_7_26", __isNullOrUndefined(start))) start = 0;
            _$jscmd("utils.js", "line", 211);
            return word.indexOf(chars) == start;
        },
        trim: function(word, char) {
            _$jscmd("utils.js", "line", 214);
            return this.trimStart(this.trimEnd(word, char), char);
        },
        trimEnd: function(word, char) {
            if (_$jscmd("utils.js", "cond", "217_6_5", !char)) char = " ";
            for (var i = word.length - 1; _$jscmd("utils.js", "cond", "220_34_22", word.charAt(i) == char) && _$jscmd("utils.js", "cond", "220_60_6", i > -1); --i) word = word.substring(0, i);
            _$jscmd("utils.js", "line", 223);
            return word;
        },
        trimStart: function(word, char) {
            if (_$jscmd("utils.js", "cond", "226_6_5", !char)) char = " ";
            for (var i = 0; _$jscmd("utils.js", "cond", "229_18_22", word.charAt(i) == char) && _$jscmd("utils.js", "cond", "229_44_15", i < word.length); ) word = word.substring(i + 1);
            _$jscmd("utils.js", "line", 232);
            return word;
        }
    }
};