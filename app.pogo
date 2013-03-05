http = require 'http'
mongodb = require 'mongodb'

/*
mongo connection string = process.env.MONGOLAB_URI || "mongodb://localhost:27017/fiddly"

client = mongodb.Db.connect ! (mongo connection string)

fids = client.collection 'fids'
fids.insert! { a = 2 }
*/

exports.listen (port) =

    http.createServer @(req, res)
        res.writeHead (200, 'Content-Type': 'text/plain')
        res.end "Hello World\n"
    .listen (port, "0.0.0.0")
