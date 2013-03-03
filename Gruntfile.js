var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        manifest: {
            generate: {
                options: {
                    basePath: "app/",
                    network: ["online.html"],
                    fallback: ["/online1.html /offline.html"],
                    exclude: ["online.html", "online1.html"],
                    verbose: true,
                    timestamp: true
                },
                src:[
                    "css/*.css",
                    "js/*.js",
                    "*.html",
                    "img/*.*"
                ],
                dest: "app/offline.appcache"
            }
        },

        connect: {
            livereload: {
                options: {
                    base: 'app',
                    port: 9001,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, '.')]
                    }
                }
            }
        },
        // Configuration to be run (and then tested)
        regarde: {
            js: {
                files: 'app/js/**/*.js',
                tasks: ['manifest'],
                spawn: true
            },
            css: {
                files: 'app/css/**/*.css',
                tasks: ['manifest']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-livereload');


    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('watch', ['regarde']);


};