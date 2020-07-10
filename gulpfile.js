const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlmin = require('gulp-htmlmin'),
    sassLint = require('gulp-sass-lint'),
    sass = require('gulp-sass'),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    rollup = require('rollup'),
    nodeResolve = require('@rollup/plugin-node-resolve'),
    merge = require("merge-stream"),
    modRewrite = require('connect-modrewrite'),
    src = './src',
    dest = './docs';


const reload = (done) => {
    browserSync.reload();
    done();
};

const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: dest,
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        },
    });
    done();
};

const compileHtml = () => {
    return gulp.src(`${src}/*.html`)
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            html5: true,
            removeEmptyAttributes: true,
            removeTagWhitespace: true,
            sortAttributes: true,
            sortClassName: true
        }))
        .pipe(gulp.dest(`${dest}`))
};

const compileSass = () => {
    return gulp.src(`${src}/sass/**/*.sass`)
        .pipe(plumber())
        .pipe(sassLint({
            options: {
                formatter: 'stylish'
            },
            rules: {
                'no-ids': 1,
                'final-newline': 0,
                'no-mergeable-selectors': 1,
                'indentation': 0
            }
        }))
        .pipe(sassLint.format())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)
        .pipe(rename({ basename: 'style', suffix: '.min' }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(`${dest}/css`))
        .pipe(browserSync.stream());
};

const compileJs = async () => {
    const bundle = await rollup.rollup({
        input: [`${src}/js/app-shell.js`],
        output: {
            file: `${dest}/js/index.js`,
            format: 'es',
            sourcemap: true
        },
        plugins: [
            nodeResolve.default({})
        ]
    });

    return bundle.write({
        file: `${dest}/js/index.js`,
        format: 'umd',
        name: 'library',
        sourcemap: true
    });
}

const copyNodeModules = () => {
    const sbAdmin2Css = gulp.src('./node_modules/startbootstrap-sb-admin-2/css/*')
        .pipe(gulp.dest(`${dest}/css`));
    const fontAwesome = gulp.src('./node_modules/@fortawesome/**/*')
        .pipe(gulp.dest(`${dest}/vendor`));
    const images = gulp.src('./node_modules/startbootstrap-sb-admin-2/img/*')
        .pipe(gulp.dest(`${dest}/img`));
    const webcomponentsjs = gulp.src('./node_modules/@webcomponents/webcomponentsjs/**/*')
        .pipe(gulp.dest(`${dest}/vendor/webcomponentsjs`));
    const jquery = gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ]).pipe(gulp.dest(`${dest}/vendor/jquery`));
    const bootstrapJs = gulp.src('./node_modules/bootstrap/dist/js/*')
        .pipe(gulp.dest(`${dest}/vendor/bootstrap/js`));
    const jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
        .pipe(gulp.dest(`${dest}/vendor/jquery-easing`));
    const chartJs = gulp.src('./node_modules/chart.js/dist/*.js')
        .pipe(gulp.dest(`${dest}/vendor/chart.js`));
    const dataTables = gulp.src([
        './node_modules/datatables.net/js/*.js',
        './node_modules/datatables.net-bs4/js/*.js',
        './node_modules/datatables.net-bs4/css/*.css'
    ])
        .pipe(gulp.dest(`${dest}/vendor/datatables`));

    return merge(sbAdmin2Css, fontAwesome, images, webcomponentsjs, jquery, bootstrapJs, jqueryEasing, chartJs, dataTables);
};

const watch = () => gulp.watch([
    `${src}/*.html`,
    `${src}/sass/**/*.sass`,
    `${src}/js/**/*.js`
], gulp.series(compileHtml, compileSass, compileJs, reload));

const dev = gulp.series(copyNodeModules, compileHtml, compileSass, compileJs, serve, watch);
const build = gulp.series(copyNodeModules, compileHtml, compileSass, compileJs);

exports.dev = dev;
exports.build = build;
exports.default = build;