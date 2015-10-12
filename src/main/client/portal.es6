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
		this._User = User;
		this._Campaign = Campaign;
		this._Character = Character;
		this._Page = Page;
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

