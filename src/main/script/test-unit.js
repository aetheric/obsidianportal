/* globals require, module */

require('lazy-modules')([
	'../../../node_modules/gulp*'
]);

module.exports = function() {
	return gulp.src('../../test/unit')
		.pipe(gulp_mocha());
}

