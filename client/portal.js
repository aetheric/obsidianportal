/* globals require, Promise */

import User from './user.js';
import Campaign from './campaign.js';
import Character from './character.js';
import WikiPage from './wiki-page.js';
import SheetTemplate from './sheet-template.js';

let request = require('request-promise');

export default class Portal {

	/**
	 * @param {Object} [options] Options for configuring the client.
	 * @param {String} [options.apiRoot] Where api requests are targeted at.
	 * @param {String} [options.apiAuth] Where the OAuth api endpoints reside.
	 */
	contructor(options = {}) {
		this._apiRoot = options.apiRoot || 'http://api.obsidianportal.com/v1';
		this._apiAuth = options.apiAuth || 'https://www.obsidianportal.com/oauth';
		this._oauth = {};
	}

	/**
	 * @callback authenticate~complete
	 * @param {String} verificationToken The token displayed after authorising.
	 */
	/**
	 * @typedef {Object} authenticate~result
	 * @property {String} auth_url The url where the verification token can be retrieved.
	 * @property {authenticate~complete} A callback that will finish the authentication.
	 */
	/**
	 * @param {String} consumerKey The consumer key as per the oauth spec.
	 * @param {String} consumerSecret The consumer secret as per the oauth spec.
	 * @param {String} [callbackUrl] The callback url for the oauth authorisation.
	 * @returns {Promise<authenticate~result>} A promise resolving to an object that contains the url that the user
	 *      needs to be sent to, and a callback to invoke with the verification token once that is complete.
	 */
	authenticate(consumerKey, consumerSecret, callbackUrl) {

		function createCallback(authToken, authTokenSecret) {
			return (verificationToken) => {
				return request({
					url: `${this._apiAuth}/access_token`,
					method: 'POST',
					oauth: {
						consumer_key: consumerKey,
						consumer_secret: consumerSecret,
						token: authToken,
						token_secret: authTokenSecret,
						verifier: verificationToken
					}

				}).then((response) => {
					let data = response.data;
					this._oauth = {
						consumer_key: consumerKey,
						consumer_secret: consumerSecret,
						token: data.oauth_token,
						token_secret: data.oauth_token_secret,
						signature_method: 'HMCA-SHA1'
					};

				});
			}
		}

		return request({
			url: `${this._apiAuth}/request_token`,
			method: 'POST',
			oauth: {
				callback: callbackUrl,
				consumer_key: consumerKey,
				consumer_secret: consumerSecret
			}

		}).then((response) => {
			let data = response.data;
			return {
				auth_url: `${this._apiAuth}/authorize?oauth_token=${data.oauth_token}`,
				callback: createCallback(data.oauth_token, data.oauth_token_secret)
			};

		});

	}

	/**
	 * @param [userId] The user identifier, or if not provided, the logged-in user.
	 * @param [useUsername] Whether the userId provided is an identifier, or username.
	 * @returns {Promise<User>} A promise resolving to the user object.
	 */
	getUser(userId, useUsername = false) {
		return request({
			uri: `${this._apiRoot}/users/${ userId || 'me' }.json`,
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
	getCampaign(campaignId, useSlug = false) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}.json`,
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
	getCharacterList(campaignId) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/characters.json`,
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
	getCharacter(campaignId, characterId, useSlug = false) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/characters/${characterId}.json`,
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
	createCharacter(campaignId, character) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/characters.json`,
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
	updateCharacter(campaignId, character) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/characters/${character.id}.json`,
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
	deleteCharacter(campaignId, characterId) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/characters/${characterId}.json`,
			method: 'DELETE'

		}).then((response) => {
			return response.data;
		});
	}

	/**
	 * @param {String} campaignId The ID of the campaign to retrieve a wiki page list from.
	 * @returns {Promise<Array<WikiPage>>} A promise that resolves to a list of wiki pages.
	 */
	getWikiList(campaignId) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/wikis.json`,
			method: 'GET'

		}).then((response) => {
			return Array.map(response.data, (wiki) => {
				return new WikiPage(wiki);
			});
		});
	}

	/**
	 * @param {String} campaignId The ID of the campaign to retrieve a wiki page list from.
	 * @param {String} wikiPageId The ID of the wiki page to retrieve. You can also use the wiki page slug.
	 * @param {Boolean} [useSlug] When set to 'true', or '1', the wiki page will be looked up by slug instead of id.
	 *                              Note: The campaign_id must be an identifier, not a slug.
	 * @returns {Promise<WikiPage>} A promise that resolves to a wiki page.
	 */
	getWikiPage(campaignId, wikiPageId, useSlug = false) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/wikis/${wikiPageId}.json`,
			method: 'GET',
			params: {
				use_slug: useSlug
			}

		}).then((response) => {
			return new WikiPage(response.data);
		});
	}

	/**
	 * @param {String} campaignId The ID of the campaign to create a wiki page in.
	 * @param {WikiPage} wikiPage The wiki page to created.
	 * @returns {Promise<WikiPage>} A promise that resolves to the newly created wiki page.
	 */
	createWikiPage(campaignId, wikiPage) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/wikis.json`,
			method: 'POST',
			body: {
				wiki_page: wikiPage
			}

		}).then((response) => {
			return new WikiPage(response.data);
		});
	}

	/**
	 * @param {String} campaignId The ID of the campaign to retrieve a wiki page from.
	 * @param {WikiPage} wikiPage The wiki page content to update.
	 * @returns {Promise<WikiPage} A promise that resolves to the newly updated wiki page.
	 */
	updateWikiPage(campaignId, wikiPage) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/wikis/${wikiPage.id}.json`,
			method: 'PUT',
			body: {
				wiki_page: wikiPage
			}

		}).then((response) => {
			return new WikiPage(response.data);
		});
	}

	/**
	 * @param {String} campaignId The ID of the campaign to retrieve a wiki page from.
	 * @param {String} wikiPageId The ID of the wiki page to delete.
	 * @returns {Promise} A promise that resolves to nothing in particular.s
	 */
	deleteWikiPage(campaignId, wikiPageId) {
		return request({
			url: `${this._apiRoot}/campaigns/${campaignId}/wikis/${wikiPageId}.json`,
			method: 'DELETE'

		}).then((response) => {
			return response.data;
		});
	}

	/**
	 * @returns {Promise<Array<SheetTemplate>>} A promise resolving to a list of sheet templates.
	 */
	getSheetTemplateList() {
		return request({
			url: `${this._apiRoot}/dynamic_sheet_templates.json`,
			method: 'GET'

		}).then((response) => {
			return Array.map(response.data, (sheetTemplate) => {
				return new SheetTemplate(sheetTemplate);
			});
		});
	}

	/**
	 * @param {String} sheetTemplateId The ID of the DST to retrieve. You can also use the DST slug.
	 * @param {Boolean} useSlug When set to 'true', or '1', the DST will be looked up by slug instead of id.
	 * @returns {Promise<SheetTemplate>} A promise resolving to a single sheet template.
	 */
	getSheetTemplate(sheetTemplateId, useSlug = false) {
		return request({
			url: `${this._apiRoot}/dynamic_sheet_templates/${sheetTemplateId}.json`,
			method: 'GET',
			params: {
				use_slug: useSlug
			}

		}).then((response) => {
			return new SheetTemplate(response.data);
		});
	}

	/**
	 * @param {SheetTemplate} sheetTemplate The sheet template to update.
	 * @param {String} sheetTemplate.id The ID of the DST to update.
	 * @returns {Promise<SheetTemplate>} A promise resolving to the freshly updated template.
	 */
	updateSheetTemplate(sheetTemplate) {
		return request({
			url: `${this._apiRoot}/dynamic_sheet_templates/${sheetTemplate.id}.json`,
			method: 'PUT',
			body: {
				dynamic_sheet_template: sheetTemplate
			}

		}).then((response) => {
			return new SheetTemplate(response.data);
		});
	}

	/**
	 * @param {String} sheetTemplateId The ID of the DST to submit.
	 * @returns {Promise} A promise resolving to nothing in particular.
	 */
	submitSheetTemplate(sheetTemplateId) {
		return request({
			url: `${this._apiRoot}/dynamic_sheet_templates/${sheetTemplateId}/submit.json`,
			method: 'PUT'

		}).then((response) => {
			return response.data;
		});
	}

}

