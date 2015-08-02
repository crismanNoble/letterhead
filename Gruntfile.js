module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  //grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    less: {
      development: {
        options: {
          plugins: [
            // less_autoprefix,
            // less_groupMQ,
          ]
        },
        files: {
          "dist/css/style.css": "src/less/style.less"
        }
      }
    },
    watch: {
      src: {
        files: ['src/**/*'],
        tasks: ['default']
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['index.html'], dest: 'dist/'},
          {expand: true, cwd: 'src/', src: ['images/*'], dest: 'dist/'},
          {expand: true, cwd: 'src/', src: ['js/*'], dest: 'dist/'},
          {expand: true, cwd: 'src/less/', src: ['main.css'], dest: 'dist/css'}
        ]
      },
      bower: {
        files: [
          {expand: true, cwd: 'bower_components/canonical.css/', src: ['canonical.min.css'], dest: 'dist/css'},
          {expand: true, cwd: 'bower_components/jquery/dist/', src: ['jquery.min.js'], dest: 'dist/js'}
        ]
      }
    },
    bower: {
      install: {
        options: {
          copy: false
        }

       //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },


    buildGhPages: {
      ghPages: {
        // Leave empty if you just want to run the defaults
      },
    },


    clean: ["dist"]

  });

  grunt.registerTask('default', ['bower','clean','copy','less']);
  grunt.registerTask('build',['default','buildGhPages','default']);


}