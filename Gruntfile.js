module.exports = function(grunt) {
	grunt.initConfig({
		_outJS: 'build/test1/script/test.js',
		
		clean: {
			test1: ['<%= _outJS %>']
		},
		typescript: {
			test1: {
				files: {
					'<%= _outJS %>': 'test/test1/Main.ts'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-typescript');

	grunt.registerTask('default', ['clean','typescript']);
};