'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.change_scanner = {

    tearDown: function (done) {
        // Restoring test/fixtures/index-report.md
        grunt.file.write('test/fixtures/index-report.md', grunt.file.read('test/fixtures/index-report-restore.md'));
        done();
    },

    default_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('test/fixtures/index-report.md');
        var expected = grunt.file.read('test/expected/index-report.md');

        test.equal(actual, expected, 'test/fixtures/index-report.md should be equal to test/expected/index-report.md');

        test.done();
    }

};