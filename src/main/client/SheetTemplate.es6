
import User from './User.es6';

/**
 * @typedef {Object} GetSheetTemplateResponse~User
 */

/**
 * @typedef {Object} GetSheetTemplateResponse~GameSystem
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

}
