/*
 * Kita
 *
 * controller.js
 *
 * The Kita controller class
 *
 * Shann McNicholl (@shannmcnicholl)
 */

define(
['./kObject', './icc', "./is"],
function(kObject, ICC, is) {

	var Controller = kObject.extend({

		// The Intra Controller Communicator
		icc:				ICC,

		// The first section of the icc namespace
		kitaControllerType:	'vanilla',

		// The second section of the icc namespace
		iccNamespace:		'controller',

		// The list of events that we listen for on the icc (these are prefixed)
		// by and this.kitaControllerType and this.iccNamespace. If the controller
		// wants to listen to events from other controllers then it should prepend
		// the full event namespace with the `@` symbol. This will prevent it from
		// having this.kitaControllerType and this.iccNamespace prepended to it.
		listeners:			null,

		/*
		 * constructor
		 *
		 */
		constructor: function kitaController(args) {
			// Merge in any global attributes
			(is(args, "object")) && this.copyProperties(this, args);

			// Register listeners on the ICC
			(is(this.registerListeners, "function")) && this.registerListeners();
			
			// Run the initialize function for the user
			(is(this.initialize, "function")) && this.initialize.apply(this, arguments);

			(is(this.delegateEvents, "function")) && this.delegateEvents();

			return this;
		},


		/*
		 * Initialize
		 *
		 */
		initialize: function() {},


		/*
		 * registerListeners
		 *
		 * Starts listening on the ICC
		 */
		registerListeners: function() {
			var namespace	=	this.getNamespace(),
				listener;

			// No ICC or listeners, so bomb out
			if(!is(this.icc, "object") || !is(this.listeners, "object"))	return false;

			for(listener in this.listeners) {
				// Don't prepend the namespace to remote event listners (identified by @)
				if(listener.substring(0, 1) === "@") {
					this.icc.on(listener.substring(1), this.listeners[listener], this);
				} else {
					this.icc.on(namespace +":"+ listener, this.listeners[listener], this);
				}
			}

			return true;
		},


		/*
		 * unRegisterListeners
		 *
		 * Stops listening on the ICC
		 */
		unRegisterListeners: function() {
			var namespace	=	this.getNamespace(),
				listener;

			// No ICC or listeners, so bomb out
			if(!this.icc || !this.listeners)	return false;

			for(listener in this.listeners) {
				if(listener.substring(0, 1) === "@") {
					this.icc.off(listener.substring(1), this.listeners[listener], this);
				} else {
					this.icc.off(namespace +":"+ listener, this.listeners[listener], this);
				}
			}

			return true;
		},


		/*
		 * getNamespace
		 *
		 * Returns the conjoined this.kitaControllerType and this.iccNamespace
		 */
		getNamespace: function() {
			return this.kitaControllerType +":"+ this.iccNamespace;
		}

	});

	return Controller;
});