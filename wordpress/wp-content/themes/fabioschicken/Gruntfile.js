module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			develop: {
				src: 'js/app.js',
				dest: 'js/bundle.js',
				options: {
					//watch: true,
					//keepAlive: true,
					transform: ['reactify'],
					watchifyOptions: {
						'poll': true // for NFS mounts (ie: vagrant)
					}
				}
			}
		},
		less: {
			develop: {
				options: {
					paths: ['./less'],
					compress: true
				},
				files: {
					'./bundle.css': './less/main.less'
				}
			}
		},
		watch: {
			less: {
				files: ["./less/**/*"],
				tasks: ["less:develop"]
			},
			js: {
				files: ["./js/**/*"],
				tasks: ["browserify:develop"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('start', ['less:develop','browserify:develop','watch']);
}
