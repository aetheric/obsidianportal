/* globals require, process */
'use strict';

var gulp = require('gulp');
var gulpMocha = require('gulp-mocha');
var gulpTraceur = require('gulp-traceur');
var gulpIstanbul = require('gulp-istanbul');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');

var istanbul = require('gulp-istanbul/node_modules/istanbul');
var istanbulTraceur = require('istanbul-traceur');
istanbul.Instrumenter = istanbulTraceur.Instrumenter;

gulp.task('build', function() {
	return gulp.src('client/**.js')

		.pipe(gulpSourcemaps.init({
			loadMaps: true
		}))

		.pipe(gulpTraceur({
		}))

		.pipe(gulpConcat('client.js'))

		.pipe(gulpUglify({
			mangle: true
		}))

		.pipe(gulpSourcemaps.write('.'))

		.pipe(gulp.dest('dist'));

});

gulp.task('test-prep', function() {
	return gulp.src('client/**/*.js')

		.pipe(gulpIstanbul({
		}))

		.pipe(gulpIstanbul.hookRequire());

});

function mochaTest(file) {
	return function() {
		return gulp.src(file)

			.pipe(gulpMocha({
				ui: 'bdd',
				reporter: 'spec',
				bail: false,
				compilers: {
					es6: 'mocha-traceur'
				}
			}))

			.pipe(gulpIstanbul.writeReports({
			}))

			.pipe(gulpIstanbul.enforceThresholds({
				thresholds: {
					global: 1
				}
			}))

			.on('close', function() {
				process.exit(0);
			});

	}
}

gulp.task('test-unit', [ 'test-prep' ], mochaTest('test/unit.js'));

gulp.task('test-live', [ 'test-prep' ], mochaTest('test/live.js'));

gulp.task('test', [
	'test-unit',
	'test-live'
]);

gulp.task('default', [
	'build',
	'test'
]);
