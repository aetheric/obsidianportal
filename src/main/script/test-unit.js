/* globals require */

require('lazy-modules')([
	'../../../node_modules/gulp*'
]);

export default function() {
	return gulp.src('../../test/unit')
		.pipe(gulp_mocha());
}

