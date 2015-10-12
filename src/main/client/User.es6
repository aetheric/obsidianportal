/* globals Map, Array, appdir, request_promise */

import Campaign from './Campaign.es6';
import * as utils from './utils.es6';

require('lazy-modules')([
	appdir + '/node_modules/request-promise'
]);

let basicFields = [
	'id',
	'username',
	'avatar_image_url',
	'profile_url',
	'created_at',
	'is_ascendant',
	'last_seen_at',
	'utc_offset'
];

export default class User extends Map {

	/**
	 *
	 * @param {Portal} portal
	 * @param {Object} data
	 * @param {String} data.id
	 * @param {String} data.username
	 * @param {String} data.avatar_image_url
	 */
	constructor(portal, data) {
		this.$portal = portal;
		this.$active = [];

		for (var field of basicFields) {
			utils.copyField(field, data, this);
		}

		if (typeof(data.campaigns) !== 'undefined') {
			this.$active.push('campaigns');
			this._campaigns = Array.map(data.campaigns, function(campaign) {
				return new Campaign(portal, campaign);
			});
		}

	}

	public get id() {
		return this._id;
	}

	public get username() {
		return this._username;
	}

	public get avatar_image_url() {
		return this._avatar_image_url;
	}

	public static function showMe(portal) {
		return request_promise({
			uri: `${portal.api_root}/users/me.json`,
			method: 'GET'

		}).then(function(response) {
			return new User(portal, response.data);

		});
	}

	public static function show(portal, userId) {
		return request_promise({
			uri: `${portal.api_root}/users/${userId}.json`,
			method: 'GET'

		}).then(function(response) {
			return new User(portal, response.data);

		});
	}

}
