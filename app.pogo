http = require 'http'

port = process.env.PORT || 3000

http.createServer @(req, res)
    res.writeHead (200, 'Content-Type': 'text/plain')
    res.end "Hello World\n"
.listen (port, "0.0.0.0")

console.log "Server running at http://127.0.0.1:#(port)"