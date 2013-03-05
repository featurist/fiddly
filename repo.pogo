db = require './db'
ObjectID = require('mongodb').ObjectID

exports.create fid () =
    client = db.connect!
    fids = client.collection 'fids'
    inserted = fids.insert! { contents = {} }
    inserted.0

exports.find fid by id (id) =
    client = db.connect!
    fids = client.collection 'fids'
    fids.find one!( { "_id" = @new ObjectID(id) })
