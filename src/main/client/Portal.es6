/* globals require, Promise */

import User from './User.es6';
import Campaign from './Campaign.es6';
import Character from './Character.es6';

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

		}).then((response) => {
			return new User(response.data);
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

		}).then((response) => {
			return new Campaign(response.data);
		});
	}

	/**
	 * @param {String} campaignId The campaign identifier.
	 * @returns {Promise<Array<Character>>} A promise resolving to a list of Characters.
	 */
	public function getCharacterList(campaignId) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/characters.json`,
			method: 'GET'

		}).then((response) => {
			return Array.map(response.data, (character) => {
				return new Character(character);
			});
		});
	}

	/**
	 * @param {String} campaignId The ID of the campaign to retrieve the character from.
	 * @param {String} characterId The ID of the character to retrieve. You can also use the character slug
	 * @param {Boolean} useSlug When set to 'true', or '1', the character will be looked up by slug instead of id.
	 *                      Note: The campaign_id must be an identifier, not a slug.
	 * @returns {Promise<Character>} A promise containing a single character for a campaign.
	 */
	public function getCharacter(campaignId, characterId, useSlug = false) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/characters/${characterId}.json`,
			method: 'GET',
			params: {
				use_slug: useSlug
			}

		}).then((response) => {
			return new Character(response.data);
		});
	}

	/**
	 * @param {String} campaignId The ID of the campaign to create a character in.
	 * @param {Character} character The character to create for the campaign.
	 * @returns {Promise<Character>} A promise that resolves to the newly created character.
	 */
	public function createCharacter(campaignId, character) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/characters.json`,
			method: 'POST',
			body: {
				character: character
			}

		}).then((response) =>{
			return new Character(response.data);
		});
	}

	/**
	 * @param {String} campaignId The ID of the campaign to retrieve a character from.
	 * @param {Character} character The character to update for the campaign.
	 * @param {String} character.id  The ID of the character to update.
	 * @returns {Promise<Character>} A promise that resolves to the newly updated character.
	 */
	public function updateCharacter(campaignId, character) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/characters/${character.id}.json`,
			method: 'PUT'

		}).then((response) => {
			return new Character(response.data);
		});
	}

	/**
	 * @param {String} campaignId The ID of the campaign to retrieve a character from.
	 * @param {String} characterId The ID of the character to delete.
	 * @returns {Promise} A promise that resolves to nothing in particular.
	 */
	public function deleteCharacter(campaignId, characterId) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/characters/${characterId}.json`,
			method: 'DELETE'

		}).then((response) => {
			return response.data;
		});
	}

}

