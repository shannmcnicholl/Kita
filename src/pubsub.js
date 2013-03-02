/*
 * Kita
 *
 * pubsub.js
 *
 * The pubSub library within the Kita JS framework
 *
 * @author Shann McNicholl (@shannmcnicholl)
 *
 * License Pending.
 */

define(
['./kObject', "./is"],
function(kObject, is) {

	var pubSub	=	kObject.extend({

		constructor:	function pubSub(options) {
			this._callbacks			=	{};
			this._callbacksLength	=	0;
			this.asyncEvents		=	false;		// Default to synchronous events, helps with debugging

			if(!is(options, "object")) return this;

			for(var option in options) {
				this[option]	=	options[option];
			}

			return this;
		},


		/*
		 * bind
		 *
		 * Bind/Register/Subscribe to 1 or more events (separated by a space)
		 */
		bind:	function(ev, callback, context) {
			var events, i, count;

			if(!ev || !callback) return false;

			events	=	ev.split(" ");

			for(i = 0, count = events.length; i < count; i++) {
				// Set the callback holder for this event to an array
				this._callbacks[events[i]] = Array.isArray(this._callbacks[events[i]]) ? this._callbacks[events[i]] : [];

				// Now add the callback and its context
				this._callbacks[events[i]].push({
					callback:	callback,
					context:	context
				});

				this._callbacksLength++;
			}

			return true;
		},


		/*
		 * on
		 *
		 * A wrapper for the bind function
		 */
		on: function() {
			return this.bind.apply(this, arguments);
		},


		/*
		 * unbind
		 *
		 * Unbind/Unregister/Unsubscribe a listener from an event
		 */
		unbind: function unbind(ev, callback) {
			var events, i = 0, count, unbound = false;

			// Invalid input
			if(!ev || !callback)		return false;

			// This event was never bound
			if(!this._callbacks[ev])	return false;

			events	=	this._callbacks[ev];
			if(!Array.isArray(events))	{
				// This should always be an array
				this._callbacks[ev] = [];
				return false;
			}

			for(count = events.length; i < count; i++) {
				if(!is(events[i], "object") || events[i].callback !== callback) continue;

				// Remove this binding
				events.splice(i, 1);
				this._callbacksLength--;
				unbound = true;
			}

			// Remove the event key if no events are attached.
			if(events.length) {
				this._callbacks[ev]	=	events;
			} else {
				delete(this._callbacks[ev]);
			}

			return unbound;
		},


		/*
		 * off
		 *
		 * A wrapper for the bind function
		 */
		off: function() {
			return this.unbind.apply(this, arguments);
		},


		/*
		 * trigger
		 *
		 * Trigger/publish/fire an event
		 */
		trigger: function(ev)  {
			var args, listeners, i, count;

			args		=	this.convertArguments(arguments);

			// Invalid input or no listeners on this event
			if(!ev || !this._callbacks[ev])	return false;


			args		=	args.length > 1  ? args.slice(1) : [];
			listeners	=	this._callbacks[ev];

			if(!Array.isArray(listeners)) {
				// Correct this issue
				this._callbacks[ev]	=	[];
				return false;
			}

			// Loop through the listeners
			for(i = 0, count = listeners.length; i < count; i++) {
				// We need a callback function
				if(!is(listeners[i], "object") || !is(listeners[i].callback, "function"))	continue;

				this._callFunction(listeners[i].callback, args, listeners[i].context);
			}

			return true;
		},


		/*
		 * _callFunction
		 *
		 * Calls the given function in a sync or async manner
		 * depending on this.asyncEvents
		 */
		_callFunction: function(fn, args, context) {
			if(!this.asyncEvents) {
				// Sync
				fn.apply(context, args);
			} else {
				// Async
				setTimeout(function() {
					fn.apply(context, args);
				});
			}

			return true;
		},


		/*
		 * getAllListeners
		 *
		 * Returns the _callbacks array
		 */
		getAllListeners: function getAllListeners() {
			return this._callbacks;
		},


		/*
		 * getListenerLength
		 *
		 * Returns _callbacksLength
		 */
		getListenerLength: function getListenerLength() {
			return this._callbacksLength;
		},


		/*
		 * reset
		 *
		 * Cleanses all callbacks
		 */
		reset: function() {
			this._callbacks			=	{};
			this._callbacksLength	=	0;
		}
	});
	

	return pubSub;
});