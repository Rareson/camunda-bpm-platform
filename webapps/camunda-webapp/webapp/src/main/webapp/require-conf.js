(function(factory) {
  'use strict';
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  }
  else {
    define([], factory);
  }
}(function() {
  'use strict';
  var conf = {};

  //By default, all modules are located relative to this path. If baseUrl
  //is not explicitly set, then all modules are loaded relative to
  //the directory that holds the build file. If appDir is set, then
  //baseUrl should be specified as relative to the appDir.
  conf.baseUrl = '/camunda/',

  conf.paths = {
    'domReady':                     'assets/vendor/requirejs-domready/domReady',

    'jquery':                       'assets/vendor/jquery/jquery',
    'jquery-mousewheel':            'assets/vendor/jquery-mousewheel/jquery.mousewheel',
    'jquery-overscroll':            'assets/vendor/jquery-overscroll/src/jquery.overscroll',
    'jquery-ui':                    'assets/vendor/jquery-ui/ui/jquery-ui',

    'bootstrap':                    'assets/vendor/bootstrap/dist/js/bootstrap',
    'bootstrap-slider':             'assets/vendor/bootstrap-slider/bootstrap-slider',

    'angular':                      'assets/vendor/angular/angular',
    'angular-resource':             'assets/vendor/angular-resource/angular-resource',
    'angular-sanitize':             'assets/vendor/angular-sanitize/angular-sanitize',
    'angular-ui':                   'assets/vendor/angular-ui/build/angular-ui',
    'angular-bootstrap':            'assets/vendor/angular-bootstrap/ui-bootstrap',

    'better-dom':                   'assets/vendor/better-dom/dist/better-dom',
    'better-placeholder-polyfill':  'assets/vendor/better-placeholder-polyfill/dist/better-placeholder-polyfill',

    // -----------------------------------------

    // custom vendor libraries
    'ngDefine':                     'assets/vendor/requierjs-angular-define/src/ngDefine',
    'ngParse':                      'assets/vendor/requierjs-angular-define/src/ngParse',
    'bpmn':                         'assets/vendor/camunda-bpmn.js/src/bpmn',
    'angular-data-depend':          'assets/vendor/angular-data-depend/src/dataDepend',

    'requierjs-angular-define':     'assets/vendor/requierjs-angular-define/src/ngDefine',
    'requirejs-angular-define':     'assets/vendor/requierjs-angular-define/src/ngDefine'
  };

  conf.shim = {
    'jquery': {
      exports: 'jQuery'
    },
    'jquery-ui':          ['jquery'],
    'jquery-mousewheel':  ['jquery'],
    'jquery-overscroll':  ['jquery'],

    'bootstrap':          ['jquery'],
    'bootstrap-slider':   ['bootstrap'],

    'angular': {
      exports: 'angular',
      deps: ['jquery']
    },
    'angular-resource':   ['angular'],
    'angular-sanitize':   ['angular'],
    'angular-bootstrap':  ['bootstrap', 'angular'],
    'angular-ui':         ['angular-bootstrap']
  };

  // should be used for CommonJS modules
  // ONLY, when they follow the CommonJS scaffolding patern
  // which, is rare... very, very, rare
  conf.packages = [
    {
      name: 'cockpit',
      main: 'cockpit',
      location: 'app/cockpit'
    },
    {
      name: 'cockpit-plugin',
      location: 'app/plugin'
    },

    {
      name: 'camunda-common',
      location: 'app/common'
    },

    {
      name: 'dojo',
      location : 'assets/vendor/dojo'
    },
    {
      name: 'dojox',
      location : 'assets/vendor/dojox'
    }
  ];

  // load livereload client library (without breaking other scripts execution)
  require(['jquery'], function($) {
    $('body').append('<script src="//'+ location.hostname +':35729/livereload.js?snipver=1"></script>');
  }, function() {});

  return conf;
}));
