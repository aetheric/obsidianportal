/* globals Map */

import ErrorMessage from './ErrorMessage.es6';
import * as utils from './utils.es6';

export default class Error extends Map {

	/**
	 *
	 * @param {Object} data
	 * @param {Number} data.http_status
	 * @param {Object[]} data.errors
	 * @param {String} data.errors[].message
	 * @param {Number} [data.errors[].code]
	 */
	constructor(data) {
		this.$active = [];

		utils.copyField('http_status', data, this);

		if (typeof(data.errors) !== 'undefined') {
			this.$active.push('errors');
			this._errors = data.errors.map(function(error) {
				return new ErrorMessage(error);
			});
		}

	}

	public get http_status() {
		return this._http_status;
	}

	public get errors() {
		return this._errors;
	}

}
