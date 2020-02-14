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
    authorizeButton.addEventListener('click', function(e) {
      e.preventDefault();
      loginBlock.classList.toggle('flip--y');
      authorizeButton.classList.add('d--none');
      //loginAbout.classList.toggle('d--none');
      //loginForm.classList.toggle('d--none');
    })
  };
  var _flipMainButtonClick = function(){
    var authorizeButton = document.querySelector('#authorize__btn');
    var loginButtonMain = document.querySelector('#login__form__button-main');
    var loginBlock = document.querySelector('#login__container');
    var loginAbout = document.querySelector('#login__about');
    var loginForm = document.querySelector('#login__form');
    loginButtonMain.addEventListener('click', function(e){
      e.preventDefault();
      loginBlock.classList.toggle('flip--y');
      authorizeButton.classList.remove('d--none');
    });
  }
  return {
    init: init
  };
})();

flip.init();