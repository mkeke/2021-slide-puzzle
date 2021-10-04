/*
    _env.js
    sets up behaviour based on the environment.

    if project is run from localhost or local file:
        console-logging via log() is enabled (env.debug = true)
    else
        console-logging via log() is disabled (env.debug = false)

    Env vars can be overridden
        env.debug = true ....... log() function is always enabled
        env.debug = false ...... log() function is always disabled
        
*/
const env = {

    debug: undefined, // true || false

    init: function() {

        if (window.location.hostname === "localhost"
            || /^file:\/\/\//.test(window.location.href)) {

            // dev environment
            if(env.debug === undefined) {
                env.debug = true;
            }

        } else {

            // prod environment
            if(env.debug === undefined) {
                env.debug = false;
            }
        }
        
        log(`debug = ${env.debug}`);
    }
};

/*
    log string to console if debug level allows it
*/
function log(s) {
    if (env.debug) {
        console.log(s);
    }
}
