Fiddly
======

A framework for building single page HTML/JS apps like jsfiddle, codepen etc.

Fiddly supports 3 scenarios:

#### GET '/'
Ensures the user has a user-id cookie, creates a fid with a unique id, redirects to '/:fid-id'

#### GET '/:fid-id'
Renders the fid and provides an app-specific editing interface.

#### PUT '/:fid-id'
Saves the fid.

App-Specific (Client-Side) Code
-------------------------------
The client-side app does 2 things:

* Loads a fid from persistent storage
* Saves the fid when the user edits it
