/* globals */
'use strict';

export default class ErrorMessage {

	/**
	 * @param {Object} data
	 * @param {String} data.message
	 * @param {Number} data.code
	 */
	constructor(data) {
		this.$data = data;
	}

	get message() {
		return this.$data.message;
	}

	get code() {
		return this.$data.code;
	}

	static get codes() {
		return {
			4010: 'INVALID_PARAMETER_VALUE: The passed parameter has an invalid value, such as an ill-formed e-mail ' +
			'address. Inspect the error message for more detail.',
			4020: 'CAMPAIGN_VISIBILITY_RESTRICTED: The requested campaign is not visible to you.',
			4030: 'GM_ONLY_RESOURCE: The requested resource is set to gm-only, and you are not the game master.',
			4040: 'CAMPAIGN_MEMBER_REQUIRED: The requested resource can only be modified by a campaign member.',
			4050: 'AUTHOR_OR_GM_REQUIRED: The requested resource can only be modified by the author or the GM.',
			4060: 'ASCENDANT_ONLY: The requested action is only available to Ascendant members.'
		};
	}

}
