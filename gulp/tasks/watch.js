'use strict';

module.exports = function() {
    $.gulp.task('watch', function(){
        $.gulp.watch('./dev/template/js/*.js', $.gulp.series('js'));
        $.gulp.watch('./dev/scss/**/*.scss', $.gulp.series('sass'));
        $.gulp.watch('./dev/template/*.pug', $.gulp.series('pug'));
    });
};