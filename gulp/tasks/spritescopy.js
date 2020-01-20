'use strict'

module.exports = function() {
    $.gulp.task('spritescopy', function() {
        return $.gulp.src($.config.dev + 'scss/sprite/symbol/scss/*.svg')
        .pipe($.gulp.dest($.config.build + 'img/'));
    })
}