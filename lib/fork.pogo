exports.fork (block) =
    block with exception handling! () =
        try
            block! ()
        catch (error)
            if (error.stack)
                console.log (error.stack)
            else
                console.log (error)

    block with exception handling @{}