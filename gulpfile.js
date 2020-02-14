global.$ = {
  path: {
    task: require('./gulp/paths/tasks.js')
  },
  config: require('./gulp/config'),
  gulp: require('gulp'),
  del: require('del'),
  webp: require('imagemin-webp'),
  uglify: require('gulp-uglify-es'),
  cssunit: require('gulp-css-unit'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')()
};

// Require all paths
$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass',
        'pug',
        'js',
        'sprite:svg',
        'imageswebp',
        'imagescopy',
        'spritescopy',
        'fontscopy'
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));