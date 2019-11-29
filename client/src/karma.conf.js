// Karma configuration
// Generated on Fri Jun 23 2017 14:56:14 GMT+0200 (CEST)

module.exports = function(config) {
    config.set({
  
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',
  
  
      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],
  
  
      // list of files / patterns to load in the browser
      files: [
        { pattern: './spec-bundle.js', watched: false }
      ],
  
  
      // list of files to exclude
      exclude: [
      ],

      plugins: [
          require('karma-webpack'),
          require('karma-chrome-launcher'),
          require('karma-jasmine'),
          require('karma-sourcemap-loader'),
          require('karma-spec-reporter'),
					require('karma-jasmine-html-reporter'),
      ],
  
  
      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        './spec-bundle.js': ['webpack', 'sourcemap']
      },
      webpack: require('../webpack.test.config'),
      webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        stats: 'errors-only'
      },
      webpackServer: {
        noInfo: true // please don't spam the console when running in karma!
      },
  
      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['spec', 'kjhtml'],
      specReporter: {
          showSpecTiming: true,
          supressSkipped: true,
      },
  
  
      // web server port
      port: 9876,
  
  
      // enable / disable colors in the output (reporters and logs)
      colors: true,
  
  
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,
  
  
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
  
  
      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['ChromiumHeadless'],
  
  
      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true,
    })
  }