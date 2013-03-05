express = require 'express'
db = require './db'

app = express()
app.use(express.static('./public'))

exports.listen (port) =

    app.get("/") @(req, res)
        db.connect @(err, client)
            fids = client.collection 'fids'
            fids.insert { } @(err, fid)
                res.redirect "/#(fid.0._id)"
    
    app.get("/:id") @(req,res)
        id = req.params.id
        db.connect @(err, client)
            fids = client.collection 'fids'
            fids.findOne( { "_id" = id }) @(err, doc)
                res.end "oops"
        
    app.listen(port, "0.0.0.0")