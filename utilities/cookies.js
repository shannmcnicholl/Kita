/*
 * Kita
 *
 * cookies.js
 *
 * A handy helper to CRUD client side cookies
 *
 * Shann McNicholl (@shannmcnicholl)
 *
 * License Pending
 */
define(
["../src/is"],
function(is) {

    if(!is(document, "htmldocument") || !is(document.cookie, "string"))   return false;

    return {

        /*
         * getAll
         *
         * Returns an object containing all existing cookies
         */
        getAll: function() {
            var cookies =   {};

            document.cookie.split("; ").forEach(function(cookie) {
                // Skip empty cookies
                if(cookie === "")   return false;

                cookie  =   cookie.split("=");
                cookies[cookie[0]]  =   cookie[1];

                return true;
            });

            return cookies;
        },


        /*
         * get
         *
         * Returns the value of the given cookie, otherwise `undefined`
         */
        get: function(name) {
            var cookies =   this.getAll();

            if(!is(cookies, "object"))  return undefined;

            return cookies[name]; // returns the value or undefined
        },


        /*
         * set
         *
         * Sets a new cookie or updates an existing one
         */
        set: function(name, value, expires, path, domain, secure) {
            var cookie = [];

            if(!is(name, "string")) return false;

            cookie.push(name +"="+ value);

            // Optional
            if(is(expires, "number"))   cookie.push(" expires="+ this.getExpiresDate(expires));
            if(is(path, "string"))      cookie.push(" path="+ path);
            if(is(domain, "string"))    cookie.push(" domain="+ domain);
            if(secure)                  cookie.push(" secure");

            document.cookie  =   cookie.join(";") +";";

            return true;
        },


        /*
         * delete
         *
         * Immediately expires a cookie
         */
        delete: function(attr) {
            if(!is(attr, "string")) return false;

            this.set(attr, null, -1);

            return true;
        },


        /*
         * deleteAll
         *
         * Cycles through and deletes all cookies
         */
        deleteAll: function() {
            var cookies =   this.getAll();

            for(var c in cookies) {
                this.delete(c);
            }

            return true;
        },


        /*
         * getExpiresDate
         *
         * Returns a GMT Date string that is x `days` in advance of `right now`
         */
        getExpiresDate: function(days) {
            return (new Date(new Date().getTime() + days * 1000 * 60 * 60 * 24)).toGMTString();
        }
    }
});