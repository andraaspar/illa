module.exports = function(grunt) {
	grunt.initConfig({
		_outJS: 'build/test1/script/test.js',
		
		clean: {
			update: ['lib/*'],
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

	grunt.registerTask('compile', ['clean:test1','typescript:test1']);
	grunt.registerTask('default', ['compile']);
};