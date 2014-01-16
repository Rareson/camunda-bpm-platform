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

    'better-dom':                   'assets/vendor/better-dom/dist/better-dom',
    'better-placeholder-polyfill':  'assets/vendor/better-placeholder-polyfill/dist/better-placeholder-polyfill',

    // 'dojo':                         'assets/vendor/dojo',
    // 'dojox':                        'assets/vendor/dojox',

    // -----------------------------------------

    // custom vendor libraries
    // 'ngDefine' :                    'assets/vendor/requirejs-angular-define/ngDefine',
    'ngDefine':                     'assets/vendor/requierjs-angular-define/src/ngDefine',
    'ngParse':                      'assets/vendor/requierjs-angular-define/src/ngParse',
    'bpmn':                         'assets/vendor/camunda-bpmn.js/src/bpmn',
    'angular-data-depend':          'assets/vendor/angular-data-depend/src/dataDepend',

    // hahaha
    'requierjs-angular-define':     'assets/vendor/requierjs-angular-define/src/ngDefine',
    'requirejs-angular-define':     'assets/vendor/requierjs-angular-define/src/ngDefine',

    // -----------------------------------------

    // 'camunda-common':               'app/common',
    // 'admin':                        'app/admin/admin',
    // 'cockpit':                      'app/cockpit/cockpit',
    // 'cockpit-plugin':               'app/plugin/main',
    // 'tasklist':                     'app/tasklist/tasklist'
  };

  conf.shim = {
    'jquery': {
      exports: 'jQuery'
    },
    'jquery-ui': {
      deps:['jquery']
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
    'angular-ui': {
      deps: ['angular']
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
  conf.packages = [
    // {
    //   name: 'admin',
    //   main: 'admin',
    //   location: 'app/admin'
    // },
    // {
    //   name: 'tasklist',
    //   main: 'tasklist',
    //   location: 'app/tasklist'
    // },

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
      // main: 'main',
      location : 'assets/vendor/dojo'
    },
    {
      name: 'dojox',
      // main: 'main',
      location : 'assets/vendor/dojox'
    }
  ];



  return conf;
}));
