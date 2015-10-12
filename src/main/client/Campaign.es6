/* globals Array, Map, request_promise, appdir */

import Portal from './Portal.es6';
import User from './User.es6';
import * as utils from './utils.es6';

require('lazy-modules')([
	appdir + '/node_modules/request-promise'
]);

let basicFields = [
	'id',
	'role',
	'slug',
	'visibility',
	'campaign_url',
	'name',
	'play_status',
	'looking_for_players',
	'created_at',
	'updated_at'
];

export default class Campaign extends Map {

	/**
	 *
	 * @param {Portal} portal
	 * @param {Object} data
	 * @parma {String} data.id
	 * @param {String} data.slug
	 * @param {String} data.name
	 * @param {Object} data.game_master
	 * @param {String} data.game_master.id
	 * @param {String} data.game_master.username
	 * @param {String} data.game_master.profile_url
	 * @param {String} data.game_master.avatar_image_url
	 * @param {String} data.play_status
	 * @param {Object[]} data.players
	 * @param {String} data.players[].id
	 * @param {String} data.players[].username
	 * @param {String} data.players[].profile_url
	 * @param {Object[]} data.fans
	 * @param {String} data.fans[].id
	 * @param {String} data.fans[].username
	 * @param {String} data.fans[].profile_url
	 * @param {Boolean} data.looking_for_players
	 * @param {Date} data.created_at
	 * @param {Date} data.updated_at
	 * @param {Object} data.location
	 * @param {Number} data.location.lat
	 * @param {Number} data.location.lng
	 */
	constructor(portal, data) {
		this.$portal = portal;
		this.$active = [];

		for (var field of basicFields) {
			utils.copyField(field, data, this);
		}

		if (typeof(data.game_master) !== 'undefined') {
			this.$active.push('game_master');
			this._game_master = new User(portal, data.game_master);
		}

		if (typeof(data.players) !== 'undefined') {
			this.$active.push('players');
			this._players = Array.map(data.players, function(player) {
				return new User(portal, player);
			});
		}

		if (typeof(data.fans) !== 'undefined') {
			this.$active.push('fans');
			this._fans = Array.map(data.fans, function(fan) {
				return new User(portal, fan);
			});
		}

	}

	public get id() {
		return this._id;
	}

	public get name() {
		return this._name;
	}

	public get campaign_url() {
		return this._campaign_url;
	}

	public get visibility() {
		return this._visibility;
	}

	public get role() {
		return this._role;
	}

	public function refresh() {
		return show(this.$portal, id);
	}

	/**
	 *
	 * @param {String} campaignId
	 * @param {Boolean} [useSlug]
	 * @returns {Promise}
	 */
	public static function show(portal, campaignId, useSlug = false) {
		let parsedUseSlug = useSlug ? 'true' : 'false';
		return request_promise({
			uri: `${portal.api_root}/campaigns/${campaignId}.json?use_slug=${parsedUseSlug}`,
			method: 'GET'

		}).then(function(response) {
			return new Campaign(portal, response.data);

		});
	}

}
