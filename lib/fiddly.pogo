ajax = require 'ajax'.ajax
fork = require 'fork'.fork

fiddly root = 'http://fiddly.herokuapp.com/'

read fid id () =
    matches = document.location.pathname.match(r/\/(.+)/)
    if (matches)
        matches.1
    else
        throw ('No fid id found in location')
        
fid id = read fid id()

window.fiddly = {

    ready (callback) =
        this.load callback = callback

    save (state, callback) =
        fork
            try
                data = ajax! {
                    url =  fiddly root + fid id
                    type = "PUT"
                    data = state
                }
                if (callback)
                    callback()
            catch(ex)
                if (callback)
                    callback(null, {message = "Error saving fid '#(fid id)'", detail = ex})
                else
                    console.log("Error saving fid '#(fid id)'")
        
    load ()
        load callback = this.load callback
        fork
            try
                data = ajax! {
                    url =  fiddly root + fid id
                    type = "GET"
                }
                load callback(data)
            catch(ex)
                load callback(null, {message = "Error loading fid '#(fid id)'", detail = ex})
}

$()
    window.fiddly.load()