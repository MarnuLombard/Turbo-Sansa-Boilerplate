'use strict';
module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // watch for changes and trigger sass, concat, uglify and livereload
    watch: {
      icons: {
        files: ['icons/*.svg'],
        tasks: ['webfont']
      },
      sass: {
        files: ['scss/**/*', 'scss/*'],
        tasks: ['sass:dev']
      },
      js: {
        files: [
          'Gruntfile.js',
          'js/*',
          'js/**/*'
        ],
        tasks: ['concat']
      },
      livereload: {
        options: { livereload: true },
        files: [
          '../dist/css/*',
          '../dist/js/*',
          '../dist/*.php',
          '../dist/includes/**/*.php'
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
          cwd: 'src/img',
          src: ['**/*.svg'],
          dest: '../dist/img/',
          ext: '.svg'
        }]
      }
    },

    // To generate the icon fonts from the files in my ./src/icons/ directory
    webfont: {
      icons: {
        src: "icons/*.svg",
        dest: "../dist/fonts",
        options: {
          hashes: false,
          htmlDemo: false,
          stylesheet: "scss"
        }
      }
    },

    // sass and scss
    sass: {
      dev: {
        options: {
          sourcemap: true,
          style: 'nested',
          precision: '2',
          compass: true,
          require: 'sass-globbing',
          cache: 'delete/'
        },
        files: {
          '../dist/css/style.css':'scss/style.scss',
          '../dist/css/no-mq.css':'scss/no-mq.scss'
        }
      },
      dist: {
        options: {
          sourcemap: false,
          style: 'compressed',
          precision: '2',
          compass: true,
          require: 'sass-globbing',
          cache: 'delete/'
        },
        files: {
          '../dist/css/style.css':'scss/style.scss',
          '../dist/css/no-mq.css':'scss/no-mq.scss'
        }
      }
    },

    // concat files
    concat: {
      dev : {
        files: {
          '../dist/js/script.min.js': [
            'js/vendor/*',
            'js/plugins/*'
          ],
          '../dist/js/app.min.js': [
            'js/app.js'
          ]
        }
      },
      dist: {
      // to avoid ie errors on uglify
        files: {
          '../dist/js/ie.min.js': [
            'js/ie/*'
          ]
        }
      }
    },

    // uglify to concat & minify
    uglify: {
      dist: {
        files: {
          '../dist/js/script.min.js': [
            'js/vendor/*',
            'js/plugins/*'
          ],
          '../dist/js/app.min.js': [
            'js/app.js'
          ]
        }
      }
    }

  });

  // register task
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('dist', ['webfont', 'sass:dist', 'concat:dist', 'uglify:dist']);

};
