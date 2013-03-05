
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      name = name.replace(/\\/g, '/');
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"ajax": function(exports, require, module) {(function() {
    var self = this;
    var unpromise, ajax;
    unpromise = function(promise, callback) {
        return promise.success(function(data, status, xmlHttpRequest) {
            return callback(void 0, {
                data: data,
                status: status,
                xmlHttpRequest: xmlHttpRequest
            });
        }).error(function(data, status, xmlHttpRequest, config) {
            return callback({
                data: data,
                status: status,
                xmlHttpRequest: xmlHttpRequest
            });
        });
    };
    ajax = function(options, continuation) {
        var gen1_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        continuation = arguments[arguments.length - 1];
        if (!(continuation instanceof Function)) {
            throw new Error("asynchronous function called synchronously");
        }
        options = gen1_arguments[0];
        if (!options.headers) {
            options.headers = {};
        }
        options.headers["X-Requested-With"] = "xmlhttprequest";
        unpromise($.ajax(options), continuation);
    };
    exports.ajax = ajax;
}).call(this);}, "fiddly": function(exports, require, module) {(function() {
    var self = this;
    var gen1_asyncTry, ajax, fork, fiddlyRoot, readFidId, fidId;
    gen1_asyncTry = function(body, catchBody, finallyBody, cb) {
        var callbackCalled = false;
        var callback = function(error, result) {
            if (!callbackCalled) {
                callbackCalled = true;
                cb(error, result);
            }
        };
        try {
            body(function(error, result) {
                if (error) {
                    if (finallyBody && catchBody) {
                        try {
                            catchBody(error, function(error, result) {
                                try {
                                    finallyBody(function(finallyError) {
                                        callback(finallyError || error, finallyError || error ? undefined : result);
                                    });
                                } catch (error) {
                                    callback(error);
                                }
                            });
                        } catch (error) {
                            try {
                                finallyBody(function(finallyError) {
                                    callback(finallyError || error);
                                });
                            } catch (error) {
                                callback(error);
                            }
                        }
                    } else if (catchBody) {
                        try {
                            catchBody(error, callback);
                        } catch (error) {
                            callback(error);
                        }
                    } else {
                        try {
                            finallyBody(function(finallyError) {
                                callback(finallyError || error, finallyError ? undefined : result);
                            });
                        } catch (error) {
                            callback(error);
                        }
                    }
                } else {
                    if (finallyBody) {
                        try {
                            finallyBody(function(finallyError) {
                                callback(finallyError, finallyError ? undefined : result);
                            });
                        } catch (error) {
                            callback(error);
                        }
                    } else {
                        callback(undefined, result);
                    }
                }
            });
        } catch (error) {
            if (finallyBody && catchBody) {
                try {
                    catchBody(error, function(error, result) {
                        try {
                            finallyBody(function(finallyError) {
                                callback(finallyError || error, finallyError ? undefined : result);
                            });
                        } catch (error) {
                            callback(error);
                        }
                    });
                } catch (error) {
                    try {
                        finallyBody(function(finallyError) {
                            callback(finallyError || error);
                        });
                    } catch (error) {
                        callback(error);
                    }
                }
            } else if (catchBody) {
                try {
                    catchBody(error, callback);
                } catch (error) {
                    callback(error);
                }
            } else {
                try {
                    finallyBody(function(finallyError) {
                        callback(finallyError || error);
                    });
                } catch (error) {
                    callback(error);
                }
            }
        }
    };
    ajax = require("ajax").ajax;
    fork = require("fork").fork;
    fiddlyRoot = "/";
    readFidId = function() {
        var matches;
        matches = document.location.pathname.match(/\/(.+)/);
        if (matches) {
            return matches[1];
        } else {
            throw "No fid id found in location";
        }
    };
    fidId = readFidId();
    window.fiddly = {
        save: function(state, callback) {
            var self = this;
            return fork(function(continuation) {
                var gen2_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = arguments[arguments.length - 1];
                if (!(continuation instanceof Function)) {
                    throw new Error("asynchronous function called synchronously");
                }
                gen1_asyncTry(function(continuation) {
                    var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = arguments[arguments.length - 1];
                    if (!(continuation instanceof Function)) {
                        throw new Error("asynchronous function called synchronously");
                    }
                    ajax({
                        url: fiddlyRoot + fidId,
                        type: "PUT",
                        data: JSON.stringify(state),
                        dataType: "json",
                        contentType: "application/json"
                    }, function(gen4_error, gen5_asyncResult) {
                        var data;
                        if (gen4_error) {
                            continuation(gen4_error);
                        } else {
                            try {
                                data = gen5_asyncResult;
                                if (callback) {
                                    continuation(void 0, callback());
                                } else {
                                    continuation();
                                }
                            } catch (gen6_exception) {
                                continuation(gen6_exception);
                            }
                        }
                    });
                }, function(ex, continuation) {
                    var gen7_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = arguments[arguments.length - 1];
                    if (!(continuation instanceof Function)) {
                        throw new Error("asynchronous function called synchronously");
                    }
                    ex = gen7_arguments[0];
                    if (callback) {
                        continuation(void 0, callback({
                            message: "Error saving fid '" + fidId + "'",
                            detail: ex
                        }));
                    } else {
                        continuation(void 0, console.log("Error saving fid '" + fidId + "'"));
                    }
                }, void 0, continuation);
            });
        },
        ready: function(loadCallback) {
            var self = this;
            return fork(function(continuation) {
                var gen8_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = arguments[arguments.length - 1];
                if (!(continuation instanceof Function)) {
                    throw new Error("asynchronous function called synchronously");
                }
                gen1_asyncTry(function(continuation) {
                    var gen9_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = arguments[arguments.length - 1];
                    if (!(continuation instanceof Function)) {
                        throw new Error("asynchronous function called synchronously");
                    }
                    ajax({
                        url: fiddlyRoot + "" + fidId + ".json",
                        type: "GET",
                        dataType: "json",
                        contentType: "application/json"
                    }, function(gen10_error, gen11_asyncResult) {
                        var data;
                        if (gen10_error) {
                            continuation(gen10_error);
                        } else {
                            try {
                                data = gen11_asyncResult.data;
                                continuation(void 0, loadCallback(null, data));
                            } catch (gen12_exception) {
                                continuation(gen12_exception);
                            }
                        }
                    });
                }, function(ex, continuation) {
                    var gen13_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = arguments[arguments.length - 1];
                    if (!(continuation instanceof Function)) {
                        throw new Error("asynchronous function called synchronously");
                    }
                    ex = gen13_arguments[0];
                    continuation(void 0, loadCallback({
                        message: "Error loading fid '" + fidId + "'",
                        detail: ex
                    }));
                }, void 0, continuation);
            });
        }
    };
}).call(this);}, "fork": function(exports, require, module) {(function() {
    var self = this;
    var gen1_asyncTry;
    gen1_asyncTry = function(body, catchBody, finallyBody, cb) {
        var callbackCalled = false;
        var callback = function(error, result) {
            if (!callbackCalled) {
                callbackCalled = true;
                cb(error, result);
            }
        };
        try {
            body(function(error, result) {
                if (error) {
                    if (finallyBody && catchBody) {
                        try {
                            catchBody(error, function(error, result) {
                                try {
                                    finallyBody(function(finallyError) {
                                        callback(finallyError || error, finallyError || error ? undefined : result);
                                    });
                                } catch (error) {
                                    callback(error);
                                }
                            });
                        } catch (error) {
                            try {
                                finallyBody(function(finallyError) {
                                    callback(finallyError || error);
                                });
                            } catch (error) {
                                callback(error);
                            }
                        }
                    } else if (catchBody) {
                        try {
                            catchBody(error, callback);
                        } catch (error) {
                            callback(error);
                        }
                    } else {
                        try {
                            finallyBody(function(finallyError) {
                                callback(finallyError || error, finallyError ? undefined : result);
                            });
                        } catch (error) {
                            callback(error);
                        }
                    }
                } else {
                    if (finallyBody) {
                        try {
                            finallyBody(function(finallyError) {
                                callback(finallyError, finallyError ? undefined : result);
                            });
                        } catch (error) {
                            callback(error);
                        }
                    } else {
                        callback(undefined, result);
                    }
                }
            });
        } catch (error) {
            if (finallyBody && catchBody) {
                try {
                    catchBody(error, function(error, result) {
                        try {
                            finallyBody(function(finallyError) {
                                callback(finallyError || error, finallyError ? undefined : result);
                            });
                        } catch (error) {
                            callback(error);
                        }
                    });
                } catch (error) {
                    try {
                        finallyBody(function(finallyError) {
                            callback(finallyError || error);
                        });
                    } catch (error) {
                        callback(error);
                    }
                }
            } else if (catchBody) {
                try {
                    catchBody(error, callback);
                } catch (error) {
                    callback(error);
                }
            } else {
                try {
                    finallyBody(function(finallyError) {
                        callback(finallyError || error);
                    });
                } catch (error) {
                    callback(error);
                }
            }
        }
    };
    exports.fork = function(block) {
        var self = this;
        var blockWithExceptionHandling;
        blockWithExceptionHandling = function(continuation) {
            var gen2_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            continuation = arguments[arguments.length - 1];
            if (!(continuation instanceof Function)) {
                throw new Error("asynchronous function called synchronously");
            }
            gen1_asyncTry(function(continuation) {
                var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = arguments[arguments.length - 1];
                if (!(continuation instanceof Function)) {
                    throw new Error("asynchronous function called synchronously");
                }
                block(continuation);
            }, function(error, continuation) {
                var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = arguments[arguments.length - 1];
                if (!(continuation instanceof Function)) {
                    throw new Error("asynchronous function called synchronously");
                }
                error = gen4_arguments[0];
                if (error.stack) {
                    continuation(void 0, console.log(error.stack));
                } else {
                    continuation(void 0, console.log(error));
                }
            }, void 0, continuation);
        };
        return blockWithExceptionHandling(function() {});
    };
}).call(this);}});
