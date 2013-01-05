/*
 * Kita
 *
 * debug.js
 *
 * A debug library within the Kita JS framework
 *
 * Shann McNicholl (@shannmcnicholl)
 *
 * License Pending.
 */

define(
[],
function() {

	if(!window || !window.console)  {
		return {
			log:	function() {},
			warn:	function() {},
			error:	function() {},
			trace:	function() {}
		};
	}

	return {
		// Debug is on by default
		debug:	true,

		log:	function log(msg) {
			if(!this.debug || !msg) return false;	// debugging is off

			window.console.log("["+ log.caller.name +"]", msg, this.getArguments(arguments, true));

			return true;
		},

		warn:	function warn(msg) {
			if(!this.debug || !msg) return false;	// debugging is off
			window.console.warn("["+ warn.caller.name +"]", msg);

			return true;
		},

		error:	function error(msg) {
			if(!this.debug || !msg) return false;	// debugging is off
			window.console.error("["+ error.caller.name +"]", msg);

			return true;
		},

		trace:	function trace() {
			if(!this.debug) return false;	// debugging is off
			window.console.trace();

			return true;
		},

		getArguments: function getArguments(args, skipFirst) {
			var items = [], i = 0, count;

			if(typeof skipFirst === "undefined") skipFirst = true;

			if(!args || (typeof args !== "object") || !args.length) return [];

			if(skipFirst) i++;

			for(count = args.length; i < count; i++) {
				items.push(args[i]);
			}

			return items;
		}
	};
});