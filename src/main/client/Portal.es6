/* globals require, Promise */

import User from './objects/User.es6';
import MyUser from './objects/MyUser.es6';
import Campaign from './objects/Campaign.es6';

let request = require('request-promise');

export default class Portal {

	/**
	 * @param {String} [api_host]
	 */
	contructor(api_host = 'http://www.obsidianportal.com') {
		this._api_host = api_host;
	}

	/**
	 * @returns {string}
	 */
	private get apiHost() {
		return this._api_host;
	}

	/**
	 * @returns {string}
	 */
	private get apiRoot() {
		return `${apiHost}/v1`;
	}

	/**
	 * @returns {string}
	 */
	private get apiAuth() {
		return `${apiHost}/oauth`;
	}

	/**
	 * @param [userId] The user identifier, or if not provided, the logged-in user.
	 * @param [useUsername] Whether the userId provided is an identifier, or username.
	 * @returns {Promise<User>} A promise resolving to the user object.
	 */
	public function getUser(userId, useUsername = false) {
		return request({
			uri: `${apiRoot}/users/${ userId || 'me' }.json`,
			method: 'GET',
			params: {
				use_username: useUsername
			}

		}).then(function(response) {
			return new User(this, response.data);
		});
	}

	/**
	 * @param {String} campaignId Either the campaign identifier, or the slug.
	 * @param {Boolean} [useSlug] Whether the campaignId is a slug or not.
	 * @returns {Promise<Campaign>} A promise resolving to a Campaign object.
	 */
	public function getCampaign(campaignId, useSlug = false) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}.json`,
			method: 'GET',
			params: {
				use_slug: useSlug
			}

		}).then(function(response) {
			return new Campaign(this, response.data);
		});
	}

}

