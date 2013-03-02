/*
 * Kita
 *
 * icc.js
 *
 * ICC (Intra Controller Communicator)
 *
 * Each Controller gets a reference to the ICC so that they can converse
 * in a decoupled manner.
 *
 * This class is deliberately a singleton.
 *
 * Shann McNicholl (@shannmcnicholl)
 *
 * License pending.
 */
define(
["./pubsub"], function(Pubsub) {

	var ICC = Pubsub.extend({});

	return new ICC();
});