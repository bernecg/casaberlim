// Gruntfile.js

// module.exports is our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here

    // configure connect to spin up the static server
    connect: {
      server: {
        options: {
          port: 8080,
          keepalive: true,
          hostname: '*',
          base: 'webapp'
        }
      }
    },

    // configure jshint to show errors and warnings
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in webapp
      build: ['Gruntfile.js', 'webapp/**/*.js']
    },

    // configure uglify to minify js files
    uglify: {
      options: {
        banner: '/\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n/\n'
      },
      dev: {
        files: { 'dist/js/magic.min.js': ['webapp/js/magic.js', 'webapp/js/magic2.js'] }
      },
      production: {
        files: { 'dist/js/magic.min.js': 'webapp/**/*.js' }
      }
    },

    // compile less stylesheets to css
    less: {
      build: {
        files: {
          'dist/css/pretty.css': 'webapp/css/pretty.less'
        }
      }
    },

    // configure cssmin to minify css files
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'webapp/css/style.css'
        }
      }
    },

    // configure watch to auto update
    watch: {

      // for stylesheets, watch css and less files
      // only run less and cssmin stylesheets: {
      files: ['webapp//*.css', 'webapp//*.less'],
      tasks: ['less', 'cssmin'],

      // for scripts, run jshint and uglify
      scripts: {
        files: 'webapp/**/*.js', tasks: ['jshint', 'uglify']
      }
    },

    openui5_preload: {
        component: {
            options: {
                resources: {
                    cwd: 'webapp', // path to app root folder
                    webapp: [ // include/exclude patterns for files
                        '**/*.js', // in this example, we do only have js/xml files
                        '**/*.xml' // but this can be used to e.g. exclude language-specific files
                    ],
                    prefix: 'my/app' // namespace prefix (in case the namespace is not already in folder structure like sap/ui/core/**)
                },
                dest: 'dist' // destination for the Component-preload.js file
            },
            components: 'my/app' // specify which component(s) should be processed
        }
    }


  });


  // ============= // CREATE TASKS ========== //

  // this default task will start a local server on port 8080
  grunt.registerTask('default', ['connect:server']);

  // this serve task will run jshint and start a local server on port 8080
  grunt.registerTask('serve', ['jshint', 'connect:server']);

  // this task will only run the configuration to update code to master
  grunt.registerTask('masterfy', ['uglify', 'cssmin', 'less','jshint']);

  // this task will only run uglify
  grunt.registerTask('uglify', ['uglify']);

  // this task will only run minify
  grunt.registerTask('minify', ['cssmin']);

  // this task will only run lessify
  grunt.registerTask('lessify', ['less']);

  // this task will only run jshint
  grunt.registerTask('jshint', ['jshint']);

  // this task will only run the dev configuration
  grunt.registerTask('dev', ['jshint:dev', 'uglify:dev', 'cssmin:dev', 'less:dev']);

  // only run production configuration
  grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production']);

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-ui5');

};
