/*!
 * get
 * http://github.com/jonschlinkert/grunt-get
 *
 * Copyright 2013 Jon Schlinkert
 * Licensed under the MIT License
 * http://opensource.org/licenses/MIT
 */


'use strict';

// Node.js
var fs    = require('fs');
var http  = require('http');
var path  = require('path');
var util  = require('util');

// node_modules
var grunt = require('grunt');
var async = grunt.util.async;
var _ = grunt.util._;

module.exports = function(grunt) {

  grunt.registerMultiTask('get', 'Download files.', function() {
    var done = this.async();

    var options = this.options();

    options.prepend = options.prepend || '';
    options.append  = options.append || '';

    this.files.forEach(function(fp) {

      var cwd = fp.cwd || options.cwd || '';
      var ext = options.ext || ((fp.ext || fp.orig.ext) || path.extname(fp.src));

      // If no ext is defined, throw an error.
      if(ext.length === 0) {
        grunt.warn('Error: the "get" task requires file extension');
      }

      function getPage(file, dest) {
        file = '/' + path.join(cwd, path.basename(file)).replace(/\\/g, '/');

        var opts = {
          host: options.host,
          port: 80,
          path: options.prepend + file + options.append + ext
        };
        var content = '';

        var req = http.request(opts, function(res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            content += chunk;
          });
          res.on('end', function () {
            grunt.file.write(dest, content);
            grunt.log.ok('Saved:'.yellow, file + ext);
          });
        });
        req.end();
      }

      grunt.file.expand({nonull: true}, fp.orig.src).map(function(file) {
        var destPath = path.join(fp.dest, file + ext);
        getPage(file, destPath);
      });

      // Print a success message.
      grunt.log.writeln('File "' + fp.dest + '" created.');
    });
  });
};
