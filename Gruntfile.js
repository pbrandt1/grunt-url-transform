/*
 * grunt-url-transform
 * https://github.com/pbrandt1/grunt-url-transform
 *
 * Copyright (c) 2014 Peter Brandt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    copy: {
      main: {
        src: 'test/fixtures/*',
        dest: 'tmp/'
      }
    },

    // Configuration to be run (and then tested).
    url_transform: {
      app: {
        options: {
          default: {
            url: 'https://localhost:4343'
          }
        },
        files: [
          'tmp/test/fixtures/*.html'
        ]
      },
      dist: {
        options: {
          default: {
            url: 'https://localhost:4343'
          }
        },
        files: [
          'tmp/test/fixtures/*.html'
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'url_transform', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
