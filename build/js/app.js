var parallax = (function(){
  var bg = document.querySelector('.hero__bg');
  var user = document.querySelector('.hero__title');

  return {
    move: function(block, windowScroll, strafeAmount) {
      var strafe = windowScroll / -strafeAmount + '%';
      var transformString = 'translate3d(0, '+strafe+', 0)';

      var style = block.style;
      
      style.top = strafe;
      style.transform = transformString;
      style.webkitTransform = transformString;
    },
    init: function(wScroll) {
      this.move(bg, wScroll, 45);
      //this.move(user, wScroll, 10);
    }
  }
})();

window.onscroll = function(){
  var wScroll = window.pageYOffset;
  parallax.init(wScroll);
  //this.svgScroll.grow(wScroll);
};
// var blur = (function(){
//   var wrapper = document.querySelector('.reviews__form__wrapper');
//   var form = document.querySelector('.reviews__form');

//   return {
//     set: function(){
//       var imgWidth = document.querySelector('.reviews__background').offsetWidth;
//     }
//   }
// })();

// window.onresize = function() {
//   blur.set();
// }
var buttons = (function(){
  var init = function(){
    _setupListeners();
  };
  var _setupListeners = function(){
    // Click on login checkbox
    var loginCheckboxButton = document.querySelector('#login__form__checkbox__label');
    if(loginCheckboxButton) {
      loginCheckboxButton.addEventListener('click', function(e){
        e.preventDefault();
        console.log(loginCheckboxButton);
        loginCheckboxButton.classList.toggle('login__form__checkbox__label_checked');
      });
    }
   
    // Click on robot buttons
    var loginFormRadioLabelYes = document.querySelector('#login__form__radio__label__yes');
    var loginFormRadioLabelNo = document.querySelector('#login__form__radio__label__no');
    if (loginFormRadioLabelNo || loginFormRadioLabelYes) {
      loginFormRadioLabelYes.addEventListener('click', function(e){
        e.preventDefault();
        loginFormRadioLabelYes.classList.toggle('login__form__radio__label_checked');
      });
      loginFormRadioLabelNo.addEventListener('click', function(e){
        e.preventDefault();
        loginFormRadioLabelNo.classList.toggle('login__form__radio__label_checked');
      });
    }
   
  };
  return {
    init: init
  };
})();

buttons.init();
var animate = (function(){
  var checkDistance = function(scrollTop, elem) {
    var offset = elem.offset().top;
    var windowMargin = Math.ceil($(window).height() / 3);
    var topBorder = offset - scrollTop - windowMargin;
    var bottomEdge = elem.outerHeight(true) + offset;
    var bottomBorder = scrollTop + windowMargin - bottomEdge;

    return topBorder <= 0 && bottomBorder <= 0;
  };

  var animationActions = {
    toRight: function(){
      jQuery(this).toggleClass('toRight');
    },
    toLeft: function(){
      jQuery(this).toggleClass('toLeft');
    }
  };

  return {
    init: function(){
        jQuery(window).on('scroll', function(){
          console.log('check');
          var scrollTop = jQuery(window).scrollTop();
          var elems = jQuery('.animate');
          elems.each(function(item){
            var $this = jQuery(this);
            if(checkDistance(scrollTop, $this)){
              var animationType = $this.data('animation'); // Getting the data animation attribute;
              animationActions[animationType].call($this);
            }
          })
        });
    }
  };
})();

animate.init();
var flip = (function(){
  var init = function(){
    _setupListeners();
    _flipMainButtonClick();
  };
  var _setupListeners = function(){
    var authorizeButton = document.querySelector('#authorize__btn');
    var loginBlock = document.querySelector('#login__container');
    var loginAbout = document.querySelector('#login__about');
    var loginForm = document.querySelector('#login__form');
    if(authorizeButton){
      authorizeButton.addEventListener('click', function(e) {
      e.preventDefault();
      loginBlock.classList.toggle('flip--y');
      authorizeButton.classList.add('d--none');
      //loginAbout.classList.toggle('d--none');
      //loginForm.classList.toggle('d--none');
    })
  }
    
  };
  var _flipMainButtonClick = function(){
    var authorizeButton = document.querySelector('#authorize__btn');
    var loginButtonMain = document.querySelector('#login__form__button-main');
    var loginBlock = document.querySelector('#login__container');
    var loginAbout = document.querySelector('#login__about');
    var loginForm = document.querySelector('#login__form');
    if(loginButtonMain) {
      loginButtonMain.addEventListener('click', function(e){
        e.preventDefault();
        loginBlock.classList.toggle('flip--y');
        authorizeButton.classList.remove('d--none');
      });
    }
   
  };
  return {
    init: init
  };
})();

flip.init();
var mainMenu = (function(){
  var init = function(){
    _setupListeners();
  };
  var _setupListeners = function(){
    // Click on menu button

    var mainMenuButton = document.querySelector('#hamburger');
    var mainMenu = document.querySelector('#mainMenu');
    var mainMenuContainer = document.querySelector('.mainMenu__container');
    var closeMenuButton = document.querySelector('.hamburger--close');
    if(mainMenuButton) {
      mainMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        mainMenu.classList.toggle('menu--slideDown');
        mainMenuContainer.classList.toggle('menu--fadeIn');
        mainMenuButton.classList.toggle('hamburger--close');
      });

    }
  };
  return {
    init: init
  };
})();

mainMenu.init();
var preloader = (function(){
  var percentsTotal = 0;
  var preloader = jQuery('.preloader');

  var imgPath = $('*').map(function(ndx, element) {
    var background = jQuery(element).css('background-image');
    var img = jQuery(element).is('img');
    var path = '';

    if(background != 'none') {
      path = background;
    }
    if(img) {
      path = jQuery(element).attr('src');
    }
    if(path) return path;
  });

  var setPercents = function(total, current) {
    var percents = Math.ceil(current / total * 100);
    jQuery('.preloader__percents').text(percents + '%');

    if(percents >= 100) {
      preloader.fadeOut();
    }
  };

  var loadImages = function(images) {
    if(!images.length) {
      preloader.fadeOut();
    } else {
      images.forEach(function(img, i, images) {
        var fakeImage = jQuery('<img>', {attr: {src: img}});
        fakeImage.on('load error', function(){
          percentsTotal++;
          setPercents(images.length, percentsTotal);
        });
      });
    }
  };

  return {
    init: function(){
      var imgs = imgPath.toArray(); // sets as the array
      loadImages(imgs);
    }
  }
})();

jQuery(document).ready(function(){
  preloader.init();
});
// var svgScroll = (function(){

//   var svg = document.getElementById('#svgToScroll');
//   var svgPath = document.querySelectorAll('#svtToScroll .group');
//   var windowMargin = window.innerHeight / 3;
//   var svgRect = svg.getBoundingClientRect();
//   var svgTop = svgRect.top;

//   return {
//     grow: function(wScroll){
//       var startAnimate = wScroll - svgPos + windowMargin,
//         pixelsElapsed = svgPos = wScroll,
//         percentsElapsed = 100 - Math.ceil(pixelsElapsed / windowMargin * 100),
//         percentsDraw = 1200/100 * percentsElapsed;

//         if(startAnimate >= 0) {
//           var drawAmount = 1200 - percentsDraw;

//           if(drawAmount > 0) {
//             svgPath.forEach(function(item){
//               item.style.strokeDashoffset = drawAmount;
//             })
//           }
//         }
//     }
//   }
// })();
var validate = (function(){

    function validate(input) {
        var inputParent = input.parent();
        var tooltip = inputParent.find('.error__tooltip');
        if(tooltip) {
            tooltip.remove();
        }
        if(input.val() == '') {
            input.addClass('input_error');
            insertTooltip('Пожалуйста, заполните форму', input);
        } else {
            input.removeClass('input_error');
        }
    }

    function clearForm(input) {
        var inputParent = input.parent();
        var tooltip = inputParent.find('.error__tooltip');
        if(tooltip) {
            tooltip.remove();
        }
        input.val('');
    }

    function insertTooltip(text, element) {
        element.after('<p class=\'error__tooltip\'>'+text+'</p>');
    }

    return {
        init: function(){
            var form = $('#reviews__form');
            var input = form.find('.reviews__form__input');
            
            var submitButton = form.find('#reviews__submit');
            var clearButton = form.find('#reviews__clear');
            
            submitButton.on('click', function(e){
                e.preventDefault();
                input.each(function(item){
                    validate($(this));
                })
            });

            clearButton.on('click', function(e){
                e.preventDefault();
                input.each(function(){
                    clearForm($(this));
                })
            })

        }
      };

})()

validate.init();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0UGFyYWxsYXguanMiLCJibHVyLmpzIiwiYnV0dG9ucy5qcyIsImVsZW1lbnRzLmpzIiwiZmxpcC5qcyIsIm1haW5tZW51LmpzIiwicHJlbG9hZGVyLmpzIiwic3Znc2Nyb2xsLmpzIiwidmFsaWRhdGUuanMiLCJ2ZXJ0aWNhbF9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyk7XHJcbiAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fdGl0bGUnKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1vdmU6IGZ1bmN0aW9uKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG4gICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnK3N0cmFmZSsnLCAwKSc7XHJcblxyXG4gICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuICAgICAgXHJcbiAgICAgIHN0eWxlLnRvcCA9IHN0cmFmZTtcclxuICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICB9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24od1Njcm9sbCkge1xyXG4gICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgLy90aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMTApO1xyXG4gICAgfVxyXG4gIH1cclxufSkoKTtcclxuXHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuICAvL3RoaXMuc3ZnU2Nyb2xsLmdyb3cod1Njcm9sbCk7XHJcbn07IiwiLy8gdmFyIGJsdXIgPSAoZnVuY3Rpb24oKXtcclxuLy8gICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19mb3JtX193cmFwcGVyJyk7XHJcbi8vICAgdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fZm9ybScpO1xyXG5cclxuLy8gICByZXR1cm4ge1xyXG4vLyAgICAgc2V0OiBmdW5jdGlvbigpe1xyXG4vLyAgICAgICB2YXIgaW1nV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fYmFja2dyb3VuZCcpLm9mZnNldFdpZHRoO1xyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy8gfSkoKTtcclxuXHJcbi8vIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4vLyAgIGJsdXIuc2V0KCk7XHJcbi8vIH0iLCJ2YXIgYnV0dG9ucyA9IChmdW5jdGlvbigpe1xyXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKXtcclxuICAgIF9zZXR1cExpc3RlbmVycygpO1xyXG4gIH07XHJcbiAgdmFyIF9zZXR1cExpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBDbGljayBvbiBsb2dpbiBjaGVja2JveFxyXG4gICAgdmFyIGxvZ2luQ2hlY2tib3hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5fX2Zvcm1fX2NoZWNrYm94X19sYWJlbCcpO1xyXG4gICAgaWYobG9naW5DaGVja2JveEJ1dHRvbikge1xyXG4gICAgICBsb2dpbkNoZWNrYm94QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGxvZ2luQ2hlY2tib3hCdXR0b24pO1xyXG4gICAgICAgIGxvZ2luQ2hlY2tib3hCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnbG9naW5fX2Zvcm1fX2NoZWNrYm94X19sYWJlbF9jaGVja2VkJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8vIENsaWNrIG9uIHJvYm90IGJ1dHRvbnNcclxuICAgIHZhciBsb2dpbkZvcm1SYWRpb0xhYmVsWWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luX19mb3JtX19yYWRpb19fbGFiZWxfX3llcycpO1xyXG4gICAgdmFyIGxvZ2luRm9ybVJhZGlvTGFiZWxObyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbl9fZm9ybV9fcmFkaW9fX2xhYmVsX19ubycpO1xyXG4gICAgaWYgKGxvZ2luRm9ybVJhZGlvTGFiZWxObyB8fCBsb2dpbkZvcm1SYWRpb0xhYmVsWWVzKSB7XHJcbiAgICAgIGxvZ2luRm9ybVJhZGlvTGFiZWxZZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbG9naW5Gb3JtUmFkaW9MYWJlbFllcy5jbGFzc0xpc3QudG9nZ2xlKCdsb2dpbl9fZm9ybV9fcmFkaW9fX2xhYmVsX2NoZWNrZWQnKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGxvZ2luRm9ybVJhZGlvTGFiZWxOby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsb2dpbkZvcm1SYWRpb0xhYmVsTm8uY2xhc3NMaXN0LnRvZ2dsZSgnbG9naW5fX2Zvcm1fX3JhZGlvX19sYWJlbF9jaGVja2VkJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICBcclxuICB9O1xyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBpbml0XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmJ1dHRvbnMuaW5pdCgpOyIsInZhciBhbmltYXRlID0gKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3AsIGVsZW0pIHtcclxuICAgIHZhciBvZmZzZXQgPSBlbGVtLm9mZnNldCgpLnRvcDtcclxuICAgIHZhciB3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMyk7XHJcbiAgICB2YXIgdG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luO1xyXG4gICAgdmFyIGJvdHRvbUVkZ2UgPSBlbGVtLm91dGVySGVpZ2h0KHRydWUpICsgb2Zmc2V0O1xyXG4gICAgdmFyIGJvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArIHdpbmRvd01hcmdpbiAtIGJvdHRvbUVkZ2U7XHJcblxyXG4gICAgcmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwO1xyXG4gIH07XHJcblxyXG4gIHZhciBhbmltYXRpb25BY3Rpb25zID0ge1xyXG4gICAgdG9SaWdodDogZnVuY3Rpb24oKXtcclxuICAgICAgalF1ZXJ5KHRoaXMpLnRvZ2dsZUNsYXNzKCd0b1JpZ2h0Jyk7XHJcbiAgICB9LFxyXG4gICAgdG9MZWZ0OiBmdW5jdGlvbigpe1xyXG4gICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ3RvTGVmdCcpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGpRdWVyeSh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrJyk7XHJcbiAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0galF1ZXJ5KHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICB2YXIgZWxlbXMgPSBqUXVlcnkoJy5hbmltYXRlJyk7XHJcbiAgICAgICAgICBlbGVtcy5lYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgICAgICAgIGlmKGNoZWNrRGlzdGFuY2Uoc2Nyb2xsVG9wLCAkdGhpcykpe1xyXG4gICAgICAgICAgICAgIHZhciBhbmltYXRpb25UeXBlID0gJHRoaXMuZGF0YSgnYW5pbWF0aW9uJyk7IC8vIEdldHRpbmcgdGhlIGRhdGEgYW5pbWF0aW9uIGF0dHJpYnV0ZTtcclxuICAgICAgICAgICAgICBhbmltYXRpb25BY3Rpb25zW2FuaW1hdGlvblR5cGVdLmNhbGwoJHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5hbmltYXRlLmluaXQoKTsiLCJ2YXIgZmxpcCA9IChmdW5jdGlvbigpe1xyXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKXtcclxuICAgIF9zZXR1cExpc3RlbmVycygpO1xyXG4gICAgX2ZsaXBNYWluQnV0dG9uQ2xpY2soKTtcclxuICB9O1xyXG4gIHZhciBfc2V0dXBMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGF1dGhvcml6ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdXRob3JpemVfX2J0bicpO1xyXG4gICAgdmFyIGxvZ2luQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5fX2NvbnRhaW5lcicpO1xyXG4gICAgdmFyIGxvZ2luQWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5fX2Fib3V0Jyk7XHJcbiAgICB2YXIgbG9naW5Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luX19mb3JtJyk7XHJcbiAgICBpZihhdXRob3JpemVCdXR0b24pe1xyXG4gICAgICBhdXRob3JpemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgbG9naW5CbG9jay5jbGFzc0xpc3QudG9nZ2xlKCdmbGlwLS15Jyk7XHJcbiAgICAgIGF1dGhvcml6ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdkLS1ub25lJyk7XHJcbiAgICAgIC8vbG9naW5BYm91dC5jbGFzc0xpc3QudG9nZ2xlKCdkLS1ub25lJyk7XHJcbiAgICAgIC8vbG9naW5Gb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2QtLW5vbmUnKTtcclxuICAgIH0pXHJcbiAgfVxyXG4gICAgXHJcbiAgfTtcclxuICB2YXIgX2ZsaXBNYWluQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGF1dGhvcml6ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdXRob3JpemVfX2J0bicpO1xyXG4gICAgdmFyIGxvZ2luQnV0dG9uTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbl9fZm9ybV9fYnV0dG9uLW1haW4nKTtcclxuICAgIHZhciBsb2dpbkJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luX19jb250YWluZXInKTtcclxuICAgIHZhciBsb2dpbkFib3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luX19hYm91dCcpO1xyXG4gICAgdmFyIGxvZ2luRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbl9fZm9ybScpO1xyXG4gICAgaWYobG9naW5CdXR0b25NYWluKSB7XHJcbiAgICAgIGxvZ2luQnV0dG9uTWFpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsb2dpbkJsb2NrLmNsYXNzTGlzdC50b2dnbGUoJ2ZsaXAtLXknKTtcclxuICAgICAgICBhdXRob3JpemVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnZC0tbm9uZScpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgXHJcbiAgfTtcclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogaW5pdFxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5mbGlwLmluaXQoKTsiLCJ2YXIgbWFpbk1lbnUgPSAoZnVuY3Rpb24oKXtcclxuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBfc2V0dXBMaXN0ZW5lcnMoKTtcclxuICB9O1xyXG4gIHZhciBfc2V0dXBMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe1xyXG4gICAgLy8gQ2xpY2sgb24gbWVudSBidXR0b25cclxuXHJcbiAgICB2YXIgbWFpbk1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGFtYnVyZ2VyJyk7XHJcbiAgICB2YXIgbWFpbk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbk1lbnUnKTtcclxuICAgIHZhciBtYWluTWVudUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluTWVudV9fY29udGFpbmVyJyk7XHJcbiAgICB2YXIgY2xvc2VNZW51QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlci0tY2xvc2UnKTtcclxuICAgIGlmKG1haW5NZW51QnV0dG9uKSB7XHJcbiAgICAgIG1haW5NZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBtYWluTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtZW51LS1zbGlkZURvd24nKTtcclxuICAgICAgICBtYWluTWVudUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdtZW51LS1mYWRlSW4nKTtcclxuICAgICAgICBtYWluTWVudUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXItLWNsb3NlJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBpbml0XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbm1haW5NZW51LmluaXQoKTsiLCJ2YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHBlcmNlbnRzVG90YWwgPSAwO1xyXG4gIHZhciBwcmVsb2FkZXIgPSBqUXVlcnkoJy5wcmVsb2FkZXInKTtcclxuXHJcbiAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uKG5keCwgZWxlbWVudCkge1xyXG4gICAgdmFyIGJhY2tncm91bmQgPSBqUXVlcnkoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyk7XHJcbiAgICB2YXIgaW1nID0galF1ZXJ5KGVsZW1lbnQpLmlzKCdpbWcnKTtcclxuICAgIHZhciBwYXRoID0gJyc7XHJcblxyXG4gICAgaWYoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgcGF0aCA9IGJhY2tncm91bmQ7XHJcbiAgICB9XHJcbiAgICBpZihpbWcpIHtcclxuICAgICAgcGF0aCA9IGpRdWVyeShlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgIH1cclxuICAgIGlmKHBhdGgpIHJldHVybiBwYXRoO1xyXG4gIH0pO1xyXG5cclxuICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbih0b3RhbCwgY3VycmVudCkge1xyXG4gICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcbiAgICBqUXVlcnkoJy5wcmVsb2FkZXJfX3BlcmNlbnRzJykudGV4dChwZXJjZW50cyArICclJyk7XHJcblxyXG4gICAgaWYocGVyY2VudHMgPj0gMTAwKSB7XHJcbiAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbihpbWFnZXMpIHtcclxuICAgIGlmKCFpbWFnZXMubGVuZ3RoKSB7XHJcbiAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbihpbWcsIGksIGltYWdlcykge1xyXG4gICAgICAgIHZhciBmYWtlSW1hZ2UgPSBqUXVlcnkoJzxpbWc+Jywge2F0dHI6IHtzcmM6IGltZ319KTtcclxuICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpOyAvLyBzZXRzIGFzIHRoZSBhcnJheVxyXG4gICAgICBsb2FkSW1hZ2VzKGltZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxufSkoKTtcclxuXHJcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBwcmVsb2FkZXIuaW5pdCgpO1xyXG59KTsiLCIvLyB2YXIgc3ZnU2Nyb2xsID0gKGZ1bmN0aW9uKCl7XHJcblxyXG4vLyAgIHZhciBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnI3N2Z1RvU2Nyb2xsJyk7XHJcbi8vICAgdmFyIHN2Z1BhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjc3Z0VG9TY3JvbGwgLmdyb3VwJyk7XHJcbi8vICAgdmFyIHdpbmRvd01hcmdpbiA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDM7XHJcbi8vICAgdmFyIHN2Z1JlY3QgPSBzdmcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbi8vICAgdmFyIHN2Z1RvcCA9IHN2Z1JlY3QudG9wO1xyXG5cclxuLy8gICByZXR1cm4ge1xyXG4vLyAgICAgZ3JvdzogZnVuY3Rpb24od1Njcm9sbCl7XHJcbi8vICAgICAgIHZhciBzdGFydEFuaW1hdGUgPSB3U2Nyb2xsIC0gc3ZnUG9zICsgd2luZG93TWFyZ2luLFxyXG4vLyAgICAgICAgIHBpeGVsc0VsYXBzZWQgPSBzdmdQb3MgPSB3U2Nyb2xsLFxyXG4vLyAgICAgICAgIHBlcmNlbnRzRWxhcHNlZCA9IDEwMCAtIE1hdGguY2VpbChwaXhlbHNFbGFwc2VkIC8gd2luZG93TWFyZ2luICogMTAwKSxcclxuLy8gICAgICAgICBwZXJjZW50c0RyYXcgPSAxMjAwLzEwMCAqIHBlcmNlbnRzRWxhcHNlZDtcclxuXHJcbi8vICAgICAgICAgaWYoc3RhcnRBbmltYXRlID49IDApIHtcclxuLy8gICAgICAgICAgIHZhciBkcmF3QW1vdW50ID0gMTIwMCAtIHBlcmNlbnRzRHJhdztcclxuXHJcbi8vICAgICAgICAgICBpZihkcmF3QW1vdW50ID4gMCkge1xyXG4vLyAgICAgICAgICAgICBzdmdQYXRoLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbi8vICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gZHJhd0Ftb3VudDtcclxuLy8gICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vLyB9KSgpOyIsInZhciB2YWxpZGF0ZSA9IChmdW5jdGlvbigpe1xyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKGlucHV0KSB7XHJcbiAgICAgICAgdmFyIGlucHV0UGFyZW50ID0gaW5wdXQucGFyZW50KCk7XHJcbiAgICAgICAgdmFyIHRvb2x0aXAgPSBpbnB1dFBhcmVudC5maW5kKCcuZXJyb3JfX3Rvb2x0aXAnKTtcclxuICAgICAgICBpZih0b29sdGlwKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXAucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlucHV0LnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZENsYXNzKCdpbnB1dF9lcnJvcicpO1xyXG4gICAgICAgICAgICBpbnNlcnRUb29sdGlwKCfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LfQsNC/0L7Qu9C90LjRgtC1INGE0L7RgNC80YMnLCBpbnB1dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoJ2lucHV0X2Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyRm9ybShpbnB1dCkge1xyXG4gICAgICAgIHZhciBpbnB1dFBhcmVudCA9IGlucHV0LnBhcmVudCgpO1xyXG4gICAgICAgIHZhciB0b29sdGlwID0gaW5wdXRQYXJlbnQuZmluZCgnLmVycm9yX190b29sdGlwJyk7XHJcbiAgICAgICAgaWYodG9vbHRpcCkge1xyXG4gICAgICAgICAgICB0b29sdGlwLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dC52YWwoJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluc2VydFRvb2x0aXAodGV4dCwgZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWZ0ZXIoJzxwIGNsYXNzPVxcJ2Vycm9yX190b29sdGlwXFwnPicrdGV4dCsnPC9wPicpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKCcjcmV2aWV3c19fZm9ybScpO1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBmb3JtLmZpbmQoJy5yZXZpZXdzX19mb3JtX19pbnB1dCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnI3Jldmlld3NfX3N1Ym1pdCcpO1xyXG4gICAgICAgICAgICB2YXIgY2xlYXJCdXR0b24gPSBmb3JtLmZpbmQoJyNyZXZpZXdzX19jbGVhcicpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuZWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZSgkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY2xlYXJCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJGb3JtKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxufSkoKVxyXG5cclxudmFsaWRhdGUuaW5pdCgpOyIsInZhciBzbGlkZXIgPSAoZnVuY3Rpb24oKXtcclxuICB2YXIgY291bnRlciA9IDE7XHJcbiAgdmFyIGR1cmF0aW9uID0gNDAwO1xyXG5cclxuICB2YXIgc2xpZGVzID0gJCgnLndvcmtzX19zbGlkZXNfX3NsaWRlJyk7XHJcbiAgdmFyIGFjdGl2ZV9zbGlkZSA9IDE7XHJcblxyXG4gIHZhciBzbGlkZXJfX2hlYWRpbmcgPSAkKCcud29ya3NfX3NsaWRlcl9fc3ViaGVhZGluZycpLmNoaWxkcmVuKCk7XHJcbiAgdmFyIHNsaWRlcl9fdGVjaG5vbG9naXMgPSAkKCcud29ya3NfX3NsaWRlcl9fdGFncycpLmNoaWxkcmVuKCk7XHJcbiAgdmFyIHNsaWRlcl9fbGluayA9ICQoJy53b3Jrc19fc2xpZGVyX19saW5rJykuY2hpbGRyZW4oKTtcclxuXHJcbiAgdmFyIHNsaWRlcl9faGVhZGluZ3MgPSBbXHJcbiAgICBbXCLQodCw0LnRgiDQutCw0YDRgtC40L3QvdC+0Lkg0LPQsNC70LXRgNC10LhcIiwgXCJodHRwOi8vcGludG9yYTI0LnJ1XCIsIFwiSFRNTCwgQ1NTLCBKYXZhU2NyaXB0XCJdLFxyXG4gICAgW1wi0KHQsNC50YIg0LDQstGC0L7RiNC60L7Qu9GLXCIsIFwiaHR0cDovL2Fyc2RpemVsMzMucnVcIiwgXCJIVE1MLCBDU1MsIEphdmFTY3JpcHQsIE1PRHhcIl0sXHJcbiAgICBbXCLQodCw0LnRgiDRgdCw0LvQvtC90LBcIiwgXCJodHRwOi8vZ2VybWktc2Fsb24ucnVcIiwgXCJIVE1MLCBDU1MsIEphdmFTY3JpcHQsIE1PRHhcIl0sXHJcbiAgICBbXCLQn9GA0L7RgdGC0L4g0YHQsNC50YJcIiwgXCJodHRwOi8vcGludG9yYTI0LnJ1XCIsIFwiSFRNTCwgQ1NTLCBKYXZhU2NyaXB0LCBNT0R4XCJdXHJcbiAgXVxyXG5cclxuICB2YXIgbW92ZVNsaWRlID0gZnVuY3Rpb24oY29udGFpbmVyLCBkaXJlY3Rpb24pe1xyXG4gICAgdmFyIGl0ZW1zID0gY29udGFpbmVyLmZpbmQoJy53b3Jrc19fc2xpZGVzX19pdGVtJyk7XHJcbiAgICB2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLndvcmtzX19zbGlkZXNfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICB2YXIgZGlyZWN0aW9uID0gZGlyZWN0aW9uID09ICdkb3duJyA/IDEwMDogLTEwMDtcclxuXHJcbiAgICBpZihjb3VudGVyID49IGl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnQ291bnRlciBzdG9wOiAnICsgY291bnRlcik7XHJcbiAgICAgIGNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXFJdGVtID0gaXRlbXMuZXEoY291bnRlcik7XHJcblxyXG4gICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgJ3RvcCc6IGRpcmVjdGlvbiArICclJ1xyXG4gICAgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICd0b3AnOiAnMCdcclxuICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbigpe1xyXG4gICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCd3b3Jrc19fc2xpZGVzX19pdGVtX2FjdGl2ZScpLmNzcygndG9wJywgJycgKyBkaXJlY3Rpb24gKyAnJScpO1xyXG4gICAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoJ3dvcmtzX19zbGlkZXNfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgIGFjdGl2ZV9zbGlkZSA9IGpRdWVyeSh0aGlzKS5jaGlsZHJlbigpLmF0dHIoJ2RhdGEtc2xpZGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ0xhc3MoJ2FjdGl2ZScpLmNzcygndG9wJywgJy0nICsgZGlyZWN0aW9uICsgJyUnKTtcclxuICAgIC8vICAgalF1ZXJ5KHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIC8vIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgalF1ZXJ5KCcuc2xpZGVyX19jb250cm9sc19fdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG1vdmVTbGlkZShqUXVlcnkoJy53b3Jrc19fc2xpZGVyX19jb250cm9sc19fcmlnaHQnKSwgJ3VwJyk7XHJcbiAgICAgICAgc2xpZGVzLmVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgdmFyIHNsaWRlID0galF1ZXJ5KHRoaXMpO1xyXG4gICAgICAgICAgc2xpZGUuZmFkZU91dCgpO1xyXG4gICAgICAgICAgaWYoYWN0aXZlX3NsaWRlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZihzbGlkZS5hdHRyKCdkYXRhLXNsaWRlJykgPT0gYWN0aXZlX3NsaWRlKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coc2xpZGUpO1xyXG4gICAgICAgICAgICAgIHNsaWRlLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgIHNsaWRlcl9faGVhZGluZy50ZXh0KHNsaWRlcl9faGVhZGluZ3NbYWN0aXZlX3NsaWRlLTFdWzBdKTtcclxuICAgICAgICAgICAgICBzbGlkZXJfX3RlY2hub2xvZ2lzLnRleHQoc2xpZGVyX19oZWFkaW5nc1thY3RpdmVfc2xpZGUtMV1bMl0pO1xyXG4gICAgICAgICAgICAgIHNsaWRlcl9fbGluay5hdHRyKCdocmVmJywgc2xpZGVyX19oZWFkaW5nc1thY3RpdmVfc2xpZGUtMV1bMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbW92ZVNsaWRlKGpRdWVyeSgnLndvcmtzX19zbGlkZXJfX2NvbnRyb2xzX19sZWZ0JyksICdkb3duJyk7XHJcbiAgICAgICAgY291bnRlcisrO1xyXG4gICAgICB9KTtcclxuICAgICAgalF1ZXJ5KCcuc2xpZGVyX19jb250cm9sc19fYm90dG9tJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG1vdmVTbGlkZShqUXVlcnkoJy53b3Jrc19fc2xpZGVyX19jb250cm9sc19fbGVmdCcpLCAnZG93bicpO1xyXG4gICAgICAgIHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgIHZhciBzbGlkZSA9IGpRdWVyeSh0aGlzKTtcclxuICAgICAgICAgIHNsaWRlLmZhZGVPdXQoKTtcclxuICAgICAgICAgIGlmKGFjdGl2ZV9zbGlkZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYoc2xpZGUuYXR0cignZGF0YS1zbGlkZScpID09IGFjdGl2ZV9zbGlkZSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNsaWRlKTtcclxuICAgICAgICAgICAgICBzbGlkZS5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICBzbGlkZXJfX2hlYWRpbmcudGV4dChzbGlkZXJfX2hlYWRpbmdzW2FjdGl2ZV9zbGlkZS0xXVswXSk7XHJcbiAgICAgICAgICAgICAgc2xpZGVyX190ZWNobm9sb2dpcy50ZXh0KHNsaWRlcl9faGVhZGluZ3NbYWN0aXZlX3NsaWRlLTFdWzJdKTtcclxuICAgICAgICAgICAgICBzbGlkZXJfX2xpbmsuYXR0cignaHJlZicsIHNsaWRlcl9faGVhZGluZ3NbYWN0aXZlX3NsaWRlLTFdWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1vdmVTbGlkZShqUXVlcnkoJy53b3Jrc19fc2xpZGVyX19jb250cm9sc19fcmlnaHQnKSwgJ3VwJyk7XHJcbiAgICAgICAgY291bnRlcisrO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KSgpO1xyXG5cclxuc2xpZGVyLmluaXQoKTsiXX0=
