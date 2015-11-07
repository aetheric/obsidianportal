/* global require, describe, it */
'use strict';

import Campaign from '../client/Character.js';

let chai = require('chai');

let expect = chai.expect;

describe('When the Campaign class', () => {

	describe('is empty', () => {
		let campaign = new Campaign({});

		it('does not throw an error when accessing players', () => {
			expect(campaign.players).to.be.empty();
		});

		it('does not throw an error when accessing fans', () => {
			expect(campaign.fans).to.be.empty();
		});

	});

});

describe('When the User class', () => {

	describe('is empty', () => {
		let user = new User({});

		it('does not throw an error when accessing campaigns', () => {
			expect(user.campaigns).to.be.empty();
		});

	});

});
