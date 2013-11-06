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
        tasks: ['sass']
      },
      js: {
        files: [
          'Gruntfile.js',
          'js/*',
          'js/**/*'
        ],
        tasks: ['concat', 'uglify']
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
      dist: {
        options: {
          sourcemap: true,
          style: 'compressed',
          precision: '2',
          compass: true,
          cache: 'delete/'
        },
        files: {
          '../dist/css/style.css':'scss/style.scss',
          '../dist/css/no-mq.css':'scss/no-mq.scss'
        }
      }
    },

    // concat files
    // to avoid ie errors on uglify
    concat: {
      ie: {
        files: {
          '../dist/js/ie.min.js': [
            'js/ie/*'
          ]
        }
      }
    },

    // uglify to concat & minify
    uglify: {
      script: {
        files: {
          '../dist/js/script.min.js': [
            'js/vendor/*',
            'js/plugins/*'
          ]
        }
      },
      app: {
        files: {
          '../dist/js/app.min.js': [
            'js/app.js'
          ]
        }
      }
    }

  });


// register task
grunt.registerTask('default', ['watch']);

};
