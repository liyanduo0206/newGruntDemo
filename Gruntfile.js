module.exports = function (grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		meta : {
			banner : '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> */\n'
		},
		clean : {
			all : ['dist/html/**', 'dist/*.*'],
			image : 'dist/html/images',
			css : 'dist/html/css',
			html : 'dist/html/**/*'
		},
		copy : {
			src : {
				files : [{
						expand : true,
						cwd : 'src',
						src : ['*.html'],
						dest : 'dist/html'
					}
				]
			},
			image : {
				files : [{
						expand : true,
						cwd : 'src',
						src : ['images/*.{png,jpg,jpeg,gif}'],
						dest : 'dist/html'
					}
				]
			}
		},
		/*uglify : {
		options : {
		banner : '<%= meta.banner %>'
		},
		build : {
		src : 'src/test.js',
		dest : 'bulid/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
		}
		},*/
		//压缩JS
		uglify : {
			prod : {
				options : {
					mangle : {
						except : ['require', 'exports', 'module', 'window']
					},
					compress : {
						global_defs : {
							PROD : true
						},
						dead_code : true,
						pure_funcs : [
							"console.log",
							"console.info"
						]
					}
				},
				files : [{
						expand : true,
						cwd : 'dist/html',
						src : ['js/*.js', '!js/*.min.js'],
						dest : 'dist/html'
					}
				]
			}
		},
		//压缩CSS
		cssmin : {
			prod : {
				options : {
					report : 'gzip'
				},
				files : [{
						expand : true,
						cwd : 'dist/html',
						src : ['css/*.css'],
						dest : 'dist/html'
					}
				]
			}
		},

		//压缩图片
		imagemin : {
			prod : {
				options : {
					optimizationLevel : 7,
					pngquant : true
				},
				files : [{
						expand : true,
						cwd : 'dist/html',
						src : ['images/*.{png,jpg,jpeg,gif,webp,svg}'],
						dest : 'dist/html'
					}
				]
			}
		},
		// 处理html中css、js 引入合并问题
		usemin : {
			html : 'dist/html/*.html'
		},
		//压缩HTML
		htmlmin : {
			options : {
				removeComments : true,
				removeCommentsFromCDATA : true,
				collapseWhitespace : true,
				collapseBooleanAttributes : true,
				removeAttributeQuotes : true,
				removeRedundantAttributes : true,
				useShortDoctype : true,
				removeEmptyAttributes : true,
				removeOptionalTags : true
			},
			html : {
				files : [{
						expand : true,
						cwd : 'dist/html',
						src : ['*.html'],
						dest : 'dist/html'
					}
				]
			}
		},

		jshint : {
			build : ['Gruntfile.js', 'src/*.js'],
			/*t4s:['Gruntfile.js'],
			t3s:['src/*.js'],*/
			options : {
				jshintrc : '.jshintrc'
			}
		},
		csslint : {
			build : ['Gruntfile.js', 'src/*.js'],
			/*t4s:['Gruntfile.js'],
			t3s:['src/*.js'],*/
			options : {
				csslint : '.csslintrc'
			}
		},
		watch : {
			build : {
				files : ['src/*.js', 'src/*.css'],
				tasks : ['jshint', 'uglify'],
				options : {
					spawn : false
				}
			}
		},
		// 文件合并
		concat : {
			options : {
				separator : ';',
				stripBanners : true
			},
			js : {
				src : [
					"src/js/*.js"
				],
				dest : "dist/html/js/app.js"
			},
			css : {
				src : [
					"src/css/*.css"
				],
				dest : "dist/html/css/main.css"
			}
		}
	});

	// grunt.loadNpmTasks('grunt-unwrap');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-csslint');

	//grunt.loadNpmTasks('grunt-cssmain');
	//grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('prod', [
			'copy', //复制文件
			'concat', //合并文件
			'imagemin', //图片压缩
			'cssmin', //CSS压缩
			'uglify', //JS压缩
			'usemin', //HTML处理
			'htmlmin' //HTML压缩
		]);
	grunt.registerTask('publish', ['clean', 'prod']);
	
	grunt.registerTask('default', ['jshint', 'uglify', 'cssmain', 'csslint', 'concat']);

};
