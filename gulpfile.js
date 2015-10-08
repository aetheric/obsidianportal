/* globals require */

import build from 'src/main/script/build.es6';
import testUnit from 'src/main/script/test-unit.es6';
import testLive from 'src/main/script/test-live.es6';

require('lazy-modules')([
	'./node_modules/gulp'
]);

gulp.task('build', build);
gulp.task('test-unit', testUnit);
gulp.task('test-live', testLive);
gulp.task('test', [ 'test-unit', 'test-live' ]);
gulp.task('default', [ 'build', 'test' ]);

