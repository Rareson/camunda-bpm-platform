/**
 * bootstrap script of the cockpit application
 */

(function(document, window, require) {

  var pluginPackages = window.PLUGIN_PACKAGES || [];
  require(['../../../require-conf'], function(rjsConf) {
    require({
      baseUrl: '../../../',
      // paths: {
      //   'ngDefine' : 'assets/vendor/requirejs-angular-define/ngDefine',
      //   'domReady' : 'assets/vendor/require/domReady',
      //   'jquery' : 'assets/vendor/jquery/jquery',
      //   'jquery-mousewheel' : 'assets/vendor/jquery/jquery.mousewheel',
      //   'jquery-overscroll' : 'assets/vendor/jquery/jquery.overscroll',
      //   'jquery-ui' : 'assets/vendor/jquery-ui/jquery-ui-1.10.3.custom.min',
      //   'bootstrap' : 'assets/vendor/bootstrap/js/bootstrap',
      //   'bootstrap-slider' : 'assets/vendor/bootstrap-slider/bootstrap-slider',
      //   'angular' : 'assets/vendor/angular/angular',
      //   'angular-resource' : 'assets/vendor/angular/angular-resource',
      //   'angular-sanitize' : 'assets/vendor/angular/angular-sanitize',
      //   'angular-ui' : 'assets/vendor/angular-ui/ui-bootstrap-dialog-tpls-0.5.0',
      //   'angular-data-depend' : 'assets/vendor/angular-data-depend/dataDepend'
      // },
      paths: rjsConf.paths,
      shim: {
        'jquery-mousewheel' : { deps: [ 'jquery' ] },
        'jquery-overscroll' : { deps: [ 'jquery' ] },
        'jquery-ui' : { deps: [ 'jquery' ] },
        'bootstrap' : { deps: [ 'jquery' ] },
        'bootstrap-slider' : { deps: [ 'jquery' ] },
        'angular' : { deps: [ 'jquery' ], exports: 'angular' },
        'angular-resource': { deps: [ 'angular' ] },
        'angular-sanitize': { deps: [ 'angular' ] },
        'angular-ui': { deps: [ 'angular' ] },
        // 'dojox/gfx': { deps: ['dojo', 'dojox',
        //   // 'dojox/gfx/canvas',
        //   'dojo/has',
        //   'dojox/gfx/renderer',
        //   'dojox/gfx/svg'
        // ]}
      },
      packages: [
        { name: 'cockpit', location: 'app/cockpit', main: 'cockpit' },
        { name: 'cockpit-plugin', location: 'app/plugin' },
        // { name: 'camunda-common', location: 'assets/vendor/camunda-common' },
        { name: 'camunda-common', location: 'app/common' },
        // { name: 'bpmn', location : 'assets/vendor/cabpmn' },
        { name: 'bpmn', location : 'assets/vendor/camunda-bpmn.js/src/bpmn' },
        // { name: 'dojo', location : 'assets/vendor/dojo/dojo' },
        // { name: 'dojox', location : 'assets/vendor/dojo/dojox' }
        // { name: 'dojo', location : 'assets/vendor/dojo' },
        // { name: 'dojox', location : 'assets/vendor/dojox' }
        { name: 'dojo',  main: 'main', location : 'assets/vendor/dojo' },
        { name: 'dojox/gfx', main: 'gfx/_base', location : 'assets/vendor/dojox' }
      ].concat(pluginPackages)
    });

    var APP_NAME = 'cockpit';

    /**
     *
     * @see http://stackoverflow.com/questions/15499997/how-to-use-angular-scenario-with-requirejs
     */
    function ensureScenarioCompatibility() {

      var html = document.getElementsByTagName('html')[0];

      html.setAttribute('ng-app', APP_NAME);
      if (html.dataset) {
        html.dataset.ngApp = APP_NAME;
      }

      if (top !== window) {
        window.parent.postMessage({ type: 'loadamd' }, '*');
      }
    }

    /**
     * Bootstrap the angular application
     */
    function bootstrapApp(angular) {
      angular.bootstrap(document, [ APP_NAME ]);

      // ensure compatibility with scenario runner
      ensureScenarioCompatibility();
    }

    var bootstrapDeps = [
      'angular',
      'angular-resource',
      'angular-sanitize',
      'angular-ui',
      'ngDefine',
      'bootstrap',
      'jquery-ui'
    ];

    require(bootstrapDeps, function(angular) {
      // console.info('angular loaded', angular.module('ui.bootstrap'));
      require([
        'angular-bootstrap',
        APP_NAME,
        'domReady!'
      ], function() {
        console.info('second loading phase', arguments);
        bootstrapApp(angular);
      });
    });
  });

})(document, window || this, require);
