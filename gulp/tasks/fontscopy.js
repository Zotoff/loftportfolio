'use strict';

module.exports = function() {
    $.gulp.task('fontscopy', function(){
        return $.gulp.src('./src/fonts/**/*.{eot,ttf,woff}')
        .pipe($.gulp.dest($.config.root + '/fonts'));
    });
};