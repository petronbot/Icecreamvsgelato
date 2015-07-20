module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> */ \n',
    // Task configuration.
    requirejs: {
      options: {
        baseUrl: "web/js",
        name: "main",
        out: "public/js/main.js",
        mainConfigFile: "web/js/main.js",
        optimize: 'none'
      },
      dev: {
        options: {
          optimize: 'none'
        }
      },
      prod: {
        options: {
          name: "../bower_components/almond/almond",
          include: "main"
        }
      }
    },
    copy: {
      js: {
        files: [
          {
            src: 'web/bower_components/requirejs/require.js',
            dest: 'public/js/vendor/require.js'
          },
          {
            expand: true,
            cwd: 'web/',
            src: 'js/**/*.js',
            dest: 'public'
          },
          {
            expand: true,
            cwd: 'web/',
            src: 'bower_components/**/*.js',
            dest: 'public'
          }
        ]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          __dirname: false,
          require: false,
          define:false,
          exports: true,
          module: false,
          console: false
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['web/js/lib/**/*.js', 'web/js/app/**/*.js', 'web/js/*.js']
      }
    },
    compass: {
      options: {
        sassDir: 'web/scss',
        cssDir: 'public/css',
        imagesDir: 'public/img',
        raw: 'http_images_path = "/img"',
        relativeAssets: false,
        noLineComments: true,
        debugInfo: false
      },
      prod: {
        options: {
          outputStyle: 'compressed',
          environment: 'production'
        }
      },
      dev: {
        options: {
          outputStyle: 'nested',
          sourcemap: true
        }
      }
    },
    reload: {
      port: 35729, // LR default
      liveReload: {},
      proxy: {
        host: 'localhost'
        //port: '8888'
      }
    },
    watch: {
      all: {
        files: ['web/scss/**/*.scss', '<%= jshint.lib_test.src %>'],
        tasks: ['compass:dev', 'copy:js', 'reload']
      },
      css: {
        files: '<%= compass.dev.sassDir %>',
        tasks: ['compass:dev', 'reload']
      },
      js: {
        files: ['<%= jshint.lib_test.src %>'],
        tasks: ['copy:js', 'reload']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'test']
      }
    },
    jsbeautifier: {
      files: ['<%= jshint.lib_test.src %>'],
      options: {
        js: {
          indentSize: 4,
          jslintHappy: true,
          braceStyle: "collapse",
          wrapLineLength: 0,
          unescapeStrings: false
        }
      }
    },
    clean: {
      js: {
        src: ["public/js/**/*", "!**/vendor", "!**/modernizr*.js", "public/bower_components"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Better naming conventions
  grunt.registerTask('lint', 'Lint javascript files with default validator', 'jshint');
  grunt.registerTask('min', 'Minify files with default minifier', 'uglify');

  // reload
  grunt.loadNpmTasks('grunt-reload');

  // beautifier
  grunt.loadNpmTasks('grunt-jsbeautifier');

  // watch tasks
  grunt.registerTask('dev', ['reload', 'watch:all']);
  grunt.registerTask('dev:css', ['reload', 'watch:css']);
  grunt.registerTask('dev:js', ['reload', 'watch:js']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'jsbeautifier', 'clean', 'requirejs:prod', 'compass:prod']);

};
