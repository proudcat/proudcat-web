
use admin
db.createUser({
    user: "admin",
    pwd: "admin",
    roles: [{
        role: "userAdminAnyDatabase",
        db: "admin"
    },{
        role: "root",
        db: "admin"
    }]
})

use piano
db.createUser({
    user: "piano",
    pwd: "piano",
    roles: [{
        role: "dbOwner",
        db: "piano"
    }]
})

use admin
db.shutdownServer()

exit
