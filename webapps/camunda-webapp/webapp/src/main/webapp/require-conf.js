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
    'jquery-mousewheel':            'assets/vendor/jquery/jquery.mousewheel',
    'jquery-overscroll':            'assets/vendor/jquery/jquery.overscroll',

    'bootstrap':                    'assets/vendor/bootstrap/dist/js/bootstrap',
    'bootstrap-slider':             'assets/vendor/bootstrap-slider/bootstrap-slider',

    'angular':                      'assets/vendor/angular/angular',
    'angular-resource':             'assets/vendor/angular/angular-resource',
    'angular-sanitize':             'assets/vendor/angular/angular-sanitize',
    'angular-ui':                   'assets/vendor/angular-ui/dist/angular-ui',

    'better-dom':                   'assets/vendor/better-dom/dist/better-dom',
    'better-placeholder-polyfill':  'assets/vendor/better-placeholder-polyfill/dist/better-placeholder-polyfill',

    'dojo':                         'assets/vendor/dojo',
    'dojox':                        'assets/vendor/dojox',

    // -----------------------------------------

    // custom vendor libraries
    'requirejs-angular-define':     'assets/vendor/requirejs-angular-define/ngDefine',
    'angular-data-depend':          'assets/vendor/angular-data-depend/src/dataDepend',
    'bpmn':                         'assets/vendor/camunda-bpmn.js/src/bpmn',
    'camunda-common':               'assets/vendor/camunda-common',

    // -----------------------------------------

    admin:                          'app/admin',
    cockpit:                        'app/cockpit',
    tasklist:                       'app/tasklist'
  };

  conf.shim = {
    'jquery': {
      exports: 'jQuery'
    },
    'jquery-mousewheel': {
      deps:['jquery']
    },
    'jquery-overscroll': {
      deps:['jquery']
    },

    'bootstrap': {
      deps: ['jquery']
    },
    'bootstrap-slider': {
      deps: ['bootstrap']
    },

    'angular': {
      exports: 'angular',
      deps: ['jquery']
    },
    'angular-resource': {
      deps: ['angular']
    },
    'angular-sanitize': {
      deps: ['angular']
    },

    // -----------------------------------------

    cockpit: {
      exports: 'camunda-bpm-platform-cockpit',
      deps: ['angular', 'bootstrap']
    }
  };

  // should be used for CommonJS modules
  // ONLY, when they follow the CommonJS scaffolding patern
  // which, is rare... very, very, rare
  conf.packages = {};

  return conf;
}));
