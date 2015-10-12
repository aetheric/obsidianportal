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

	public static get codes() {
		return {
			200: 'Success. This is the most common response when everything works normally.',
			201: 'Created. This is returned when something is created, like a new wiki page.',
			204: 'No Content. The server has received the request and acted on it, but nothing needs to be returned. ' +
					'Often returned from a delete request.',
			400: 'Request Error. The most common error response. Something was wrong with the request. Inspect the ' +
					'error messages for more information.',
			403: 'Forbidden. You are not authorized to see the resource. Often returned when requesting a private ' +
					'campaign or a gm-only page. Inspect the error message for more information.',
			404: 'Not Found. The resource you requested cannot be found.',
			500: 'Server Error. An error happened on the server. If it continues, please notify us and we\'ll look ' +
					'into it.',
			503: 'Service Unavailable. The server is temporarily down for maintenance. We do this quite often, so ' +
					'we highly suggest building your apps to be prepared for it. Note: No guarantee that the ' +
					'response body will be a valid format (ie. JSON or XML) so it\'s best to look for the 503 and ' +
					'stop parsing if it\'s found.'
		}
	}

}
