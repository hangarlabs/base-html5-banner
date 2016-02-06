var generateIndex = require('./generate-index');

function setupFiles(str) {
  bannersname = str;
  banners = (bannersname).split(';');
  for(var i = 0; i<banners.length; ++i) {
		scssfiles.push({
				src: 'src/' + banners[i] + '/scss/main.scss',
				dest: 'src/' + banners[i] + '/css/styles.css'
		});

		cmqsrc.push('src/' + banners[i] + '/css/*.css');
		cssminfiles.push({
				expand: true,
				cwd: 'src/' + banners[i] + '/css/',
				src: ['*.css'],
				dest: 'dist/' + banners[i] + '/',
				ext: '.min.css',
				extDot: 'first'
		});
		jadefiles.push({
				src: 'src/' + banners[i] + '/jade/index.jade',
				dest: 'dist/' + banners[i] + '/index.html'
		});

		copyfiles['FONT' + banners[i]] = {
								expand: true,
								cwd: 'src/fonts/',
								src: ['*.{eot,svg,ttf,woff,woff2}'],
								dest: 'dist/' + banners[i] + '/fonts/'
						};
		copyfiles['PNG' + banners[i]] = {
								expand: true,
								cwd: 'src/img/',
								src: ['na_ilus_arrow.png'],
								dest: 'dist/' + banners[i] + '/'
						};

		uglifyfiles['dist/' + banners[i] + '/global.min.js'] = ['src/' + banners[i] + '/js/plugins.js', 'src/' + banners[i] + '/js/main.js'];

		//uglifyfiles['dist/' + banners[i] + '/js/vendor/gsap.min.js'] = ['bower_components/gsap/src/uncompressed/easing/EasePack.js', 'bower_components/gsap/src/uncompressed/plugins/CSSPlugin.js', 'bower_components/gsap/src/uncompressed/TweenLite.js', 'bower_components/gsap/src/uncompressed/TimelineLite.js'];

		imgminfiles['BGLOBAL' + banners[i]] = {
				expand: true,
				cwd: 'src/img/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'dist/' + banners[i] + '/'
		};

		imgminfiles['BLOCAL' + banners[i]] = {
				expand: true,
				cwd: 'src/' + banners[i] + '/img/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'dist/' + banners[i] + '/'
		};

		compressfiles['Z' + banners[i]] = {
				options: {
						archive: 'dist/zips/' + banners[i] + '.zip'
				},
				files: [{
						expand: true,
						cwd: 'dist/' + banners[i] + '/',
						src: ['**', '!**/Thumbs.db', '!**/template.html', '!**/adtemplate.json'],
						dest: ''
				}]
		};



		scriptsfiles.push('src/' + banners[i] + '/js/**/*.js');
		imgfiles.push('src/' + banners[i] + '/**/*.{png,jpg,gif,svg}');
		imgminfiles['ALT' + banners[i]] = {
				expand: true,
				cwd: 'src/' + banners[i] + '/alt/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'dist/' + banners[i] + '/'
		};
		//svgminfiles.push({
		//    expand: true,
		//    cwd: 'src/img/',
		//    src: ['**/*.svg'],
		//    dest: 'dist/' + banners[i] + '/img/'
		//});
		//svgminfiles.push({
		//    expand: true,
		//    cwd: 'src/' + banners[i] + '/img/',
		//    src: ['**/*.svg'],
		//    dest: 'dist/' + banners[i] + '/img/'
		//});
	}
}

var banners;
var bannersname = '';
var cmqsrc = [];
var scssfiles = [];

var jadefiles = [];
var cssminfiles = [];
var uglifyfiles = {};
var imgminfiles = {};
var svgminfiles = [];
var compressfiles = {};
var copyfiles = {};
var scriptsfiles = [];
var imgfiles = [];
var banners = (bannersname).split(';');

var path = require('path');

var folderMount = function folderMount(connect, point) {
		return connect.static(path.resolve(point));
};

// include static images
copyfiles['static'] = {
		expand: true,
		cwd: 'src/static',
		src: ['*.jpg'],
		dest: 'dist/static/'
};

module.exports = function (grunt) {
	var pkg = grunt.file.readJSON('package.json');
	setupFiles(pkg.bannersname);
	// Project configuration.
	grunt.initConfig({
		pkg: pkg,
		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\nAuthor: <%= pkg.author.name %> - <%= pkg.author.email %> */\n',
		connect: {
			server: {
				options: {
					port: 8080,
					base: 'dist/',
					directory: '',
					hostname: '*',
					livereload: true,
					middleware: function (connect) {
						return [
							require('connect-livereload')(),
							folderMount(connect, 'dist'),
							require('serve-index')('dist', {'icons': true})
						];
					}
				}
			}
		},
		// process + minify SCSS into CSS
		sass: {
			development: {
				options: {
					loadPath: require('node-bourbon').includePaths
				},
				files: scssfiles
			}
		},
		// combine mediaqueries
		cmq: {
			multiple_files: {
				expand: true,
				src: cmqsrc
			}
		},
		// auto browserprefix for CSS
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9']
			},
			multiple_files: {
				expand: true,
				src: cmqsrc
			}
		},
		// minify CSS
		cssmin: {
			minify: {
				options: {
					banner: '<%= banner %>'
				},
				files: cssminfiles
			}
		},
		// minify and concat JS
		uglify: {
			site: {
				options: {
					banner: '<%= banner %>',
					mangle: true,
					beautify: false
				},
				files: uglifyfiles
			}
		},
		// process jade
		jade: {
			compile: {
				options: {
						pretty: false
				},
				files: jadefiles
			}
		},

		// copy config.js if SVP, fonts if custom fonts
		copy: copyfiles,
		// optimize svg
		svgmin: {
			options: {
				plugins: [{
					removeUselessStrokeAndFill: true
				}, {
					removeDoctype: true
				}, {
					removeComments: true
				}, {
					removeEditorsNSData: true
				}, {
					convertColors: true
				}, {
					convertStyleToAttrs: false
				}, {
					cleanupIDs: false
				}, {
					convertShapeToPath: true
				}, {
					cleanupEnableBackground: true
				}, {
					cleanupNumericValues: true
				}, {
					collapseGroups: true
				}, {
					convertPathData: true
				}, {
					removeUselessStrokeAndFill: true
				}]
			},
			dist: {
				files: svgminfiles
			}
		},
		// optimize images
		imagemin: imgminfiles,
		// grunt-contrib-compress
		compress: compressfiles,
		// watch for changes in files
		watch: {
			// watch for change in grunt file then reload if necessary
			configFiles: {
				files: ['Gruntfile.js'],
				tasks: ['sass', 'cmq', 'cssmin', 'uglify', 'newer:imagemin', 'jade',  'copy',  'compress'],
				options: {
					reload: true
				}
			},
			// watch for changes in CSS
			styles: {
				files: ["**/*.scss", ],
				tasks: ['sass',  'cmq', 'cssmin'],
				options: {
					livereload: true,
					event: ['added', 'deleted', 'changed']
				}
			},
			// watch for changes in script
			scripts: {
				files: scriptsfiles,
				tasks: ['newer:uglify'],
				options: {
					livereload: true,
					event: ['added', 'deleted', 'changed']
				}
			},
			// watch for updates in images
			images: {
				files: imgfiles,
				tasks: ['newer:imagemin', 'newer:svgmin', 'copy'],
				options: {
					livereload: true,
					event: ['added', 'deleted', 'changed']
				}
			},

			// watch for updates in fonts
			fonts: {
				files: 'src/fonts/**/*.{ttf,eot,woff,woff2,svg}',
				tasks: ['copy'],
				options: {
					livereload: true,
					event: ['added', 'deleted', 'changed']
				}
			},

			// watch for updates in jades
			jades: {
				files: ["src/**/*.jade"],
				tasks: ['jade'],
				options: {
					livereload: true,
					event: ['added', 'deleted', 'changed']
				}
			}
		},
		// generate custom index.html
		processhtml: {
			options: {
				data: {
					bannerList: generateIndex()
				}
			},
			dist: {
				files: {
					'dist/index.html': ['src/index.html']
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-processhtml');

	// Default task(s).
	grunt.registerTask('default', ['sass','autoprefixer', 'cmq', 'cssmin', 'uglify', 'newer:imagemin', 'newer:svgmin', 'jade', 'copy', 'processhtml', 'connect', 'watch']);
	grunt.registerTask('build', ['sass','autoprefixer', 'cmq', 'cssmin', 'uglify', 'newer:imagemin', 'newer:svgmin', 'jade', 'copy', 'compress', 'processhtml']);
};
