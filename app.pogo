express = require 'express'
db = require './db'
ObjectID = require('mongodb').ObjectID

app = express()
app.use(express.static('./public'))


exports.listen (port) =

    app.get("/") @(req, res)
        db.connect @(err, client)
            fids = client.collection 'fids'
            fids.insert { } @(err, fid)
                res.redirect "/#(fid.0._id)"

    app.get("/:id.json") @(req,res)
        id = req.params.id
        db.connect @(err, client)
            fids = client.collection 'fids'
            fids.findOne( { "_id" = @new ObjectID(id) }) @(err, doc)
                res.end (JSON.stringify(doc))
    
    app.get("/:id") @(req,res)
        res.sendfile (__dirname + '/public/canvas_fid.html')
        
    app.listen(port, "0.0.0.0")
