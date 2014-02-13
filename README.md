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

A banner value that will be appended after ### separator:

    '<%= grunt.template.today("yyyy-mm-dd HH:MM") %>'
    
Would result with something similar to this:
    
    ### 2014-02-13 09:59

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  change_scanner: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  change_scanner: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
