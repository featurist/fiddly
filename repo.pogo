db = require './db'
ObjectID = require('mongodb').ObjectID

open fids () = db.connect!.collection 'fids'

exports.create fid () =
    open fids!.insert! { contents = {} }.0

exports.find fid by id (id) =
    open fids!.find one!( { "_id" = @new ObjectID(id) })

exports.update fid contents (id, contents) =
    fids = open fids!
    fid = fids.find one! { "_id" = @new ObjectID(id) }
    fid.contents = contents
    fids.save! (fid)