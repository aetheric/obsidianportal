/* globals Map */

import * as utils from './utils.es6';

let basicFields = [
	'message',
	'code'
];

export default class ErrorMessage extends Map {

	/**
	 *
	 * @param {Object} data
	 * @param {String} data.message
	 * @param {Number} data.code
	 */
	constructor(data) {
		this.$active = [];

		for (var field of data) {
			utils.copyField(field, data, this);
		}

	}

	public get message() {
		return this._message;
	}

	public get code() {
		return this._code;
	}

}
