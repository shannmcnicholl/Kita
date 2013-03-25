/*
 * Kita
 *
 * when.js
 *
 * A handy helper to test a condition repeatedly until
 * it is true or the timer runs out
 *
 * Shann McNicholl (@shannmcnicholl)
 *
 * License Pending
 */

define(
["./is"],
function(is) {

    var defaultTimeout  =   60000;  // 60 Seconds
        
    var When = function(test, then, timeout) {

        // We need functions
        if(!is(test, "function") || !is(then, "function"))  return false;
        
        var start   =   new Date().getTime(),
            timeout =   new Date().getTime() + (is(timeout, "number") ? timeout : defaultTimeout,
            inte    =   setInterval(function() {
                            if(!!test()) {
                                // The test was successful
                                clearInterval(inte);
                                then();
                            }

                            // Timed out?
                            if(start > timeout) {
                                clearInterval(inte);
                            }

                            return;
                        });

        // Return the interval incase the caller wishes to manaully clear it
        return inte;
    }

    return When;
});