/*
 * Kita
 *
 * pubsub.js
 *
 * The pubSub library within the Kita JS framework
 *
 * Shann McNicholl (@shannmcnicholl)
 *
 * License Pending.
 */

define(
['kita/utils'],
function(Utils) {
	function pubSub() {
		this._callbacks			=	{};
		this._callbacksLength	=	0;
	}


	/*
	 * bind
	 *
	 * Bind/Register/Subscribe to 1 or more events (separated by a space)
	 */ 
	pubSub.prototype.bind = function bind(ev, callback, context) {
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
	};


	/*
	 * on
	 *
	 * A wrapper for the bind function
	 */
	pubSub.prototype.on = function on() {
		return this.bind.apply(this, arguments);
	};


	/*
	 * unbind
	 *
	 * Unbind/Unregister/Unsubscribe a listener from a callback
	 */
	pubSub.prototype.unbind = function unbind(ev, callback) {
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
			if(typeof events[i] !== "object" || events[i].callback !== callback) continue;

			// Remove this binding
			events.splice(i, 1);
			this._callbacksLength--;
			unbound = true;
		}

		this._callbacks[ev]	=	events;

		return unbound;
	};


	/*
	 * off
	 *
	 * A wrapper for the bind function
	 */
	pubSub.prototype.off = function off() {
		return this.unbind.apply(this, arguments);
	};


	/*
	 * trigger
	 *
	 * Trigger/publish/fire an event
	 */
	pubSub.prototype.trigger = function trigger(ev)  {
		var args, listeners, i, count;

		args		=	Utils.convertArguments(arguments);

		// Invalid input or no listeners on this event
		if(!ev || !this._callbacks[ev])	return false;


		args		=	args.length > 1  ? args.slice(1) : [];
		listeners	=	this._callbacks[ev];

		if(!Array.isArray(listeners)) {
			// Correct this issue
			this._callbacks[ev]	=	[];
			return false;
		}

		for(i = 0, count = listeners.length; i < count; i++) {
			if(typeof listeners[i] !== "object")	continue;

			this._call(listeners[i].callback, args, listeners[i].context);
		}

		return true;
	};


	/*
	 * getAllListeners
	 *
	 * Returns the _callbacks array
	 */
	pubSub.prototype.getAllListeners = function getAllListeners() {
		return this._callbacks;
	};


	/*
	 * getListenerLength
	 *
	 * Returns _callbacksLength
	 */
	pubSub.prototype.getListenerLength = function getListenerLength() {
		return this._callbacksLength;
	};
	

	/*
	 * _call
	 *
	 */
	pubSub.prototype._call = function _call(fn, args, context) {
		setTimeout(function() {
			fn.apply(context, args);
		});

		return true;
	};

	return pubSub;
});