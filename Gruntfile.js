module.exports = function(grunt) {
  //require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
          "css/style.css": "css/style.less"
        }
      }
    },
    watch: {
      src: {
        files: ['css/*.less'],
        tasks: ['default']
      }
    }
  });

  grunt.registerTask('default', ['less']);


}