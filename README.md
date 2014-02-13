# grunt-change-scanner

> Grunt task that scans src files for changes based on RegExp pattern. Found changes are reported into a file with Markdown format.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-change-scanner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-change-scanner');
```

## The "change_scanner" task

### Overview
In your project's Gruntfile, add a section named `change_scanner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  change_scanner: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.pattern
Type: `String`

No default value: this is a required option

A RegExp pattern that will match for whatever you want to look for. It's expected to have single capturing group:

    (?:<.*?data-something=")(.*?)(?:".*?>)
    
Would match opening tag of HTML element with `data-something` attribute:

    <a href="#" data-something="foo">

The capturing group would return `foo` in this case.

#### options.banner
Type: `String`

A banner value that will be appended after ## separator:

    '<%= grunt.template.today("yyyy-mm-dd HH:MM") %>'
    
Would result with something similar to this:
    
    ### 2014-02-13 09:59

### Usage Examples

In this example scanner will look for changes to values of `data-something` attributes of HTML elements in specified `src/index.html` document. The changes will be reported to `report/changes.md` file.

```js
grunt.initConfig({
  change_scanner: {
    options: {
        pattern: '(?:<.*?data-something=")(.*?)(?:".*?>)',
        banner: '<%= grunt.template.today("yyyy-mm-dd HH:MM") %>'
    },
    files: {
      'report/changes.md': ['src/index.html'],
    }
  }
});
```

#### Example of generated report in Markdown format

```md
# Current
bar
qux
## v3
### Added
qux
### Removed
buz

## v2
### Added
buz

## v1
### Added
bar
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.0.3 - Added double space before line breaks
* 0.0.2 - First public release
