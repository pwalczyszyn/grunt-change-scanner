/* jshint node:true */
'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('change_scanner', 'Grunt task that scans src files for changes based on RegExp pattern. Found changes are reported into a file with Markdown format.', function () {

        var options = this.options();

        if (!options.pattern) {
            grunt.log.error('Missing RegExp pattern option!');
            return false;
        }

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {

            var all = [],
                added = [],
                removed = [];

            f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function (filepath) {
                var match,
                    str = grunt.file.read(filepath),
                    rgx = new RegExp(options.pattern, 'gi');

                while ((match = rgx.exec(str)) !== null) {
                    all.push(match);
                }
            });

            var results = '# Current\n',
                prev = grunt.file.exists(f.dest) ? grunt.file.read(f.dest) : '',
                prevAll = prev.match(/(?:# Current)([\s\S]*?)(?:#)/m);

            if (prevAll) {
                prevAll = prevAll[1].trim();
                prevAll = prevAll.split('  \n');
            } else {
                prevAll = [];
            }

            // Filtering added matches
            added = all.filter(function (match) {
                return prevAll.indexOf(match[1]) === -1;
            });

            // Filtering removed matches
            removed = prevAll.filter(function (prevMatch) {
                return !all.some(function (match) {
                    return match[1] === prevMatch;
                });
            });

            // Adding current
            all.forEach(function (match) {
                results += match[1] + '  \n';
            });

            results += '\n## ' + (options.banner || '') + '\n';

            // Adding added
            if (added.length > 0) {
                results += '### Added\n';
                added.forEach(function (match) {
                    results += match[1] + '  \n';
                });
            }

            // Adding removed
            if (removed.length > 0) {
                results += '### Removed\n';
                removed.forEach(function (match) {
                    results += match + '  \n';
                });
            }

            grunt.file.write(f.dest, results + '\n' + prev.substring(prev.indexOf('## ')));
        });
    });

};