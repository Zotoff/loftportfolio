var slider = (function(){
  var counter = 1;
  var duration = 400;

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
    });

    // function(){
    //   activeItem.removeCLass('active').css('top', '-' + direction + '%');
    //   jQuery(this).addClass('active');
    // }
  };

  return {
    init: function(){
      jQuery('.slider__controls__top').on('click', function(e){
        e.preventDefault();
        moveSlide(jQuery('.works__slider__controls__right'), 'up');
        counter++;
      });
    }
  };
})();

slider.init();