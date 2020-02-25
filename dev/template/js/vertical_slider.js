var slider = (function(){
  var counter = 1;
  var duration = 400;

  var slides = $('.works__slides__slide');
  var active_slide = 1;

  var slider__heading = $('.works__slider__subheading').children();
  var slider__technologis = $('.works__slider__tags').children();
  var slider__link = $('.works__slider__link').children();

  var slider__headings = [
    ["Сайт картинной галереи", "http://pintora24.ru", "HTML, CSS, JavaScript"],
    ["Сайт автошколы", "http://arsdizel33.ru", "HTML, CSS, JavaScript, MODx"],
    ["Сайт салона", "http://germi-salon.ru", "HTML, CSS, JavaScript, MODx"],
    ["Просто сайт", "http://pintora24.ru", "HTML, CSS, JavaScript, MODx"]
  ]

  var moveSlide = function(container, direction){
    var items = container.find('.works__slides__item');
    var activeItem = items.filter('.works__slides__item_active');
    var direction = direction == 'down' ? 100: -100;

    if(counter >= items.length) {
      console.log('Counter stop: ' + counter);
      counter = 0;
    }

    var reqItem = items.eq(counter);

    activeItem.animate({
      'top': direction + '%'
    }, duration);

    reqItem.animate({
      'top': '0'
    }, duration, function(){
      activeItem.removeClass('works__slides__item_active').css('top', '' + direction + '%');
      jQuery(this).addClass('works__slides__item_active');
      active_slide = jQuery(this).children().attr('data-slide');
    });

    // function(){
    //   activeItem.removeCLass('active').css('top', '-' + direction + '%');
    //   jQuery(this).addClass('active');
    // }
  };

  return {
    init: function(){
      console.log(slides);
      jQuery('.slider__controls__top').on('click', function(e){
        e.preventDefault();
        moveSlide(jQuery('.works__slider__controls__right'), 'up');
        slides.each(function(item) {
          var slide = jQuery(this);
          slide.fadeOut();
          if(active_slide != undefined) {
            if(slide.attr('data-slide') == active_slide) {
              console.log(slide);
              slide.fadeIn();
              slider__heading.text(slider__headings[active_slide-1][0]);
              slider__technologis.text(slider__headings[active_slide-1][2]);
              slider__link.attr('href', slider__headings[active_slide-1][1]);
            }
          }
        });
        moveSlide(jQuery('.works__slider__controls__left'), 'down');
        counter++;
      });
      jQuery('.slider__controls__bottom').on('click', function(e){
        e.preventDefault();
        moveSlide(jQuery('.works__slider__controls__left'), 'down');
        slides.each(function(item) {
          var slide = jQuery(this);
          slide.fadeOut();
          if(active_slide != undefined) {
            if(slide.attr('data-slide') == active_slide) {
              console.log(slide);
              slide.fadeIn();
              slider__heading.text(slider__headings[active_slide-1][0]);
              slider__technologis.text(slider__headings[active_slide-1][2]);
              slider__link.attr('href', slider__headings[active_slide-1][1]);
            }
          }
        });
        moveSlide(jQuery('.works__slider__controls__right'), 'up');
        counter++;
      });
    }
  };
})();

slider.init();