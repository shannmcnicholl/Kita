/*
 * Kita
 *
 * is.js
 *
 * The `is` function determine the type of a given param against another.
 *
 * Stupid PhantomJS and it's bugs: http://stackoverflow.com/questions/14218670/why-are-null-and-undefined-of-the-type-domwindow
 * This function would be a couple of lines long if not for this bug
 *
 * @author Shann McNicholl (@shannmcnicholl)
 *
 * License Pending
 */

define(function() {
	function is(obj, type) {
		var it;

		if(typeof type !== "string")	return false;

		it	=	Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
		if(it === "domwindow") {
			if(obj === undefined)	it = "undefined";
			if(obj === null)		it = "null";
		}

		return (it === type.toLowerCase());
	}

	return is;
});