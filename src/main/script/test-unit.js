/* globals require, module, process */
'use strict';

var gulp = require('gulp');
var mocha = require('mocha');

module.exports = function() {
	return gulp.src('../../test/unit.js')

		.pipe(mocha({
		}))

		.on('end', function() {
			process.exit(0);
		});

};

