/* globals require, process */
'use strict';

var gulp = require('gulp');
var mocha = require('mocha');
var traceur = require('gulp-traceur');
var istanbul = require('gulp-istanbul');

gulp.task('build', function() {
	return gulp.src('client/**.js')

		.pipe(traceur({
		}))

		.pipe(gulp.dest('dist'));

});

gulp.task('test-prep', function() {
	return gulp.src('client/**.js')

		.pipe(istanbul({
		}));

});

gulp.task('test-unit', function() {
	return gulp.src('test/unit.js')

		.pipe(mocha({
		}))

		.on('end', function() {
			process.exit(0);
		});

});

gulp.task('test-live', function() {
	return gulp.src('test/live.js')

		.pipe(mocha({
		}))

		.on('end', function() {
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
