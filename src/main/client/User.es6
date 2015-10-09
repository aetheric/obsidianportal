/* globals Map, Array */

import CampaignBrief from './CampaignBrief.es6';

export default class User extends Map {

	constructor(data) {
		this.id = data.id;
		this.username = data.username;
		this.avatar_image_url = data.avatar_image_url;
		this.profile_url = data.profile_url;
		this.created_at = data.created_at;
		this.is_ascendant = data.is_ascendant;
		this.last_seen_at = data.last_seen_at;
		this.utc_offset = data.utc_offset;
		this.locale = data.locale;
		this.campaigns = Array.map(data.campaigns, function(campaign) {
			return new CampaignBrief(campaign);
		});
	}

}
