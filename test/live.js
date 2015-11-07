/* global require, describe, it */
'use strict';

import Portal from '../client/portal.js';

let chai = require('chai');

let expect = chai.expect;

describe('When the portal', () => {
	let portal = new Portal();

	it('must be able to authorise itself', () => {

		let oauth_token = '';
		let oauth_secret = '';
		let oauth_verification = '';

		return portal.authenticate(oauth_token, oauth_secret).then((result) => {

			return result.callback(oauth_verification);

		}).then((response) => {

			expect(response.data.consumer_token).to.equal(oauth_token);
			expect(response.data.consumer_token_secret).to.equal(oauth_secret);

		});
	});

});
