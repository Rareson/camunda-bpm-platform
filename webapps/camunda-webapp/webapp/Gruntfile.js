module.exports = function(grunt) {
  var packageJSON = grunt.file.readJSON('package.json');

  // Project configuration.
  grunt.initConfig({
    pkg: packageJSON,

    build: {
      options: packageJSON.camundaBpm,
      production: {},
      development: {}
    },

    clean: [
      // 'src/main/webapp/app/testplugin/app/views',
      // 'src/main/webapp/app/testplugin/app'
    ],

    copy: {
      production: {},
      development: {
        files: [
          {
            expand: true,
            cwd: 'src/main/webapp/app/',
            src: ['{,**/}*.js'],
            dest: 'src/main/webapp/app/testplugin/app/'
          },
          {
            expand: true,
            cwd: 'frontend/templates/',
            src: ['{,**/}*.html'],
            dest: 'src/main/webapp/app/testplugin/app/views/'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: false
      },

      scripts: {
        files: [
          'Gruntfile.js',
          'src/main/webapp/app/**/*.js'
        ],
        tasks: [
          'build:development'
        ]
      },

      tests: {
        files: [
          'src/test/js/**/*.js'
        ],
        tasks: [
          'jshint:test',
          'karma:development'
        ]
      },

      servedAssets: {
        options: {
          libvereload: true
        },
        files: [
          'src/main/webapp/app/testplugin/app/**/*.{js,jpg,png,gif,html}'
        ],
        tasks: []
      }
    },

    jshint: {
      options: {
        browser: true,
        globals: {
          angular: true,
          jQuery: true
        }
      },
      scripts: {
        files: {
          src: [
            'Gruntfile.js',
            // 'src/main/webapp/app/testplugin/app/**/*.js',
            'src/main/webapp/app/**/*.js'
          ]
        }
      }
    },

    karma: {
      options: {
        singleRun: true,
        browsers: ['Chrome', 'Firefox', 'IE']
      },
      unit: {
        configFile: 'src/test/js/config/karma.unit.js'
      },
      e2e: {
        configFile: 'src/test/js/config/karma.e2e.js'
      },

      //continuous integration mode: run tests once in PhantomJS browser.
      ciUnit: {
        singleRun: true,
        configFile: 'src/test/js/config/karma.unit.js'
        browsers: ['PhantomJS']
      }
      ciE2e: {
        singleRun: true,
        configFile: 'src/test/js/config/karma.e2e.js'
        browsers: ['PhantomJS']
      }
    },

    jsdoc : {
      dist : {
        src: [
          'src/main/webapp/**/*.js',
          'src/test/js/{unit,e2e}/**/*.js'
        ],
        options: {
          destination: 'doc'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-karma');

  // Aimed to hold more complex build processes
  grunt.registerMultiTask('build', 'Build the frontend assets', function() {
    var tasks = [
      'jshint',
      // 'karma:'+ this.target,
      'clean'
    ];

    if (this.target === 'production') {
      tasks = tasks.concat([
        // copy non-script files
        // concat
        // minify
      ]);
    }
    else {
      tasks.push('copy:development');
    }

    grunt.task.run(tasks);
  });

  // Default task(s).
  grunt.registerTask('default', ['build:production']);
};
