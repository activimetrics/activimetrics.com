# activimetrics.com

  The Activimetrics website

## Installation

    $ npm install
    $ component install
    $ make
    
## Execution

    $ node server.js
    
## Organization

    ./server.js                                # the web server, uses express
    ./views/*.jade                             # html templates
    ./client/boot/                             # client-side javascript and css, in component_js format
    ./client/component-theleagueof-raleway/    # Raleway font packaged as a local component
    
## Details

There's only one page.  It's in `views/index.jade`.  Client-side javascript is managed using 
[component.js][https://github.com/component/componentio] and implemented in client/boot. 
We're using bootstrap and font-awesomefor styling along with some web fonts---some packaged 
as components.  See component.json for the complete list of components used.
