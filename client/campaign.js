/* globals Array, Promise */

import User from './user.js';

/**
 * @typedef  {Object}           GetCampaignResponse
 * @property {String}           id                              An identifier for the campaign. This will never
 *                                                                  change.
 * @property {String}           slug                            A URL-friendly slug for the campaign. The user can
 *                                                                  change this.
 * @property {String}           campaign_url                    The URL to the campaign homepage.
 * @property {String}           visibility                      The visibility of the campaign. Can be 'public',
 *                                                                  'friends', or 'private'
 * @property {Object}           game_master                     The game master of the campaign.
 * @property {String}           game_master.id                  {@link GetUserResponse.id}
 * @property {String}           game_master.username            {@link GetUserResponse.username}
 * @property {String}           game_master.profile_url         {@link GetUserResponse.profile_url}
 * @property {String}           game_master.avatar_image_url    {@link GetUserResponse.avatar_image_url}
 * @property {Date}             created_at                      Indicates when the campaign was first created.
 *                                                                  ISO-8601 timestamp
 * @property {Date}             updated_at                      Indicates when the campaign was last updated. ISO-8601
 *                                                                  timestamp
 * @property {String}           banner_image_url                The URL to the campaign banner.
 * @property {String}           play_status                     The current play status of the campaign
 * @property {Array<Object>}    players                         An array of user mini-objects for the campaign's
 *                                                                  players
 * @property {String}           players[].id                    {@link GetUserResponse.id}
 * @property {String}           players[].username              {@link GetUserResponse.username}
 * @property {String}           players[].profile_url           {@link GetUserResponse.profile_url}
 * @property {Array<Object>}    fans                            An array of user mini-objects for the campaign's fans.
 * @property {String}           fans[].id                       {@link GetUserResponse.id}
 * @property {String}           fans[].username                 {@link GetUserResponse.username}
 * @property {String}           fans[].profile_url              {@link GetUserResponse.profile_url}
 * @property {Boolean}          looking_for_players             A flag to indicate if the campaign is looking for
 *                                                                  players
 * @property {Object}           location                        A JSON object containing: { lat and lng }
 *                                                                  representing the campaign's "Where We Game"
 *                                                                  location
 * @property {Number}           location.lat
 * @property {Number}           location.lng
 */

/**
 */
export default class Campaign {

	/**
	 * @param {GetCampaignResponse} data The data payload received from the server.
	 */
	constructor(data) {
		this.$data = data;
	}

	/**
	 * {@link GetCampaignResponse.id}
	 * @returns {String}
	 */
	get id() {
		return this.$data.id;
	}

	/**
	 * {@link GetCampaignResponse.slug}
	 * @returns {String}
	 */
	get slug() {
		return this.$data.slug;
	}

	/**
	 * {@link GetCampaignResponse.campaign_url}
	 * @returns {String}
	 */
	get campaignUrl() {
		return this.$data.campaign_url;
	}

	/**
	 * {@link GetCampaignResponse.visibility}
	 * @returns {String}
	 */
	get visibility() {
		return this.$data.visibility;
	}

	/**
	 * {@link GetCampaignResponse.game_master}
	 * @returns {User}
	 */
	get gameMaster() {
		return new User(this.$data.game_master);
	}

	/**
	 * {@link GetCampaignResponse.created_at}
	 * @returns {Date}
	 */
	get createdAt() {
		return this.$data.created_at;
	}

	/**
	 * {@link GetCampaignResponse.updated_at}
	 * @returns {Date}
	 */
	get updatedAt() {
		return this.$data.updated_at;
	}

	/**
	 * {@link GetCampaignResponse.banner_image_url}
	 * @returns {String}
	 */
	get bannerImageUrl() {
		return this.$data.banner_image_url;
	}

	/**
	 * {@link GetCampaignResponse.play_status}
	 * @returns {String}
	 */
	get playStatus() {
		return this.$data.play_status;
	}

	/**
	 * {@link GetCampaignResponse.players}
	 * @returns {Array<User>}
	 */
	get players() {
		return Array.map(this.$data.players, (player) => {
			return new User(player);
		});
	}

	/**
	 * {@link GetCampaignResponse.fans}
	 * @returns {Array<User>}
	 */
	get fans() {
		return Array.map(this.$data.fans, (player) => {
			return new User(player);
		});
	}

	/**
	 * {@link GetCampaignResponse.looking_for_players}
	 * @returns {Boolean}
	 */
	get lookingForPlayers() {
		return this.$data.looking_for_players;
	}

	/**
	 * {@link GetCampaignResponse.location}
	 * @returns {{ lat: Number, lng: Number }}
	 */
	get location() {
		return this.$data.location;
	}

}
