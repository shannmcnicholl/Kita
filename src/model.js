/*
 * Kita
 *
 * model.js
 *
 * The Kita moodel class
 *
 * Shann McNicholl (@shannmcnicholl)
 */

define(
['./kObject', './pubsub', "./is"],
function(kObject, PubSub, is)  {

    var Model   =   kObject.extend({

        /*
         * constructor
         *
         * Custom constructor for the  App class
         */
        constructor: function kitaModel(attrs, options) {
            this.id             =   this.generateGuid();

            this.attributes     =   {};

            options             =   is(options, "object") ? options : {};
            
            // Merge in the PubSub constructor
            PubSub.call(this);

            this.setAttributes(attrs, options.silent);

            // Call the initialize function with any params the constructor has
            if(is(this.initialize, "function"))  {
                this.initialize.apply(this, arguments);
            }

            return this;
        },


        /*
         * set
         *
         * Set attributes on this model via the set function
         * to ensure that all change listeners here about it
         */
        set: function(attr, value, silent) {
            var prevValue   =   null;

            if(is(attr, "undefined")) return false;

            // Don't set something that we already have
            if(this.attributes[attr] === value) return false;

            prevValue               =   this.attributes[attr];
            this.attributes[attr]   =   value;

            // Trigger the change events if the set is not silent
            if(!silent) {
                // Trigger the specific attr change event
                this.trigger("change:"+ attr, value, prevValue);

                // Trigger the global object change event
                this.trigger("change", attr, value, prevValue);
            }

            return true;
        },


        /*
         * Set Attributes
         *
         * Takes an object and sets each attribute in it
         */
        setAttributes: function(attrs, silent) {
            var attr;

            if(!is(attrs, "object"))    return false;

            for(attr in attrs) {
                this.set(attr, attrs[attr], silent);
            }

            return true;
        },


        /*
         * get
         *
         * Get an attribute from the model
         */
        get: function(attr) {
            // We need a string based attribute key
            if(!is(attr, "string")) return undefined;

            if(attr) return this.attributes[attr];
        },


        /*
         * destroy
         *
         * Properly shuts down the model
         */
        destroy: function() {
            // Remove listeners
            this._callbacks         =   {};
            this._callbacksLength   =   0;
        }
    });


    // Merge in the PubSub library so that changes can be bound.
    kObject.copyProperties(Model.prototype, PubSub.prototype);

    return Model;
});