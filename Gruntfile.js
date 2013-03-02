/*global module:false*/
module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
         *  Lint
         *  
         */
        jshint: {
            all: ['src/**/*.js', 'tests/!(libs)/*.js'],
            options: {
                es5:            true, // Allows EcmaScript5 syntax
                curly:          false, // Always use curlys {}
                eqeqeq:         true, // No more == for you, === only
                immed:          true, // prohibits the use of immediate function invocations without wrapping them in parentheses
                latedef:        true, // no setting variables before they are defined
                newcap:         true, // Always call constructors with a Cap
                noarg:          true, // prohibits arguments.caller and arguments.callee
                sub:            true, // This option suppresses warnings about using [] notation when it can be expressed in dot notation: person['name'] vs. person.name.
                undef:          true, // prohibits the use of explicitly undeclared variables
                boss:           true, // Allows assignments in ifs - if (a = 10) {}
                eqnull:         true, // Allows == null check for null or undefined
                browser:        true, // Sets up globals for browser like window and document
                maxdepth:       3, // Max nesting of methods 3 layers deep
                unused:         true, // Warns on unused variables
                expr:           true, // Allowed for chais expect(false).to.be.false; assertion style.
                devel:          true, // Allows console.log's etc
                trailing:       true, // Prohibits trailing whitespace

                globals: {
                    require:    true,
                    define:     true,
                    requirejs:  true,
                    describe:   true,
                    expect:     true,
                    it:         true,
                    beforeEach: true,
                    afterEach:  true,
                    sinon:      true,
                    mocha:      true
                }
            }
        },

        /*
         *  Test Kita
         *  
         */
        mocha: {
            index: ['tests/index.html']
        },

        /*
         *  Build the minified Kita lib
         *  
         */
        requirejs: {
            compile: {
                options: {
                    name:                       "../libs/almond", // Path to almond requirejs production runner for built js
                    baseUrl:                    "src",
                    include:                    ["build"],
                    insertRequire:              ["build"],
                    wrap:                       true, // Wrap everything up in a closure
                    generateSourceMaps:         true, // Experimental
                    preserveLicenseComments:    false, // Needs turned off for generateSourceMaps
                    optimize:                   "uglify2", // Supports generateSourceMaps
                    out:                        "kita.min.js"
                }
            }
        },

        /*
         *  File Watcher
         *  
         */
        watch: {
            scripts: {
                tasks: ['build'],
                files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.html', 'tests/**/*.js', 'tests/index.html', 'utilities/**/*.js'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    // Load the tasks
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['jshint', 'mocha']);
    grunt.registerTask('build', ['test', 'requirejs']);
    grunt.registerTask('default', 'build');

};