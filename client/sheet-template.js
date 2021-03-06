
import User from './user.js';

/**
 * @typedef {Object} GetSheetTemplateResponse~User
 * @parameter {String} id
 * @parameter {String} username
 * @parameter {String} profile_url
 * @parameter {String} avatar_image_url
 */

/**
 * @typedef {Object} GetSheetTemplateResponse~GameSystem
 * @parameter {String} id
 * @parameter {String} name
 */

/**
 * @typedef {Object} GetSheetTemplateResponse
 * @parameter {String} id
 * @parameter {String} slug
 * @parameter {String} name
 * @parameter {GetSheetTemplateResponse~User} user
 * @parameter {GetSheetTemplateResponse~GameSystem} game_system
 * @parameter {String} html_template
 * @parameter {String} css
 * @parameter {String} javascript
 * @parameter {String} state
 * @parameter {Date} created_at
 * @parameter {Date} updated_at
 * @parameter {String} html_template_submitted
 * @parameter {String} css_submitted
 * @parameter {String} javascript_submitted
 */

/**
 * The Dynamic Sheet Template methods allow for retrieving and modifying DSTs. If you'd like to know more about DSTs,
 * read the guide.
 *
 * "Submitted" attributes
 * The DSTs have to be approved before they are live on the site for everyone. This necessitates two separate copies of
 * the DST - the approved and unapproved copy.
 *
 * This is represented in the system as the "real" DST (html_template, css, javascript) and the "submitted" DST
 * (html_template_submitted, css_submitted, javascript_submitted). When modifying a DST, the author can only modify the
 * submitted attributes, never the real ones. Once the author is happy with their DST, they can submit it for review.
 * Upon acceptance, the submitted values are automatically copied over to the real values.
 *
 * In terms of the API, this means that API clients can only modify the XXX_submitted fields. Once the DST is ready for
 * review, call the submit method to submit it for review.
 */
export default class SheetTemplate {

	/**
	 * @param {GetSheetTemplateResponse} data
	 */
	constructor(data) {
		this.$data = data;
	}

	/**
	 * {@link GetSheetTemplateResponse.id}
	 * @returns {String}
	 */
	get id() {
		return this.$data.id;
	}

	/**
	 * {@link GetSheetTemplateResponse.slug}
	 * @returns {String}
	 */
	get slug() {
		return this.$data.slug;
	}

	/**
	 * {@link GetSheetTemplateResponse.name}
	 * @returns {String}
	 */
	get name() {
		return this.$data.name;
	}

	/**
	 * {@link GetSheetTemplateResponse.user}
	 * @returns {GetSheetTemplateResponse~User}
	 */
	get user() {
		return this.$data.user;
	}

	/**
	 * {@link GetSheetTemplateResponse.game_system}
	 * @returns {GetSheetTemplateResponse~GameSystem}
	 */
	get gameSystem() {
		return this.$data.game_system;
	}

	/**
	 * {@link GetSheetTemplateResponse.html_template}
	 * @returns {String}
	 */
	get htmlTemplate() {
		return this.$data.html_template;
	}

	/**
	 * {@link GetSheetTemplateResponse.css}
	 * @returns {String}
	 */
	get css() {
		return this.$data.css;
	}

	/**
	 * {@link GetSheetTemplateResponse.javascript}
	 * @returns {String}
	 */
	get javascript() {
		return this.$data.javascript;
	}

	/**
	 * {@link GetSheetTemplateResponse.state}
	 * @returns {String}
	 */
	get state() {
		return this.$data.state;
	}

	/**
	 * {@link GetSheetTemplateResponse.created_at}
	 * @returns {Date}
	 */
	get createdAt() {
		return this.$data.created_at;
	}

	/**
	 * {@link GetSheetTemplateResponse.updated_at}
	 * @returns {Date}
	 */
	get updatedAt() {
		return this.$data.updated_at;
	}

	/**
	 * {@link GetSheetTemplateResponse.html_template_submitted}
	 * @returns {String}
	 */
	get htmlTemplateSubmitted() {
		return this.$data.html_template_submitted;
	}

	/**
	 * {@link GetSheetTemplateResponse.css_submitted}
	 * @returns {String}
	 */
	get cssSubmitted() {
		return this.$data.css_submitted;
	}

	/**
	 * {@link GetSheetTemplateResponse.javascript_submitted}
	 * @returns {String}
	 */
	get javascriptSubmitted() {
		return this.$data.javascript_submitted;
	}

}
