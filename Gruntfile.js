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
		},
		copy: {
			test1: {
				files: [{
					expand: true,
					cwd: 'test/_dropin',
					dot: true,
					src: '**',
					dest: 'build'
				}]
			},
			update: {
				files: [{
					expand: true,
					cwd: 'bower_components/node-d-ts/src',
					dot: true,
					src: '**',
					dest: 'lib'
				}, {
					expand: true,
					cwd: 'node_modules/typescript/lib',
					dot: true,
					src: 'lib.core.es6.d.ts',
					dest: 'lib'
				}]
			}
		},
		shell: {
			test1: {
				command: '"node_modules/.bin/tsc" --noLib --out "build/test1/script/test.js" "test/ts/test1/Main.ts"'
			},
			update: {
				command: [
					'bower prune',
					'bower update',
					'bower install'
				].join('&&')
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('update', ['clean:update','shell:update','copy:update']);
	grunt.registerTask('compile', ['clean:test1','copy:test1','shell:test1']);
	grunt.registerTask('default', ['compile']);
};