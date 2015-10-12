/* globals require, appdir, request_promise, Promise */

import User from './objects/User.es6';
import MyUser from './objects/MyUser.es6';
import Campaign from './objects/Campaign.es6';

require('lazy-modules')([
	appdir + '/node_modules/request-promise'
]);

export default class Portal {

	/**
	 *
	 * @param {Object} options
	 * @param {String} options.api_root
	 */
	contructor(options) {
		this._api_host = options.api_host || 'http://www.obsidianportal.com';
		this._api_root = `${ options.api_root || api_host }/v1`;
		this._api_auth = `${ options.api_auth || api_host }/oauth`;
		this._User = User;
		this._Campaign = Campaign;
		this._Character = Character;
		this._Page = Page;
	}

	public get api_host() {
		return this._api_host;
	}

	public get api_root() {
		return this._api_root;
	}

	public get api_auth() {
		return this._api_auth;
	}

	public get User() {
		return this._User;
	}

	public get Campaign() {
		return this._Campaign;
	}

	public get Character() {
		return this._Character;
	}

	public get Page() {
		return this._Page;
	}

}

