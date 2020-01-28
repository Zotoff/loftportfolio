'use strict';

module.exports = function() {
  $.gulp.task('sprite:svg', function() {
    return $.gulp.src('./src/icons/*.svg')
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
            render: {
              scss: {
                dest: './dev/_sprite.scss',
                template: './dev/scss/layout/_sprite_template.scss'
              }
            }
          }
        }
      }))
      .on('error', function(error) {
        console.log(error);
      })
      .pipe($.gulp.dest($.config.root + '/img'));
  });
};
