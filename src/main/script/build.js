/* globals require, module */

require('lazy-modules')([
	'../../../node_modules/gulp'
]);

module.exports = function() {
	return gulp.src('../client/**.js')
		.pipe(gulp.dest('../../../dist'));
}

