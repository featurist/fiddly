mongodb = require 'mongodb'
express = require 'express'

app = express()
app.use(express.static('./public'))

/*
mongo connection string = process.env.MONGOLAB_URI || "mongodb://localhost:27017/fiddly"

client = mongodb.Db.connect ! (mongo connection string)

fids = client.collection 'fids'
fids.insert! { a = 2 }
*/

exports.listen (port) =
    app.get("/") @(req, res)
        mongo connection string = process.env.MONGOLAB_URI || "mongodb://localhost:27017/fiddly"
        mongodb.Db.connect (mongo connection string) @(err, client)
            fids = client.collection 'fids'
            fids.insert { a = 2 } @(err, fid)
                res.redirect "/#(fid.0._id)"
    
    app.get("/:id") @(req,res)
        res.sendfile (__dirname + '/public/canvas_fid.html')
        
    app.listen(port, "0.0.0.0")    