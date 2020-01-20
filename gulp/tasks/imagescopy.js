'use strict';

module.exports = function() {
    $.gulp.task('imagescopy', function(){
        return $.gulp.src('./src/images/**/*.{gif,jpg,png,svg}')
        .pipe($.gulp.dest($.config.root + '/img'));
    });
};