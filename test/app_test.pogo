httpism = require 'httpism'
app = require '../app'

describe 'GET /'
    
    server = nil
    
    before
        server := app.listen(3000)
        
    after
        server.close()
    
    it 'redirects to /<new-fid-id>'
        response = httpism.get ! 'http://localhost:3000/'
        response.url.should.equal "/id"