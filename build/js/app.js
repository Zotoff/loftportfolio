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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0UGFyYWxsYXguanMiLCJibHVyLmpzIiwiYnV0dG9ucy5qcyIsImVsZW1lbnRzLmpzIiwiZmxpcC5qcyIsInByZWxvYWRlci5qcyIsInN2Z3Njcm9sbC5qcyIsInZlcnRpY2FsX3NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24oKXtcclxuICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fYmcnKTtcclxuICB2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX190aXRsZScpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW92ZTogZnVuY3Rpb24oYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG4gICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcrc3RyYWZlKycsIDApJztcclxuXHJcbiAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG4gICAgICBcclxuICAgICAgc3R5bGUudG9wID0gc3RyYWZlO1xyXG4gICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgIH0sXHJcbiAgICBpbml0OiBmdW5jdGlvbih3U2Nyb2xsKSB7XHJcbiAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAvL3RoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAxMCk7XHJcbiAgICB9XHJcbiAgfVxyXG59KSgpO1xyXG5cclxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24oKXtcclxuICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG4gIC8vdGhpcy5zdmdTY3JvbGwuZ3Jvdyh3U2Nyb2xsKTtcclxufTsiLCIvLyB2YXIgYmx1ciA9IChmdW5jdGlvbigpe1xyXG4vLyAgIHZhciB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2Zvcm1fX3dyYXBwZXInKTtcclxuLy8gICB2YXIgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19mb3JtJyk7XHJcblxyXG4vLyAgIHJldHVybiB7XHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uKCl7XHJcbi8vICAgICAgIHZhciBpbWdXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19iYWNrZ3JvdW5kJykub2Zmc2V0V2lkdGg7XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vLyB9KSgpO1xyXG5cclxuLy8gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XHJcbi8vICAgYmx1ci5zZXQoKTtcclxuLy8gfSIsInZhciBidXR0b25zID0gKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpe1xyXG4gICAgX3NldHVwTGlzdGVuZXJzKCk7XHJcbiAgfTtcclxuICB2YXIgX3NldHVwTGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcclxuICAgIC8vIENsaWNrIG9uIGxvZ2luIGNoZWNrYm94XHJcbiAgICB2YXIgbG9naW5DaGVja2JveEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbl9fZm9ybV9fY2hlY2tib3hfX2xhYmVsJyk7XHJcbiAgICBpZihsb2dpbkNoZWNrYm94QnV0dG9uKSB7XHJcbiAgICAgIGxvZ2luQ2hlY2tib3hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobG9naW5DaGVja2JveEJ1dHRvbik7XHJcbiAgICAgICAgbG9naW5DaGVja2JveEJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdsb2dpbl9fZm9ybV9fY2hlY2tib3hfX2xhYmVsX2NoZWNrZWQnKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLy8gQ2xpY2sgb24gcm9ib3QgYnV0dG9uc1xyXG4gICAgdmFyIGxvZ2luRm9ybVJhZGlvTGFiZWxZZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5fX2Zvcm1fX3JhZGlvX19sYWJlbF9feWVzJyk7XHJcbiAgICB2YXIgbG9naW5Gb3JtUmFkaW9MYWJlbE5vID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luX19mb3JtX19yYWRpb19fbGFiZWxfX25vJyk7XHJcbiAgICBpZiAobG9naW5Gb3JtUmFkaW9MYWJlbE5vIHx8IGxvZ2luRm9ybVJhZGlvTGFiZWxZZXMpIHtcclxuICAgICAgbG9naW5Gb3JtUmFkaW9MYWJlbFllcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsb2dpbkZvcm1SYWRpb0xhYmVsWWVzLmNsYXNzTGlzdC50b2dnbGUoJ2xvZ2luX19mb3JtX19yYWRpb19fbGFiZWxfY2hlY2tlZCcpO1xyXG4gICAgICB9KTtcclxuICAgICAgbG9naW5Gb3JtUmFkaW9MYWJlbE5vLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGxvZ2luRm9ybVJhZGlvTGFiZWxOby5jbGFzc0xpc3QudG9nZ2xlKCdsb2dpbl9fZm9ybV9fcmFkaW9fX2xhYmVsX2NoZWNrZWQnKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgIFxyXG4gIH07XHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IGluaXRcclxuICB9O1xyXG59KSgpO1xyXG5cclxuYnV0dG9ucy5pbml0KCk7IiwidmFyIGFuaW1hdGUgPSAoZnVuY3Rpb24oKXtcclxuICB2YXIgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uKHNjcm9sbFRvcCwgZWxlbSkge1xyXG4gICAgdmFyIG9mZnNldCA9IGVsZW0ub2Zmc2V0KCkudG9wO1xyXG4gICAgdmFyIHdpbmRvd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKTtcclxuICAgIHZhciB0b3BCb3JkZXIgPSBvZmZzZXQgLSBzY3JvbGxUb3AgLSB3aW5kb3dNYXJnaW47XHJcbiAgICB2YXIgYm90dG9tRWRnZSA9IGVsZW0ub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQ7XHJcbiAgICB2YXIgYm90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd2luZG93TWFyZ2luIC0gYm90dG9tRWRnZTtcclxuXHJcbiAgICByZXR1cm4gdG9wQm9yZGVyIDw9IDAgJiYgYm90dG9tQm9yZGVyIDw9IDA7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGFuaW1hdGlvbkFjdGlvbnMgPSB7XHJcbiAgICB0b1JpZ2h0OiBmdW5jdGlvbigpe1xyXG4gICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ3RvUmlnaHQnKTtcclxuICAgIH0sXHJcbiAgICB0b0xlZnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygndG9MZWZ0Jyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnY2hlY2snKTtcclxuICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBqUXVlcnkod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgIHZhciBlbGVtcyA9IGpRdWVyeSgnLmFuaW1hdGUnKTtcclxuICAgICAgICAgIGVsZW1zLmVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9IGpRdWVyeSh0aGlzKTtcclxuICAgICAgICAgICAgaWYoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3AsICR0aGlzKSl7XHJcbiAgICAgICAgICAgICAgdmFyIGFuaW1hdGlvblR5cGUgPSAkdGhpcy5kYXRhKCdhbmltYXRpb24nKTsgLy8gR2V0dGluZyB0aGUgZGF0YSBhbmltYXRpb24gYXR0cmlidXRlO1xyXG4gICAgICAgICAgICAgIGFuaW1hdGlvbkFjdGlvbnNbYW5pbWF0aW9uVHlwZV0uY2FsbCgkdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmFuaW1hdGUuaW5pdCgpOyIsInZhciBmbGlwID0gKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpe1xyXG4gICAgX3NldHVwTGlzdGVuZXJzKCk7XHJcbiAgICBfZmxpcE1haW5CdXR0b25DbGljaygpO1xyXG4gIH07XHJcbiAgdmFyIF9zZXR1cExpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgYXV0aG9yaXplQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F1dGhvcml6ZV9fYnRuJyk7XHJcbiAgICB2YXIgbG9naW5CbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbl9fY29udGFpbmVyJyk7XHJcbiAgICB2YXIgbG9naW5BYm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbl9fYWJvdXQnKTtcclxuICAgIHZhciBsb2dpbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5fX2Zvcm0nKTtcclxuICAgIGlmKGF1dGhvcml6ZUJ1dHRvbil7XHJcbiAgICAgIGF1dGhvcml6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsb2dpbkJsb2NrLmNsYXNzTGlzdC50b2dnbGUoJ2ZsaXAtLXknKTtcclxuICAgICAgYXV0aG9yaXplQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2QtLW5vbmUnKTtcclxuICAgICAgLy9sb2dpbkFib3V0LmNsYXNzTGlzdC50b2dnbGUoJ2QtLW5vbmUnKTtcclxuICAgICAgLy9sb2dpbkZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnZC0tbm9uZScpO1xyXG4gICAgfSlcclxuICB9XHJcbiAgICBcclxuICB9O1xyXG4gIHZhciBfZmxpcE1haW5CdXR0b25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgYXV0aG9yaXplQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F1dGhvcml6ZV9fYnRuJyk7XHJcbiAgICB2YXIgbG9naW5CdXR0b25NYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luX19mb3JtX19idXR0b24tbWFpbicpO1xyXG4gICAgdmFyIGxvZ2luQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5fX2NvbnRhaW5lcicpO1xyXG4gICAgdmFyIGxvZ2luQWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5fX2Fib3V0Jyk7XHJcbiAgICB2YXIgbG9naW5Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luX19mb3JtJyk7XHJcbiAgICBpZihsb2dpbkJ1dHRvbk1haW4pIHtcclxuICAgICAgbG9naW5CdXR0b25NYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGxvZ2luQmxvY2suY2xhc3NMaXN0LnRvZ2dsZSgnZmxpcC0teScpO1xyXG4gICAgICAgIGF1dGhvcml6ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdkLS1ub25lJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICBcclxuICB9O1xyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBpbml0XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmZsaXAuaW5pdCgpOyIsInZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24oKXtcclxuICB2YXIgcGVyY2VudHNUb3RhbCA9IDA7XHJcbiAgdmFyIHByZWxvYWRlciA9IGpRdWVyeSgnLnByZWxvYWRlcicpO1xyXG5cclxuICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24obmR4LCBlbGVtZW50KSB7XHJcbiAgICB2YXIgYmFja2dyb3VuZCA9IGpRdWVyeShlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgIHZhciBpbWcgPSBqUXVlcnkoZWxlbWVudCkuaXMoJ2ltZycpO1xyXG4gICAgdmFyIHBhdGggPSAnJztcclxuXHJcbiAgICBpZihiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG4gICAgICBwYXRoID0gYmFja2dyb3VuZDtcclxuICAgIH1cclxuICAgIGlmKGltZykge1xyXG4gICAgICBwYXRoID0galF1ZXJ5KGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xyXG4gICAgfVxyXG4gICAgaWYocGF0aCkgcmV0dXJuIHBhdGg7XHJcbiAgfSk7XHJcblxyXG4gIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICB2YXIgcGVyY2VudHMgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuICAgIGpRdWVyeSgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnRzICsgJyUnKTtcclxuXHJcbiAgICBpZihwZXJjZW50cyA+PSAxMDApIHtcclxuICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKGltYWdlcykge1xyXG4gICAgaWYoIWltYWdlcy5sZW5ndGgpIHtcclxuICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltZywgaSwgaW1hZ2VzKSB7XHJcbiAgICAgICAgdmFyIGZha2VJbWFnZSA9IGpRdWVyeSgnPGltZz4nLCB7YXR0cjoge3NyYzogaW1nfX0pO1xyXG4gICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBpbWdzID0gaW1nUGF0aC50b0FycmF5KCk7IC8vIHNldHMgYXMgdGhlIGFycmF5XHJcbiAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XHJcbiAgICB9XHJcbiAgfVxyXG59KSgpO1xyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIHByZWxvYWRlci5pbml0KCk7XHJcbn0pOyIsIi8vIHZhciBzdmdTY3JvbGwgPSAoZnVuY3Rpb24oKXtcclxuXHJcbi8vICAgdmFyIHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcjc3ZnVG9TY3JvbGwnKTtcclxuLy8gICB2YXIgc3ZnUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzdnRUb1Njcm9sbCAuZ3JvdXAnKTtcclxuLy8gICB2YXIgd2luZG93TWFyZ2luID0gd2luZG93LmlubmVySGVpZ2h0IC8gMztcclxuLy8gICB2YXIgc3ZnUmVjdCA9IHN2Zy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuLy8gICB2YXIgc3ZnVG9wID0gc3ZnUmVjdC50b3A7XHJcblxyXG4vLyAgIHJldHVybiB7XHJcbi8vICAgICBncm93OiBmdW5jdGlvbih3U2Nyb2xsKXtcclxuLy8gICAgICAgdmFyIHN0YXJ0QW5pbWF0ZSA9IHdTY3JvbGwgLSBzdmdQb3MgKyB3aW5kb3dNYXJnaW4sXHJcbi8vICAgICAgICAgcGl4ZWxzRWxhcHNlZCA9IHN2Z1BvcyA9IHdTY3JvbGwsXHJcbi8vICAgICAgICAgcGVyY2VudHNFbGFwc2VkID0gMTAwIC0gTWF0aC5jZWlsKHBpeGVsc0VsYXBzZWQgLyB3aW5kb3dNYXJnaW4gKiAxMDApLFxyXG4vLyAgICAgICAgIHBlcmNlbnRzRHJhdyA9IDEyMDAvMTAwICogcGVyY2VudHNFbGFwc2VkO1xyXG5cclxuLy8gICAgICAgICBpZihzdGFydEFuaW1hdGUgPj0gMCkge1xyXG4vLyAgICAgICAgICAgdmFyIGRyYXdBbW91bnQgPSAxMjAwIC0gcGVyY2VudHNEcmF3O1xyXG5cclxuLy8gICAgICAgICAgIGlmKGRyYXdBbW91bnQgPiAwKSB7XHJcbi8vICAgICAgICAgICAgIHN2Z1BhdGguZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuLy8gICAgICAgICAgICAgICBpdGVtLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBkcmF3QW1vdW50O1xyXG4vLyAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vIH0pKCk7IiwidmFyIHNsaWRlciA9IChmdW5jdGlvbigpe1xyXG4gIHZhciBjb3VudGVyID0gMTtcclxuICB2YXIgZHVyYXRpb24gPSA0MDA7XHJcblxyXG4gIHZhciBtb3ZlU2xpZGUgPSBmdW5jdGlvbihjb250YWluZXIsIGRpcmVjdGlvbil7XHJcbiAgICB2YXIgaXRlbXMgPSBjb250YWluZXIuZmluZCgnLndvcmtzX19zbGlkZXNfX2l0ZW0nKTtcclxuICAgIHZhciBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcud29ya3NfX3NsaWRlc19faXRlbV9hY3RpdmUnKTtcclxuICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT0gJ2Rvd24nID8gMTAwOiAtMTAwO1xyXG5cclxuXHJcbiAgICBpZihjb3VudGVyID49IGl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnQ291bnRlciBzdG9wOiAnICsgY291bnRlcik7XHJcbiAgICAgIGNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXFJdGVtID0gaXRlbXMuZXEoY291bnRlcik7XHJcblxyXG4gICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgJ3RvcCc6IGRpcmVjdGlvbiArICclJ1xyXG4gICAgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICd0b3AnOiAnMCdcclxuICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbigpe1xyXG4gICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCd3b3Jrc19fc2xpZGVzX19pdGVtX2FjdGl2ZScpLmNzcygndG9wJywgJycgKyBkaXJlY3Rpb24gKyAnJScpO1xyXG4gICAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoJ3dvcmtzX19zbGlkZXNfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBmdW5jdGlvbigpe1xyXG4gICAgLy8gICBhY3RpdmVJdGVtLnJlbW92ZUNMYXNzKCdhY3RpdmUnKS5jc3MoJ3RvcCcsICctJyArIGRpcmVjdGlvbiArICclJyk7XHJcbiAgICAvLyAgIGpRdWVyeSh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvLyB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGpRdWVyeSgnLnNsaWRlcl9fY29udHJvbHNfX3RvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBtb3ZlU2xpZGUoalF1ZXJ5KCcud29ya3NfX3NsaWRlcl9fY29udHJvbHNfX3JpZ2h0JyksICd1cCcpO1xyXG4gICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbnNsaWRlci5pbml0KCk7Il19
