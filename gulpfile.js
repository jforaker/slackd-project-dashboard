var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	del = require('del'),
	livereload = require('gulp-livereload'),
	inject = require("gulp-inject"),
	html2js = require('gulp-html2js'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	debug = require('gulp-debug'),
	svgstore = require('gulp-svgstore'),
	merge = require('merge-stream'),
	watch = require('gulp-watch'),
	changed = require('gulp-changed'),
	header = require('gulp-header'),
	fs = require('fs'),
	config = require('./build.config.js'),
	pkg = require('./package.json'),
	gutil = require('gulp-util'),
	http = require('http'),
	ecstatic = require('ecstatic'),
    //replace = require('gulp-replace-task'),
    sequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    chalk = require('chalk'),
    flags = require('minimist')(process.argv.slice(2)),
    replace = require('gulp-replace')
    ;


/**
 * Copy files to build dir
 */

gulp.task('copy', function () {
	var assets = gulp.src('./client/assets/**/*', {base: './client/assets/'})
			.pipe(changed(config.build_dir + '/assets'))
			.pipe(gulp.dest(config.build_dir + '/assets')),

		svg = gulp.src('./client/assets/svg-defs.svg')
			.pipe(changed(config.build_dir + '/assets'))
			.pipe(gulp.dest(config.build_dir + '/assets')),

        src = gulp.src(['client/**/*.js', '!client/**/*.spec.js', '!client/assets/**/*.js'])
            .pipe(changed(config.build_dir + '/client'))
            .pipe(gulp.dest(config.build_dir + '/client')),

        vendorjsfiles = gulp.src(config.vendor_files.js, {base: '.'})
            .pipe(changed(config.build_dir))
            .pipe(gulp.dest(config.build_dir)),

        vendorcssfiles = gulp.src(config.vendor_files.css, {base: '.'})
            .pipe(changed(config.build_dir))
            .pipe(gulp.dest(config.build_dir)),

        vendorfonts = gulp.src(config.vendor_files.fonts, {base: '.'})
            .pipe(changed(config.build_dir))
            .pipe(gulp.dest(config.build_dir))
        ;


	return merge(assets, svg, src, vendorjsfiles, vendorfonts, vendorcssfiles);
});

gulp.task('less', function () {
	return gulp.src(config.app_files.less)
		.pipe(changed(config.build_dir + '/assets', {extension: '.css'}))
		.pipe(less())
		.pipe(rename(function (path) {
			path.basename = pkg.name + '-' + pkg.version;
		}))
		.pipe(gulp.dest(config.build_dir + '/assets'));
});

gulp.task('jshint', function () {
	var options = {
		curly: true,
		immed: true,
		newcap: true,
		noarg: true,
		sub: true,
		boss: true,
		eqnull: true
	};

	return gulp.src(config.app_files.js)
		.pipe(jshint(options))
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});

gulp.task('html2js', function () {

	var atpls = gulp.src(config.app_files.atpl)
			.pipe(html2js({base: 'client/app', outputModuleName: 'templates-app'}))
			.pipe(changed('./build', {extension: '.js'}))
			.pipe(concat('templates-app.js'))
			.pipe(gulp.dest('./build')),

		ctpls = gulp.src(config.app_files.ctpl)
			.pipe(html2js({base: 'client/common', outputModuleName: 'templates-common'}))
			.pipe(changed('./build', {extension: '.js'}))
			.pipe(concat('templates-common.js'))
			.pipe(gulp.dest('./build'));

	return merge(atpls, ctpls);
});

var indexTask = function () {
	var target = gulp.src('client/index.html'),

		files = [].concat(
			config.vendor_files.js,
			'client/**/*.js',
			config.vendor_files.css,
            config.vendor_files.fonts,
			'templates-common.js',
			'templates-app.js',
			'assets/' + pkg.name + '-' + pkg.version + '.css'
		),

		sources = gulp.src(files, {read: false, cwd: config.build_dir, addRootSlash: false});

	return target.pipe(inject(sources))
		.pipe(gulp.dest(config.build_dir));
};

gulp.task('index', [
	'less',
	'copy',
    'html2js'
], function () {
	return indexTask();
});

gulp.task('watch-index', [
	'less'
], function () {
	return indexTask();
});

var svgstoreTask = function () {
	var svgs = gulp.src('client/assets/svg/*.svg')
			.pipe(svgstore({prefix: pkg.name + '-', inlineSvg: true})),

		fileContents = function fileContents(filePath, file) {
			return file.contents.toString('utf8');
		};

	return gulp.src(config.build_dir + '/index.html')
		.pipe(inject(svgs, {transform: fileContents}))
		.pipe(gulp.dest(config.build_dir));
};

gulp.task('svgstore', ['index'], function () {
	return svgstoreTask();
});

gulp.task('watch-svgstore', ['watch-index'], function () {
	return svgstoreTask();
});

gulp.task('livereload', ['svgstore'], function () {
	livereload.listen();
	gulp.watch(config.build_dir + '/**').on('change', livereload.changed);
});

gulp.task('watch', ['svgstore'], function () {
	gulp.watch(['**/*.less'], [
		'less'
	]);
	gulp.watch(['client/**/*.js'], [
		//'jshint',
		'copy'
	]);
	gulp.watch([config.app_files.atpl, config.app_files.ctpl], [
		'html2js'
	]);
	gulp.watch('client/index.html', [
		'watch-index', 'watch-svgstore'
	]);
	gulp.watch('client/assets/svg/*.svg', [
		'svgstore'
	]);
});

//gulp.task('server', function () {
//	http.createServer(ecstatic({root: __dirname + '/build'}))
//		.listen(8080);
//	gutil
//		.log(gutil.colors.green('HTTP server listening on port 8080'));
//});

//gulp.task('default', [
//	//'jshint',
//	//'server',
//	'watch',
//	'livereload'
//]);

gulp.task('clean', function (cb) {
    del([config.build_dir], cb);
});

gulp.task('server', function () {
    var port = 8080;
    http.createServer(ecstatic({root: __dirname + '/build'})).listen(port);
    console.log(chalk.green('HTTP server listening on port ' + chalk.blue.underline.bold(port)));
});
/**
 ***************************
 * Default task reads a flag prefixed with "--"
 * gulp --dev
 * gulp --prod
 ***************************
 */

gulp.task('default', function () {

    if (flags.dev) {
        sequence(
            'clean',
            'svgstore',
            'server',
            'watch',
            'livereload',
            function () {
                console.log(chalk.green('Going into dev mode...'))
            }
        )

    } else if (flags.production || flags.prod) {
        sequence(
            'clean:prod',
            'production-copy',
            'production-concat',
            'production-index',
            function () {
                console.log(chalk.green('Production version built.'))
            }
        )

    } else {
        console.log(chalk.bold.red('Please specify flag with --dev or --production'))
    }
});
