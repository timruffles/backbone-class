// this details most config options - https://github.com/karma-runner/karma/blob/master/test/client/karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['mocha'],
    // list of files / patterns to load in the browser
    files: [
      'test/sinon.js',
      'test/chai.js',
      'test/custom_assertions.js',
      'test/setup.js',
      'libs/jquery.js',
      'libs/underscore.js',
      'libs/backbone.js',
      'src/*.js',
      'test/*.js'
    ],

    // list of files to exclude
    exclude: [],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress'],

    //junitReporter: {
    //  // will be resolved to basePath (in the same way as files/exclude patterns)
    //  outputFile: 'test-results.xml'
    //},

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_INFO,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,

    // e.g compile coffee scripts
    preprocessors: {
    },

    plugins: [
      'karma-mocha',
      'karma-chrome-launcher'
    ]
  });
};
