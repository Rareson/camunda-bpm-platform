(function(factory) {
  'use strict';
  if (typeof module !== 'undefined') {
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
    jquery: 'assets/vendor/jquery/jquery',
    angular: 'assets/vendor/angular/angular',
    bootstrap: 'assets/vendor/bootstrap/js/bootstrap',

    // -----------------------------------------

    cockpit: 'app/cockpit/cockpit'
  };

  conf.shim = {
    jquery: {
      exports: 'jQuery'
    },

    angular: {
      exports: 'angular',
      deps: ['jquery']
    },

    bootstrap: {
      deps: ['jquery']
    },

    // -----------------------------------------

    cockpit: {
      exports: 'camunda-bpm-platform-cockpit',
      deps: ['angular', 'bootstrap']
    }
  };

  conf.packages = {};

  return conf;
}));
