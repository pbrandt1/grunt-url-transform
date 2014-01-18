/*
 * grunt-url-transform
 * https://github.com/pbrandt1/grunt-url-transform
 *
 * Copyright (c) 2014 Peter Brandt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // kind of stolen from here: https://github.com/yeoman/grunt-usemin/blob/master/lib/fileprocessor.js
  var regexs = [
    /<script.+src=['"]([^"']+)["']/gm,
    /<link[^\>]+href=['"]([^"']+)["']/gm,
    /<img[^\>]+src=['"]([^"']+)["']/gm,
    /data-main\s*=['"]([^"']+)['"]/gm,
    /data-(?!main).[^=]+=['"]([^'"]+)['"]/gm,
    /url\(\s*['"]([^"']+)["']\s*\)/gm,
    /<a[^\>]+href=['"]([^"']+)["']/gm,
    /<input[^\>]+src=['"]([^"']+)["']/gm
  ];


  grunt.registerMultiTask('url_transform', 'Replaces src="/script.js" with src="https://localhost:4343/script.js" for instance.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var files = grunt.file.expand({nonull: true}, f.src);
      files.forEach(function(filename) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filename)) {
          grunt.log.warn('Source file "' + filename + '" not found.');
          return false;
        }

        var source = grunt.file.read(filename);

        regexs.forEach(function(r) {
          source = source.replace(r, function(match, p1) {
            var slash = p1[0] === '/' ? '' : '/';
            return match.replace(p1, options.default.url + slash + p1);
          });
        });


        // Write the destination file.
        grunt.file.write(filename, source);

        // Print a success message.
        grunt.log.writeln('File "' + filename + '" processed.');

      });
    });
  });

};
