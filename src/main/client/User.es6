/* globals Array, Map */

import Campaign from './Campaign.es6';

/**
 * @typedef  {Object}           GetUserResponse
 * @property {String}           id                          A unique identifier for the given user. This will never
 *                                                              change.
 * @property {String}           username                    The user's username. Note: The user can change this value.
 * @property {String}           avatar_image_url            The URL of the user's avatar image.
 * @property {String}           profile_url                 The URL of the user's profile on Obsidian Portal.
 * @property {Array<Object>}    campaigns                   An array of the user's campaigns.
 * @property {String}           campaigns[].id              {@link GetCampaignResponse.id}
 * @property {String}           campaigns[].name            {@link GetCampaignResponse.name}
 * @property {String}           campaigns[].campaign_url    {@link GetCampaignResponse.campaign_url}
 * @property {String}           campaigns[].visibility      {@link GetCampaignResponse.visibility}
 * @property {String}           campaigns[].role            What relation this user has to the campaign.
 * @property {Boolean}          is_ascendant                Indicates if the user is an Ascendant member.
 * @property {Date}             last_seen_at                The last time the user was active on the website. ISO-8601
 *                                                              timestamp.
 * @property {String}           utc_offset                  Formatted string representing the user's time zone. It is
 *                                                              formatted as "+HH:MM" and represents the offset from
 *                                                              UTC. Example: "-05:00" is Eastern US time.
 * @property {String}           locale                      ISO 639-1 language code for the user's preferred
 *                                                              language.
 * @property {Date}             created_at                  Indicates when the user first created their account.
 *                                                              ISO-8601 timestamp.
 * @property {Date}             updated_at                  Indicates when the user first created their account.
 *                                                              ISO-8601 timestamp.
 */

/**
 */
export default class User {

	/**
	 * @param {GetUserResponse} data The data payload received from the server.
	 */
	constructor(data) {
		this.$data = data;
	}

	/**
	 * {@link GetUserResponse.id}
	 * @returns {String}
	 */
	public get id() {
		return this.$data.id;
	}

	/**
	 * {@link GetUserResponse.username}
	 * @returns {String}
	 */
	public get username() {
		return this.$data.username;
	}

	/**
	 * {@link GetUserResponse.avatar_image_url}
	 * @returns {String}
	 */
	public get avatarImageUrl() {
		return this.$data.avatar_image_url;
	}

	/**
	 * {@link GetUserResponse.profile_url}
	 * @returns {String}
	 */
	public get profileUrl() {
		return this.$data.profile_url;
	}

	/**
	 * {@link GetUserResponse.campaigns}
	 * @returns {Map<Campaign,String>}
	 */
	public get campaigns() {
		return Array.reduce(this.$data.campaigns, (map, campaign) => {
			map.set(new Campaign(campaign), campaign.role);
			return map;

		}, new Map());
	}

	/**
	 * {@link GetUserResponse.is_ascendant}
	 * @returns {Boolean}
	 */
	public get isAscendant() {
		return this.$data.is_ascendant;
	}

	/**
	 * {@link GetUserResponse.last_seen_at}
	 * @returns {Date}
	 */
	public get lastSeenAt() {
		return this.$data.last_seen_at;
	}

	/**
	 * {@link GetUserResponse.utc_offset}
	 * @returns {String}
	 */
	public get utcOffset() {
		return this.$data.utc_offset;
	}

	/**
	 * {@link GetUserResponse.locale}
	 * @returns {String}
	 */
	public get locale() {
		return this.$data.locale;
	}

	/**
	 * {@link GetUserResponse.created_at}
	 * @returns {Date}
	 */
	public get createdAt() {
		return this.$data.created_at;
	}

	/**
	 * {@link GetUserResponse.updated_at}
	 * @returns {Date}
	 */
	public get updatedAt() {
		return this.$data.updated_at;
	}

}
