/*!
 * grunt-get
 * http://github.com/upstage/grunt-get
 *
 * Copyright 2013 Sellside, Inc.
 * Licensed under the MIT License
 * http://opensource.org/licenses/MIT
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {jshintrc: '.jshintrc'},
      all: {
        src: ['Gruntfile.js', 'tasks/**/*.js']
      }
    },

    get: {
      options: {
        host: 'getbootstrap.com'
      },
      pages: {
        options: {append: '/index'},
        files: [
          {src: ['components', 'css', 'javascript'], dest: 'tmp/download/', ext: '.html'}
        ]
      },
      styles: {
        files: [
          {cwd: 'assets/css', src: ['docs', 'pygments-manni'], dest: 'tmp/download/', ext: '.css'},
          {cwd: 'dist/css',   src: ['bootstrap'], dest: 'tmp/download/', ext: '.css'}
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // These plugins provide necessary tasks.
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jshint', 'get']);
};