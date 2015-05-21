'use strict';
module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Load Time-grunt individually because it doesn't match the grunt-* pattern
  require('time-grunt')(grunt);

  grunt.initConfig({

    // Define the paths
    paths: {
      dist: '../public'
    },

    // watch for changes and trigger functions
    watch: {
      sass: {
        files: ['scss/**/*', 'scss/*'],
        tasks: ['sass:dev']
      },
      js: {
        files: [
          'gruntfile.js',
          'js/**/*',
          'js/*'
        ],
        tasks: ['concat']
      },
      bower: {
        files: [
          'bower_components/**/*',
          'gruntfile.js'
        ],
        tasks: ['bower_concat']
      },
      modernizr : {
        files: [
          'bower_components/modernizr/**/*',
          'gruntfile.js'
        ],
        tasks: ['modernizr']
      },
      svg: {
        files: ['img/*'],
        tasks: ['svgmin', 'svg2png']
      },
      livereload: {
        options: { livereload: true },
        files: [
          '<%=paths.dist%>/css/*',
          '<%=paths.dist%>/js/*',
          '<%=paths.dist%>/img/**/*'
        ]
      }
    }, // end watch

    // Compress all svg files
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**/*.svg'],
          dest: '<%=paths.dist%>/img/',
          ext: '.svg'
        }]
      }
    },

    // convert svg to png for fallbacks (via modernizr)
    svg2png: {
      all: {
        files: [
          // rasterize all SVG files
          { cwd: 'img/', src: ['*.svg'], dest: '<%=paths.dist%>/img/' }
        ]
      }
    },

    // Get the modernizr modules that we require
    modernizr: {

      all: {
        // [REQUIRED] Path to the build you're using for development.
        'devFile' : 'bower_components/modernizr/modernizr.js',

        // [REQUIRED] Path to save out the built file.
        'outputFile' : 'js/_modernizr.js',

        'tests' : [
          'svg',
          'csstransforms',
          'css_filters'
        ],

        // Based on default settings on http://modernizr.com/download/
        'extra' : {
          'shiv' : true,
          'printshiv' : false,
          'load' : true,
          'mq' : false,
          'cssclasses' : true
        },

        // Based on default settings on http://modernizr.com/download/
        'extensibility' : {
          'addtest' : false,
          'prefixed' : true,
          'teststyles' : false,
          'testprops' : false,
          'testallprops' : false,
          'hasevents' : false,
          'prefixes' : true,
          'domprefixes' : false
        },

        // By default, source is uglified before saving
        'uglify' : false,

        // By default, this task will crawl your project for references to Modernizr tests.
        'parseFiles' : false
      }


    },

    // sass and scss
    sass: {
      dev: {
        options: {
          style: 'nested',
          precision: '2',
          compass: true,
          cache: '.sass-cache/'
        },
        files: {
          '<%=paths.dist%>/assets/css/style.css':'scss/style.scss',
          '<%=paths.dist%>/assets/css/no-mq.css':'scss/no-mq.scss'
        }
      },
      dist: {
        options: {
          sourcemap: false,
          style: 'compressed',
          precision: '2',
          compass: true,
          cache: '.sass-cache/'
        },
        files: {
          '<%=paths.dist%>/assets/css/style.css':'scss/style.scss',
          '<%=paths.dist%>/assets/css/no-mq.css':'scss/no-mq.scss'
        }
      }
    },

    bower_concat: {
      all: {
        dest: 'js/_bower.js',
        exclude: [
          'modernizr'
        ],
        dependencies: {
        },
        bowerOptions: {
          relative: false
        }
      }
    },

    // concat files
    concat: {
      dev : {
        files: {
          '<%=paths.dist%>/assets/js/script.min.js': [
            'js/_modernizr.js',
            'js/_bower.js',
            'js/plugins/*',
            'js/app.js'
          ]
        }
      },
      dist: {
        // to avoid ie errors on uglify
        files: {
          '<%=paths.dist%>/assets/js/ie.min.js': [
            'js/ie/*'
          ]
        }
      }
    },

    // uglify to concat & minify
    uglify: {
      dist: {
        files: {
          '<%=paths.dist%>/assets/js/script.min.js': [
            'js/_modernizr.js',
            'js/_bower.js',
            'js/plugins/*',
            'js/app.js'
          ]
        }
      }
    }

  });

  // register task
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('dist', ['sass:dist', 'modernizr', 'bower_concat', 'concat:dist', 'uglify:dist', 'svgmin', 'svg2png:all' ]);

};
