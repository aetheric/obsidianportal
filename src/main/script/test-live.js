/* globals require, module */

require('lazy-modules')([
	'../../../node_modules/gulp*'
]);

module.exports = function() {
	return gulp.src('../../test/live')
		.pipe(gulp_mocha());
}

