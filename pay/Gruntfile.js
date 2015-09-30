var rc = require('./rjsConfig.js');

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                //这里传得参数就是要处理的文件名：src||activity||mobile,......
                files: rc('src')
            }
        },

        uglify: {
            //针对rjs的压缩处理
            browserify: {
                expand: true,
                cwd: 'dest',
                src: ['*.js'],
                dest: 'js/',
                ext: '.js'
            }
        },

        watch: {
            browserify: {
                files: ['src/js/*_rjs.js', 'src/js/*/*_rjs.js', 'src/*/*/js/*_rjs.js', 'src/rjs/*.js', 'src/*/rjs/*.js', 'src/*/*/rjs/*.js'],
                tasks: ['browserify', 'uglify:browserify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    // Default task(s).
    grunt.registerTask('default', ['browserify', 'uglify:browserify', 'watch:browserify']);

};