'use strict';

module.exports = function() {
    $.gulp.task('imageswebp', function(){
        return $.gulp.src('./src/images/**/*.png')
        .pipe($.gp.imagemin([
            $.webp({
                quality: 75
            })
        ]))
        .pipe($.gp.extReplace(".webp"))
        .pipe($.gulp.dest($.config.root + '/img'));
    });
}