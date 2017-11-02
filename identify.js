var identify = require('identify-js').default;

var obj = { username: 'cn27529' }

var qq = identify(obj)

console.log(qq.__id)