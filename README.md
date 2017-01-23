# bolt-internal-utils

Internal Bolt module used to get functions to perform various utility tasks.

## Installation

```sh
$ npm install bolt-internal-utils
```

## Use

```js
var utils  = require('bolt-internal-utils')

var rand = utils.String.getRandomString(24);
if(!utils.Misc.isNullOrUndefined(route) {
	var r = "/" + utils.String.trimStart(route, "/");
}
```

### Note

This is an internal module and should not be used in 3rd party apps.