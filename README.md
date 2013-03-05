Fiddly
======

A framework for building single page HTML/JS apps like jsfiddle, codepen etc.

Fiddly supports 3 scenarios:

#### GET '/'
Ensures the user has a user-id cookie, creates a fiddle with a unique id, redirects to '/<fiddle-id>'

#### GET '/<fiddle-id>'
Renders the fiddle and provides an app-specific editing interface.

#### POST '/<fiddle-id>'
If the current user was the creator of the fiddle, it saves.

If the current user was not the creator of the fiddle, it forks, creating a new fiddle owned by the current user, then
redirects to GET '/<fiddle-id>'.

App-Specific (Client-Side) Code
-------------------------------
The client-side app does 3 things:

* Creates a fiddle (represented as a single JSON object)
* Loads a fiddle from persistent storage
* Saves the fiddle when the user edits it
