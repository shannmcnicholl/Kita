/*
 * Kita
 *
 * dataController.js
 *
 * A Data controller handles the CRUD operations for models and provides an
 * interface to other data or ui controllers to request models (via the ICC).
 *
 * Shann McNicholl (@shannmcnicholl)
 */
define(
['./controller'],
function(Controller) {

	var dataController	=	Controller.extend({

		// The first section of the icc namespace
		kitaControllerType:	'data',

		// The second section of the icc namespace
		iccNamespace:		'controller',


		/*
		 * Initialize
		 *
		 */
		initialize: function() {

		},


		/*
		 * remove
		 *
		 * Remove/Destroy is the shutdown/delete method for this controller
		 * It stops listening on the ICC. This function should be overloaded
		 * in order to also unbind listeners attached to collections
		 */
		remove: function() {
			this.unRegisterListeners();
		}

	});

	return dataController;
});