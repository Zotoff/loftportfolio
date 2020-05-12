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