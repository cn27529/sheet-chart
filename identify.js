var identify = require('identify-js').default;
var obj = { username: 'cn27529' }

for (var i = 0; i < 10; i++) {
    var qq = identify(obj)
    console.log(qq.__id)
}