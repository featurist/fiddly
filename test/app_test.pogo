httpism = require 'httpism'
app = require '../app'
db = require '../db'
ObjectID = require('mongodb').ObjectID

last fid () =
    db.connect!.collection 'fids'.find().sort( { _id = -1 } ).limit(1).to array!.0

describe 'app'
    
    server = nil
    
    before
        server := app.listen(3001)
        
    after
        server.close()
    
    describe 'GET /'
    
        it 'redirects to /<new-fid-id>, which renders some HTML'
            response = httpism.get ! 'http://localhost:3001/'
            last id = last fid!._id
            response.url.should.equal "http://localhost:3001/#(last id)"
            response.body.should.match r/<html>/
    
    describe 'GET /<fid>.json, after a fid has been created'
        
        fid = nil
        
        before
            httpism.get ! 'http://localhost:3001/'
            fid := last fid!
        
        it 'responds with the fid, as JSON'
            body = httpism.get! "http://localhost:3001/#(fid._id).json".body
            body.should.equal "{}"
    
    describe 'PUT /<fid>'
        
        it 'updates fids'
            httpism.get! 'http://localhost:3001/'
            last id = last fid!._id
            response = httpism.put! "http://localhost:3001/#(last id)" {
                body = '{ "foo": 123 }'
                headers = { 'content-type' = 'application/json' }
            }
            response.body.should.equal '{}'
            updated fid = last fid!
            updated fid.contents.foo.should.equal 123
