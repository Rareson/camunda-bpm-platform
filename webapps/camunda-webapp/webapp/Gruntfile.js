var path = require('path');
var fs = require('fs');
var _ = require('underscore');

module.exports = function(grunt) {
  var packageJSON = grunt.file.readJSON('package.json');
  var copyVendorFileExp = /(\/|\\)(lib|resource|demo|example|test|doc)/i;

  // Project configuration.
  grunt.initConfig({
    pkg: packageJSON,

    bower: {
      options: {},
      project: {
        targetDir: 'src/main/webapp/assets/vendor'
      }
    },

    build: {
      production: {},
      development: {}
    },

    clean: {
      target: [
        'target/webapp'
      ],
      assets: [
        'target/webapp/assets'
      ]
    },

    copy: {
      development: {
        files: [
          {
            expand: true,
            cwd: 'src/main/webapp/WEB-INF',
            src: ['*'],
            dest: 'target/webapp/WEB-INF'
          },
          {
            expand: true,
            cwd: 'src/main/webapp/',
            src: [
              'require-conf.js',
              'index.html'
            ],
            dest: 'target/webapp/'
          },
          {
            expand: true,
            cwd: 'src/main/webapp/',
            src: [
              '{app,plugin,develop}/{,**/}*.{js,html}'
            ],
            dest: 'target/webapp/'
          }
        ]
      },

      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/main/webapp/assets',
            src: [
              'img/**/*',
              'vendor/**/*.{js,css,jpg,png,gif,html,eot,ttf,svg,woff}'
            ],
            // filter: function(filepath) {
            //   return !copyVendorFileExp.test(filepath);
            // },
            dest: 'target/webapp/assets'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: false
      },

      // watch for source script changes
      scripts: {
        files: [
          'src/main/webapp/require-conf.js',
          'src/main/webapp/{app,develop,plugin}/**/*.{js,html}'
        ],
        tasks: [
          // 'jshint:scripts',
          // 'newer:copy:development'
          'copy:development'
        ]
      },

      // watch for source script and test changes
      // QUESTION:
      // Does that entry make sense?
      // We can use `karma:unit` and `karma:e2e` instead of watching
      tests: {
        files: [
          'src/main/webapp/{app,assets,develop,plugin}/**/*.js',
          'src/test/js/{config,e2e,test,unit}/{,**/}*.js'
        ],
        tasks: [
          // 'jshint:test',
          // we use the CI versions (who are runned only once)
          // 'karma:testOnce',
          'karma:unitOnce',
          'karma:e2eOnce'
        ]
      },

      styles: {
        files: [
          'src/main/webapp/styles/{**/,}*.less'
        ],
        tasks: [
          'less:development'
        ]
      },

      servedAssets: {
        options: {
          livereload: true
        },
        files: [
          'target/webapp/{app,plugin,develop,assets}/**/*.{css,js}'
        ],
        tasks: []
      }
    },

    // jshint: {
    //   options: {
    //     browser: true,
    //     globals: {
    //       angular: true,
    //       jQuery: true
    //     }
    //   },
    //   test: {
    //     files: {
    //       src: [
    //         'test/js/{config,e2e,unit}/{,**/}*.js'
    //       ]
    //     }
    //   },
    //   scripts: {
    //     files: {
    //       src: [
    //         'Gruntfile.js',
    //         'src/main/webapp/{app,assets,develop,plugin}/{,**/}*.js'
    //       ]
    //     }
    //   }
    // },

    karma: {
      options: {
        browsers: ['Chrome', 'Firefox']//, 'IE']
      },

      // to test the testing environment
      test: {
        configFile: 'src/test/js/config/karma.test.js'
      },

      unit: {
        configFile: 'src/test/js/config/karma.unit.js'
      },
      e2e: {
        configFile: 'src/test/js/config/karma.e2e.js'
      },

      //continuous integration mode: run tests once in PhantomJS browser.
      unitOnce: {
        singleRun: true,
        autoWatch: false,
        configFile: 'src/test/js/config/karma.unit.js',
        browsers: ['PhantomJS']
      },
      e2eOnce: {
        singleRun: true,
        autoWatch: false,
        configFile: 'src/test/js/config/karma.e2e.js',
        browsers: ['PhantomJS']
      }
    },

    // jsdoc : {
    //   dist : {
    //     src: [
    //       'src/main/webapp/**/*.js',
    //       'src/test/js/{unit,e2e}/**/*.js'
    //     ],
    //     options: {
    //       destination: 'doc'
    //     }
    //   }
    // },

    less: {
      options: {
        // paths: []
      },

      production: {
        options: {
          cleancss: true
        },
        files: {
          'target/webapp/assets/css/common.css': 'src/main/webapp/styles/common.less',
          'target/webapp/assets/css/cockpit/loader.css': 'src/main/webapp/styles/cockpit/loader.less',
          'target/webapp/assets/css/admin/loader.css': 'src/main/webapp/styles/admin/loader.less',
          'target/webapp/assets/css/tasklist/loader.css': 'src/main/webapp/styles/tasklist/loader.less'
        }
      },

      development: {
        files: {
          'target/webapp/assets/css/common.css': 'src/main/webapp/styles/common.less',
          'target/webapp/assets/css/cockpit/loader.css': 'src/main/webapp/styles/cockpit/loader.less',
          'target/webapp/assets/css/admin/loader.css': 'src/main/webapp/styles/admin/loader.less',
          'target/webapp/assets/css/tasklist/loader.css': 'src/main/webapp/styles/tasklist/loader.less'
        }
      }
    },

    // requirejs: {
    // ngr: {
    //   // see https://github.com/jrburke/r.js/blob/master/build/example.build.js
    //   options: {
    //     // appDir: 'src/main/webapp',

    //     dir: 'target/webapp',

    //     // Inlines the text for any text! dependencies, to avoid the separate
    //     // async XMLHttpRequest calls to load those dependencies.
    //     inlineText: true,

    //     optimize: 'none',

    //     paths: requireConf.paths,
    //     shim: requireConf.shim,

    //     // CommonJS packages support
    //     // http://requirejs.org/docs/api.html#packages
    //     packages: requireConf.packages,

    //     //
    //     optimizeCss: 'none'
    //   },

    //   app: {
    //     modules: [{
    //       name: 'src/main/webapp/app',
    //       out: 'target/webapp/app/app.js',
    //       override: {},
    //       exclude: []
    //     }]
    //   },

    //   admin: {
    //     modules: [{
    //       name: 'src/main/webapp/app/admin/admin',
    //       out: 'target/webapp/app/admin.js',
    //       override: {},
    //       exclude: []
    //     }]
    //   },

    //   cockpit: {
    //     modules: [
    //       {
    //         name: 'cockpit',
    //         // name: 'target/webapp/cockpit',
    //         out: 'target/webapp/app/cockpit.js',
    //         override: {},
    //         exclude: []
    //       }
    //     ]
    //   },

    //   tasklist: {
    //     modules: [{
    //       name: 'src/main/webapp/app/tasklist/tasklist',
    //       out: 'target/webapp/app/tasklist.js',
    //       override: {},
    //       exclude: []
    //     }]
    //   }
    // }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-task');
  // grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-karma');
  // grunt.loadNpmTasks('grunt-newer');

  // custom task for ngDefine minification
  grunt.registerMultiTask('ngr', 'Minifies the angular related scripts', function() {
    var done = this.async();
    var ngr = require('requirejs-angular-define/src/ngr');

    var setup = _.extend({}, this.options(), this.data);
    // console.info('ngr options', setup);

    ngr.optimize(setup, function() {
      console.info('optimized', arguments.length);
      done();
    }, function(e) {
      console.log('Error during minify: ', e);
      done(new Error('With failures: ' + e));
    });
  });

  // Aimed to hold more complex build processes
  grunt.registerMultiTask('build', 'Build the frontend assets', function() {
    var tasks = [
      'clean',
      'bower'
    ];

    if (this.target === 'production') {
      tasks = tasks.concat([
        // TODO: minification using ngr:
        // - Minifaction: https://app.camunda.com/jira/browse/CAM-1667
        // - Bug in ngDefine: https://app.camunda.com/jira/browse/CAM-1713
        'copy:assets',
        'copy:development'
      ]);
    }
    else {
      tasks = tasks.concat([
        'copy:assets',
        'copy:development'
      ]);
    }

    tasks.push('less:'+ this.target);

    grunt.task.run(tasks);
  });

  // Default task(s).
  grunt.registerTask('default', ['build:production']);
};
