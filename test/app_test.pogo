httpism = require 'httpism'
app = require '../app'
db = require '../db'
ObjectID = require('mongodb').ObjectID

describe 'GET /'
    
    server = nil
    
    before
        server := app.listen(3000)
        
    after
        server.close()
    
    it 'redirects to /<new-fid-id>'
        response = httpism.get ! 'http://localhost:3000/'
        last id = db.connect!.collection 'fids'.find().sort( { _id = -1 } ).limit(1).to array!.0._id
        response.url.should.equal "http://localhost:3000/#(last id)"
        
    