express = require 'express'
repo = require './repo'
db = require './db'
ObjectID = require('mongodb').ObjectID

app = express()
app.use(express.static('./public'))
app.use(express.bodyParser())

exports.listen (port) =

    app.get("/") @(req, res)
        repo.create fid @(err, fid)
            res.redirect "/#(fid._id)"

    app.get("/:id.json") @(req, res)
        repo.find fid by id (req.params.id) @(err, fid)
            res.set header("content-type", 'application/json')
            res.end (JSON.stringify(fid.contents))
    
    app.get("/:id") @(req,res)
        res.sendfile (__dirname + '/public/canvas_fid.html')
        
    app.put('/:id') @(req,res)
        id = req.params.id
        db.connect @(err, client)
            fids = client.collection 'fids'
            fids.findOne( { "_id" = @new ObjectID(id) }) @(err, doc)
               doc.contents = req.body
               fids.save (doc) @(err)
                   if (err)
                       throw (err)
                   else
                       res.end ('{}')

        
    app.listen(port, "0.0.0.0")
