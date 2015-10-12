/* globals require, appdir, request_promise, Promise */

import User from './objects/User.es6';
import MyUser from './objects/MyUser.es6';
import Campaign from './objects/Campaign.es6';

require('lazy-modules')([
	appdir + '/node_modules/request-promise'
]);

export default class Portal {

	contructor(options) {
		this.api_root = options.api_root || 'http://www.obsidianportal.com/v1';
	}

	function userShowMe() {
		return request_promise({
			uri: `${this.api_root}/users/me.json`,
			method: 'GET'

		}).then(function(response) {
			return new MyUser(response.data);

		});
	}

	function userShow(userId) {
		return request_promise({
			uri: `${this.api_root}/users/${userId}.json`,
			method: 'GET'

		}).then(function(response) {
			return new User(response.data);

		});
	}

	/**
	 *
	 * @param {String} campaignId
	 * @param {Boolean} [useSlug]
	 * @returns {Promise}
	 */
	function campaignShow(campaignId, useSlug = false) {
		let parsedUseSlug = useSlug ? 'true' : 'false';
		return request_promise({
			uri: `${this.api_root}/campaigns/${campaignId}.json?use_slug=${parsedUseSlug}`,
			method: 'GET'

		}).then(function(response) {
			return new Campaign(response.data);

		});
	}

	function charactersIndex() {

	}

	function characterShow() {

	}

	function charactersCreate() {

	}

	function charactersUpdate() {

	}

	function charactersDelete() {

	}

}

