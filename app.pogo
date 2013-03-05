http = require 'http'
mongodb = require 'mongodb'

port = process.env.PORT || 3000

mongo connection string = process.env.MONGOLAB_URI || "mongodb://localhost:27017/fiddly"

client = mongodb.Db.connect ! (mongo connection string)

fids = client.collection 'fids'
fids.insert! { a = 2 }

http.createServer @(req, res)
    res.writeHead (200, 'Content-Type': 'text/plain')
    res.end "Hello World\n"
.listen (port, "0.0.0.0")

console.log "Server running at http://127.0.0.1:#(port)"