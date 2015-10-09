/* globals require */

require('lazy-modules')([
	'./node_modules/gulp*',
	'./src/main/script/**'
]);

gulp.task('build', build);
gulp.task('test-unit', test_unit);
gulp.task('test-live', test_live);
gulp.task('test', [ 'test-unit', 'test-live' ]);
gulp.task('default', [ 'build', 'test' ]);

