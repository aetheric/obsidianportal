/* globals require, process */
'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var traceur = require('gulp-traceur');
var istanbul = require('gulp-istanbul');

gulp.task('build', function() {
	return gulp.src('client/**.js')

		.pipe(traceur({
		}))

		.pipe(gulp.dest('dist'));

});

gulp.task('test-prep', function() {
	return gulp.src('client/**/*.js')

		.pipe(istanbul({
		}))

		.pipe(istanbul.hookRequire());

});

gulp.task('test-unit', [ 'test-prep' ], function() {
	return gulp.src('test/unit.js')

		.pipe(mocha({
			ui: 'bdd',
			reporter: 'spec',
			bail: false,
			compilers: {
				es6: 'mocha-traceur'
			}
		}))

		.pipe(istanbul.writeReports({
		}))

		.pipe(istanbul.enforceThresholds({
			thresholds: {
				global: 1
			}
		}))

		.on('close', function() {
			process.exit(0);
		});

});

gulp.task('test-live', [ 'test-prep' ], function() {
	return gulp.src('test/live.js')

		.pipe(mocha({
			ui: 'bdd',
			reporter: 'spec',
			bail: false,
			compilers: {
				es6: 'mocha-traceur'
			}
		}))

		.pipe(istanbul.writeReports({
		}))

		.pipe(istanbul.enforceThresholds({
			thresholds: {
				global: 1
			}
		}))

		.on('close', function() {
			process.exit(0);
		});

});

gulp.task('test', [
	'test-unit',
	'test-live'
]);

gulp.task('default', [
	'build',
	'test'
]);
