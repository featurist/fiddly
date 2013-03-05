ajax = require 'ajax'.ajax
fork = require 'fork'.fork

fiddly root = '/'

read fid id () =
    matches = document.location.pathname.match(r/\/(.+)/)
    if (matches)
        matches.1
    else
        throw ('No fid id found in location')
        
fid id = read fid id()

window.fiddly = {

    save (state, callback) =
        fork
            try
                data = ajax! {
                    url =  fiddly root + fid id
                    type = "PUT"
                    data = JSON.stringify(state)
                    dataType = 'json'
                    contentType = "application/json"                  
                }
                if (callback)
                    callback()
            catch(ex)
                if (callback)
                    callback({message = "Error saving fid '#(fid id)'", detail = ex})
                else
                    console.log("Error saving fid '#(fid id)'")
        
    ready (load callback) =
        fork
            try
                data = ajax! {
                    url =  "#(fiddly root)#(fid id).json"
                    type = "GET"
                    dataType= "json"
                    contentType = "application/json"
                }.data
                load callback(null, data)
            catch(ex)
                load callback({message = "Error loading fid '#(fid id)'", detail = ex})
}