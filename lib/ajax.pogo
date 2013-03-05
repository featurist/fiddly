unpromise (promise, callback) =
    promise.success @(data, status, xmlHttpRequest)
        callback (nil, {data = data, status = status, xmlHttpRequest = xmlHttpRequest})
    .error @(data, status, xmlHttpRequest, config)
        callback ({data = data, status = status, xmlHttpRequest = xmlHttpRequest})

ajax! (options) =

    if (@not options.headers)
        options.headers = {}

    options.headers."X-Requested-With" = "xmlhttprequest"

    unpromise! ($.ajax (options))

exports.ajax = ajax