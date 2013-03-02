/*
 * Kita
 *
 * kObject.js
 *
 * The base Kita class. Everything extends this.
 *
 * @author Shann McNicholl (@shannmcnicholl)
 *
 * License Pending
 */

define(
["./is"],
function(is) {

    var CleanConstructor    =   function() {};

    function kObject() {
        this.id     =   this.generateGuid();

        // Call the initialize function, passing through any arguments
        // this constructor function received
        (is(this.initialize, "function")) && this.initialize.apply(this, arguments);

        return this;
    }


    /*
     * extend
     *
     * This is based heavily on the combination of
     * Backbone.js' extend and inherit methods
     */
    kObject.prototype.extend = function(prototypeProperties, classProperties) {
        var child, parent = this;

        // Set the constructor
        if (prototypeProperties && prototypeProperties.hasOwnProperty('constructor')) {
            child   =   prototypeProperties.constructor;
        } else {
            child   =   function() {
                            parent.apply(this, arguments);
                        };
        }

        // copy over any class properties from the parent
        this.copyProperties(child, parent);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        CleanConstructor.prototype  = parent.prototype;
        child.prototype             = new CleanConstructor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (prototypeProperties) {
            this.copyProperties(child.prototype, prototypeProperties);
        }

        // Add static properties to the constructor function, if supplied.
        if (classProperties) this.copyProperties(child, classProperties);

        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed later.
        child.prototype.__super__             = parent.prototype;

        // Copy over the class extender functions
        child.copyProperties        = this.copyProperties;
        child.extend                = this.extend;

        return child;
    };


    /*
     * copyProperties
     *
     * Copy all object properties into param 1 from all additional
     * arguments provided (n-1)
     *
     */
    kObject.prototype.copyProperties = function(obj) {
        var toCopy  =   Array.prototype.slice.call(arguments, 1),
            i       =   0,
            count   =   toCopy.length;
        
        for( ; i < count; i++) {
            for(var property in toCopy[i]) {
                obj[property]   =   toCopy[i][property];
            }
        }
        
        return obj;
    };


    /*
     * generateGuid
     *
     * Generate a unique ID
     *
     */
    kObject.prototype.generateGuid = function() {
        var uni = function () { return Math.floor(Math.random() * 0x10000).toString(16); };

        return (uni() + uni() + "-" + uni() + "-" + uni() + "-" + uni() + "-" + uni() + uni() + uni());
    };


    /*
     * convertArguments
     *
     * Convert a function's arguments variable into a proper array
     *
     */
    kObject.prototype.convertArguments = function(args) {
        return Array.prototype.slice.call(args);
    };


    kObject.extend          =   kObject.prototype.extend;
    kObject.copyProperties  =   kObject.prototype.copyProperties;

    return kObject;
});