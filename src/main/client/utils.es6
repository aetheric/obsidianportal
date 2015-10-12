/* globals */

/**
 * Copies data from one object to another and marks the field as active.
 * @param {String} field
 * @param {Object} from
 * @param {Object} to
 */
export function copyField(field, from, to) {
	if (typeof(from[field]) !== 'undefined') {

		// Copy the value.
		to[`_${field}`] = from[field];

		// Mark the field as active
		to.$active.push(field);

	}
}
