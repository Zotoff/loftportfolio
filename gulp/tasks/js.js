'use strict';

module.exports = function() {
    $.gulp.task('js', function(){
        return $.gulp.src('./dev/template/js/*.js')
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.jshint())
        .pipe($.gp.jshint.reporter('default'))
        .pipe($.gp.uglify())
        .pipe($.gp.concat('app.js'))
        .pipe($.gp.sourcemaps.write())
        .pipe($.gulp.dest($.config.root + '/js'));
    });
}