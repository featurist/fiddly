db = require './db'

exports.create fid () =
    client = db.connect!
    fids = client.collection 'fids'
    inserted = fids.insert! { contents = {} }
    inserted.0