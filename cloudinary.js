var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'cn27529',
    api_key: '731645122288863',
    api_secret: 'bj3zx55FSVqu2EJIl2K3T1mjnGs'
});

var img = cloudinary.image("doraemon-team_ifvfic.png")

console.log(img)