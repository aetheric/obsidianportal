/* globals require */

require('lazy-modules')([
	'../../../node_modules/gulp'
]);

export default function() {
	return gulp.src('../client/**.js')
		.pipe(gulp.dest('../../../dist'));
}

