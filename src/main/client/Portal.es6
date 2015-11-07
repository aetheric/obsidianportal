/* globals require, Promise */

import User from './User.es6';
import Campaign from './Campaign.es6';
import Character from './Character.es6';
import WikiPage from './WikiPage.es6';
import SheetTemplate from './SheetTemplate.es6';

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

	/**
	 * @param {String} campaignId The ID of the campaign to retrieve a wiki page list from.
	 * @returns {Promise<Array<WikiPage>>} A promise that resolves to a list of wiki pages.
	 */
	public function getWikiList(campaignId) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/wikis.json`,
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
	public function getWikiPage(campaignId, wikiPageId, useSlug = false) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/wikis/${wikiPageId}.json`,
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
	public function createWikiPage(campaignId, wikiPage) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/wikis.json`,
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
	public function updateWikiPage(campaignId, wikiPage) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/wikis/${wikiPage.id}.json`,
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
	public function deleteWikiPage(campaignId, wikiPageId) {
		return request({
			url: `${apiRoot}/campaigns/${campaignId}/wikis/${wikiPageId}.json`,
			method: 'DELETE'

		}).then((response) => {
			return response.data;
		});
	}

	/**
	 * @returns {Promise<Array<SheetTemplate>>} A promise resolving to a list of sheet templates.
	 */
	public function getSheetTemplateList() {
		return request({
			url: `${apiRoot}/dynamic_sheet_templates.json`,
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
	public function getSheetTemplate(sheetTemplateId, useSlug = false) {
		return request({
			url: `${apiRoot}/dynamic_sheet_templates/${sheetTemplateId}.json`,
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
	public function updateSheetTemplate(sheetTemplate) {
		return request({
			url: `${apiRoot}/dynamic_sheet_templates/${sheetTemplate.id}.json`,
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
	public function submitSheetTemplate(sheetTemplateId) {
		return request({
			url: `${apiRoot}/dynamic_sheet_templates/${sheetTemplateId}/submit.json`,
			method: 'PUT'

		}).then((response) => {
			return response.data;
		});
	}

}

