httpism = require 'httpism'
app = require '../app'
db = require '../db'
ObjectID = require('mongodb').ObjectID

describe 'app'
    
    server = nil
    
    before
        server := app.listen(3001)
        
    after
        server.close()
    
    describe 'GET /'
    
        it 'redirects to /<new-fid-id>, which renders some HTML'
            response = httpism.get ! 'http://localhost:3001/'
            last id = db.connect!.collection 'fids'.find().sort( { _id = -1 } ).limit(1).to array!.0._id
            response.url.should.equal "http://localhost:3001/#(last id)"
            response.body.should.match r/<html>/
    
    describe 'GET /<fid>.json, after a fid has been created'
        
        fid = nil
        
        before
            httpism.get ! 'http://localhost:3001/'
            fid := db.connect!.collection 'fids'.find().sort( { _id = -1 } ).limit(1).to array!.0
        
        it 'responds with the fid, as JSON'
            body = httpism.get! "http://localhost:3001/#(fid._id).json".body
            body.should.equal (JSON.stringify({}))