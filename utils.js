var crypto;
try {
 	crypto = require('crypto');
} catch (err) {
 	console.log('crypto support is disabled!');
}
var fs = require('fs')
var path = require("path");
var superagent = require('superagent');

var errors = require("bolt-internal-errors");

const X_BOLT_APP_TOKEN = 'X-Bolt-App-Token';

var __isNullOrUndefined = function(obj){
	return (typeof obj === 'undefined' || obj === null);
}

var __extractModel = function(model, propsToGet) {
	var _model = model;
	if(!__isNullOrUndefined(model) && typeof model.toJSON === "function") _model = model.toJSON();
	var _object = {};
	for (var prop in _model) {
		var doProp = true;
		if (typeof _model.hasOwnProperty === "function") 
			doProp = _model.hasOwnProperty(prop);
		if (doProp) {
			if(propsToGet.indexOf(prop) != -1) {
				_object[prop] = _model[prop];
			}
		}
	}
	return _object;
}

var __sanitizeModel = function(model, propsToRemove) {
	var _model = {};
	if(!__isNullOrUndefined(model) && typeof model.toJSON === "function") _model = model.toJSON();
	else {
		for (var prop in model) {
			if (model.hasOwnProperty(prop)) {
				_model[prop] = model[prop];
			}
		}
	}
	propsToRemove.forEach(function(prop){
		delete _model[prop];
	});
	return _model;
},
__sanitizeModels = function(models, propsToRemove) {
	var _models = [];
	models.forEach(function(model){
		_models.push(__sanitizeModel(model, propsToRemove));
	});
	return _models;
},

__sanitizeApp = function(model) {
	return __sanitizeModel(model, ['__v']); //dont remove 'appHash' because POST: /api/apps/start needs it
},
__sanitizeApps = function(models) {
	var _models = [];
	models.forEach(function(model){
		_models.push(__sanitizeApp(model));
	});
	return _models;
},
__sanitizeAppRole = function(model) {
	return __sanitizeModel(model, ['__v']);
},
__sanitizeAppRoles = function(models) {
	var _models = [];
	models.forEach(function(model){
		_models.push(__sanitizeAppRole(model));
	});
	return _models;
},
__sanitizeAppUser = function(model) {
	return __sanitizeModel(model, ['__v']);
},
__sanitizeAppUsers = function(models) {
	var _models = [];
	models.forEach(function(model){
		_models.push(__sanitizeAppUser(model));
	});
	return _models;
},
__sanitizePermission = function(model) {
	return __sanitizeModel(model, ['__v']);
},
__sanitizePermissions = function(models) {
	var _models = [];
	models.forEach(function(model){
		_models.push(__sanitizePermission(model));
	});
	return _models;
},
__sanitizeRole = function(model) {
	return __sanitizeModel(model, ['__v']);
},
__sanitizeRoles = function(models) {
	var _models = [];
	models.forEach(function(model){
		_models.push(__sanitizeRole(model));
	});
	return _models;
},
__sanitizeRouter = function(model) {
	return __sanitizeModel(model, ['__v']);
},
__sanitizeRouters = function(models) {
	var _models = [];
	models.forEach(function(model){
		_models.push(__sanitizeRouter(model));
	});
	return _models;
},
__sanitizeUser = function(model) {
	return __sanitizeModel(model, ['__v', 'passwordHash']);
},
__sanitizeUsers = function(models) {
	var _models = [];
	models.forEach(function(model){
		_models.push(__sanitizeUser(model));
	});
	return _models;
},
__sanitizeUserRole = function(model) {
	return __sanitizeModel(model, ['__v']);
},
__sanitizeUserRoles = function(models) {
	var _models = [];
	models.forEach(function(model){
		_models.push(__sanitizeUserRole(model));
	});
	return _models;
};

module.exports = {
	Misc : {
		//constructs an appropriate response object
		createResponse: function(body, error, code, errorTraceId, errorUserTitle, errorUserMessage){
			//TODO: support errorTraceId
			//TODO: errorUserTitle and errorUserMessage should be change from strings to ints (==code) to support localization

			var response = {};

			//set code
			if (!__isNullOrUndefined(code)) {
				response.code = code;
			}
			else {
				if (!__isNullOrUndefined(body))
					response.code = 0;
				else //if (!__isNullOrUndefined(error))
					response.code = 1000;
			}

			//set body
			if (!__isNullOrUndefined(body))
				response.body = body;

			//set error
			if (!__isNullOrUndefined(error)){
				response.error = error;

				//set errorTraceId
				if (!__isNullOrUndefined(errorTraceId))
					response.errorTraceId = errorTraceId;

				//set errorUserTitle
				if (!__isNullOrUndefined(errorUserTitle))
					response.errorUserTitle = errorUserTitle; //TODO: this is not the real implementation
				else {
					//TODO: this is not the real implementation
					response.errorUserTitle = "Bolt Error " + response.code.toString();
				}

				//set errorUserMessage
				if (!__isNullOrUndefined(errorUserMessage))
					response.errorUserMessage = errorUserMessage; //TODO: this is not the real implementation
				else {
					//TODO: this is not the real implementation
					response.errorUserMessage = errors[response.code];
				}
			}

			return JSON.stringify(response);
		},
		extractModel: __extractModel,
		sanitizeApp: __sanitizeApp,
		sanitizeApps: __sanitizeApps,
		sanitizeAppRole: __sanitizeAppRole,
		sanitizeAppRoles: __sanitizeAppRoles,
		sanitizeAppUser: __sanitizeAppUser,
		sanitizeAppUsers: __sanitizeAppUsers,
		sanitizeModel: __sanitizeModel,
		sanitizeModels: __sanitizeModels,
		sanitizePermission: __sanitizePermission,
		sanitizePermissions: __sanitizePermissions,
		sanitizeRole: __sanitizeRole,
		sanitizeRoles: __sanitizeRoles,
		sanitizeRouter: __sanitizeRouter,
		sanitizeRouters: __sanitizeRouters,
		sanitizeUser: __sanitizeUser,
		sanitizeUsers: __sanitizeUsers,
		sanitizeUserRole: __sanitizeUserRole,
		sanitizeUserRoles: __sanitizeUserRoles,
		isNullOrUndefined: __isNullOrUndefined,
		isEmptyObject: function(obj) {
			if (typeof obj.hasOwnProperty === "function") {
				for (var prop in obj) {
					if(obj.hasOwnProperty(prop)) {
						return false;
					}
				}
			}

			return JSON.stringify(obj) === JSON.stringify({});
		}
	},
	Events: {
		fire: function(eventName, eventBody, appToken, callback) {
			superagent
				.post(process.env.BOLT_ADDRESS + '/api/events/' + eventName)
				.set(X_BOLT_APP_TOKEN, appToken)
				.send(eventBody)
				.end(callback);
		},
		sub: function(hookName, hookBody, appToken, callback) {
			superagent
				.post(process.env.BOLT_ADDRESS + '/api/events/sub/' + module.exports.String.trimStart(hookName, "/"))
				.set(X_BOLT_APP_TOKEN, appToken)
				.send(hookBody)
				.end(callback);
		},
		unsub: function(hookName, appToken, callback) {
			superagent
				.delete(process.env.BOLT_ADDRESS + '/api/events/sub/' + module.exports.String.trimStart(hookName, "/"))
				.set(X_BOLT_APP_TOKEN, appToken)
				.end(callback);
		}
	},
	Security: {
		checksumSync: function(_path, callback) {
			if (!__isNullOrUndefined(crypto)) {
				var hash = crypto.createHash('sha256');
				var stream = fs.createReadStream(_path);

				stream.on('error', function(error){
					callback(error, null);
				});

				stream.on('data', function(data){
					hash.update(data, 'utf8');
				});

				stream.on('end', function(data){
					var hsh = hash.digest('hex');
					callback(null, hsh);
				});
			}
			else {
				callback(null, _path);
			}
		},
		hashSync: function(word, salt){
			if(!salt)
				salt = word;

			if(crypto){
				//return crypto.createHash('sha256').update(word).digest('hex');
				return crypto.createHmac('sha512', salt).update(word).digest('hex');
			}
			else
				return word;
		}
	},
	String: {
		getRandomString: function(length){
			if(crypto) {
				return crypto.randomBytes(Math.ceil(length / 2))
		            .toString('hex') /** convert to hexadecimal format */
		            .slice(0, length);   /** return required number of characters */
			}
			else {
				return Date.now.toString();
			}
		},
		startsWith: function(word, chars, start){
			if (__isNullOrUndefined(start)) start = 0;
			return word.indexOf(chars) == start;
		},
		trim: function(word, char){
			return this.trimStart(this.trimEnd(word, char), char);
		},
		trimEnd: function(word, char){
			if(!char)
				char = " ";

			for(var i = (word.length - 1); word.charAt(i) == char && i > -1; --i)
				word = word.substring(0, i);

			return word;
		},
		trimStart: function(word, char){
			if(!char)
				char = " ";

			for(var i = 0; word.charAt(i) == char && i < word.length; )
				word = word.substring(i + 1);

			return word;
		}
	}
};