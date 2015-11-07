/* global require, describe, it */
'use strict';

var chai = require('chai');

var Portal = require('../main/client/Portal.es6');

var expect = chai.expect;

describe('When the portal', function() {
	var portal = new Portal();

	it('must be able to authorise itself', function() {

		var oauth_token = '';
		var oauth_secret = '';
		var oauth_verification = '';

		return portal.authenticate(oauth_token, oauth_secret).then(function(result) {

			return result.callback(oauth_verification);

		}).then(function(response) {

			expect(response.data.consumer_token).to.equal(oauth_token);
			expect(response.data.consumer_token_secret).to.equal(oauth_secret);

		});
	});

});
