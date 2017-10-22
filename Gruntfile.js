'use strict';

module.exports = function(grunt) {

    require('time-grunt')(grunt);

    // jit-grunt makes sure to load any other node modules that are reuired in the project
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // all configuration related to grunt is done here
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },

        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                }
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: './'
                }
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },

            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['img/*.{png,gif,jpg}'],
                    dest: 'dist/'
                }]
            }
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            /** firegured out by trial and error */
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block) {
                                var generated = context.options.generated;
                                generated.option = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        uglify: {
            dist: {}
        },

        cssmin: {
            dist: {}
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: ['dist/css/*.css', 'dist/js/*.js']
                }]
            }
        },

        usemin: {
            html: ['dist/contacus.html', 'dist/aboutus.html', 'dist/index.html'],
            options: {
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        }

    });

    // registered a task named css that is going to perform the action mentioned in the sass object of the config json
    grunt.registerTask('css', ['sass']);

    // watch task will always be the last, since it will stop other tasks
    grunt.registerTask('default', ['browserSync', 'watch']);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);

    // grunt-usemin plugin expects that the script tags is same in all the html files.
    // useminPrepare will prepare the files and configure the concat plugins so that they work correctly.
    /**
    * filerev adds a new file revision number as an additional extension to the name of the css and js files,
    * takes the content of the file and generated an MD5 hash
    */
}
