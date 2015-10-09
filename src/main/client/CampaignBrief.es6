/* globals Map */

export default class CampaignBrief extends Map {

	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.campaign_url = data.campaign_url;
		this.visibility = data.visibility;
		this.role = data.role;
	}

	function expand(portal) {
		return portal.campaignShow(this.id);
	}

}
