
// Grunt file which includes php targets by Dipika Joshi

var configurationFile = require('./config');

module.exports = function(grunt) {
  
grunt.initConfig({
    
pkg: grunt.file.readJSON('package.json'),

config: configurationFile,

clean: ['<%= config.report %>','<%= config.allcode %>'],

mkdir: {
	all: {
  	      options: {
        	      mode: 0777,
                      create: ['<%= config.report %>']
                       }
             }
        },

copy: {
	main: {
		files: [
      				// includes files within path 
				{
				expand: true,
				src: ['<%= config.src %>/**' , '<%= config.testCase %>/**' ],
				dest: '<%= config.allcode %>'
				}
			]
		}
	},

composer : {
	options : {
		//tells to execute php
		usePhp: true, 
		// loc where composer.json is located
		cwd: '.',
		//location for composer exe
                composerLocation: '<%= config.composerLocation %>'
    		}
	},
	


phpunit: {
	classes: {
	dir: 'tests'
		},
	options: {
		//exe binary path for phploc
	        bin: '<%= config.punitPharLocation %>',
		//Generate code coverage report in Clover XML format.
		coverageClover: '<%= config.punitCoverageClover %>',
		//Generate code coverage report in HTML format.
		coverageHtml: '<%= config.punitCoverageHtml %>',
		//Serialize PHP_CodeCoverage object to file.
		coveragePhp: '<%= config.punitCoveragePhp %>',
		//Generate code coverage report in text format
		coverage: true
		}
	},

zip: {
	default: {
		src: '<%= config.zipSource %>',
		dest: '<%= config.zipDest %>'
		}
	},


phpdocumentor: {
        dist: {
            options: {
		//bin is optional here
                directory : '<%= config.docsSource %>',
                target : '<%= config.phpdocsReportLocation %>'
            }
        }
    }


});

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-mkdir');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-composer');
grunt.loadNpmTasks('grunt-phpunit');
grunt.loadNpmTasks('grunt-phpdocumentor');


grunt.registerTask('default', [ 'clean' , 'mkdir' , 'copy' , 'composer', 'phpunit' , 'phpdocumentor']);

};
