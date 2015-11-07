/* global require, describe, it */
'use strict';

var chai = require('chai');

var Campaign = require('../main/client/Character.es6');

var expect = chai.expect;

describe('When the Campaign class', function() {

	describe('is empty', function() {
		var campaign = new Campaign({});

		it('does not throw an error when accessing players', function() {
			expect(campaign.players).to.be.empty();
		});

		it('does not throw an error when accessing fans', function() {
			expect(campaign.fans).to.be.empty();
		});

	});

});

describe('When the User class', function() {

	describe('is empty', function() {
		var user = new User({});

		it('does not throw an error when accessing campaigns', function() {
			expect(user.campaigns).to.be.empty();
		});

	});

});
