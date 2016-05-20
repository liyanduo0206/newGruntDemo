module.exports = function (grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.file.defaultEncoding = 'gbk';
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
					mangle : { //混淆变量名
						except : ['require', 'exports', 'module', 'window']
					},
					preserveComments : 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
					footer : '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */', //添加footer
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
						dest : 'dist/html',
						rename : function (dest, src) {
							var folder = src.substring(0, src.lastIndexOf('/'));
							var filename = src.substring(src.lastIndexOf('/'), src.length);
							//  var filename=src;
							filename = filename.substring(0, filename.lastIndexOf('.'));
							var fileresult = dest +"/"+ folder + filename + '.min.js';
							grunt.log.writeln("现处理文件：" + src + "  处理后文件：" + fileresult);
							return fileresult;
							//return  filename + '.min.js';
						}
					}
				]
			},
			buildb : { //任务二：压缩b.js，输出压缩信息
				options : {
					report : "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
				},
				files : [{
						expand : true,
						cwd : 'dist/html',
						src : ['js/*.js', '!js/*.min.js'],
						dest : 'dist/html'
					}
				]
			},
		},
		//压缩CSS
		cssmin : {
			prod : {
				options : {
					report : 'gzip'
					//美化代码
				},
				files : [{
						expand : true,
						cwd : 'dist/html',
						src : ['css/*.css'],
						dest : 'dist/html',
						rename : function (dest, src) {
							var folder = src.substring(0, src.lastIndexOf('/'));
							var filename = src.substring(src.lastIndexOf('/'), src.length);
							//  var filename=src;
							filename = filename.substring(0, filename.lastIndexOf('.'));
							var fileresult = dest +"/"+ folder + filename + '.min.css';
							grunt.log.writeln("现处理文件：" + src + "  处理后文件：" + fileresult);
							return fileresult;
						}
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
			build : ['Gruntfile.js', 'src/js/*.js'],
			/*t4s:['Gruntfile.js'],
			t3s:['src/*.js'],*/
			options : {
				jshintrc : '.jshintrc'
			}
		},
		csslint : {
			build : ['src/css/*.css'], //'Gruntfile.js',
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

	grunt.registerTask('prod', [
			'copy', //复制文件
			'concat', //合并文件
			'imagemin', //图片压缩
			'cssmin', //CSS压缩
			'uglify:prod', //JS压缩
			'usemin', //HTML处理
			'htmlmin' //HTML压缩
		]);
	grunt.registerTask('publish', ['clean', 'prod']);

	grunt.registerTask('default', ['jshint', 'uglify', 'csslint', 'concat']);
	
	
	 grunt.registerTask('build', 'require demo', function () {

    //第一步，读取配置信息
    var cfg = grunt.file.readJSON('cfg.json');
    cfg = cfg.requirejs;
    grunt.config.set('requirejs', { test: cfg });

    //第二步，设置参数
    grunt.log.debug('参数：' + JSON.stringify(grunt.config()));

    //第三步跑任务
    grunt.task.run(['requirejs']);
    
  });

};
