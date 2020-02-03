'use strict';

module.exports = function() {
    $.gulp.task('sass', function() {
        return $.gulp.src('./dev/scss/main.scss')
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.sass())
        .pipe($.gp.csso())
        .on('error', $.gp.notify.onError(function(error) {
            return {
                title: 'Styles',
                message: error.message
            }
        }))
        .pipe($.gp.autoprefixer({
            browsers: [
                'last 3 version',
                '> 1%',
                'ie 8',
                'ie 9',
                'Opera 12.1'
            ]
        }))
        // .pipe($.cssunit({
        //     type: 'px-to-rem',
        //     rootSize: 16
        // }))
        .pipe($.gp.sourcemaps.write())
        .pipe($.gp.rename({
            suffix: '.min'
        }))
        .pipe($.gulp.dest('./build/style/'));
    });
};

