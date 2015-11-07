/* globals require */

var gulp = require('gulp');

gulp.task('build', require('./scripts/build.js'));
gulp.task('test-unit', require('./scripts/test-unit.js'));
gulp.task('test-live', require('./scripts/test-live.js'));
gulp.task('test', [ 'test-unit', 'test-live' ]);
gulp.task('default', [ 'build', 'test' ]);

