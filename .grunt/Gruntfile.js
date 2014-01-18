module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['../client/stylesheets/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			}
		},
		sass: {
			dist: {
				files: {
					'../client/stylesheets/application.css': '../client/stylesheets/application.scss'
				},
				options: {
					includePaths: ['../packages/'],
					outputStyle: 'expanded',
					sourceComments: 'normal'
				}
			}
		}
	});
	grunt.registerTask('default', ['sass:dist', 'watch']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
};
