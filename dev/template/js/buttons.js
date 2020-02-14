var buttons = (function(){
  var init = function(){
    _setupListeners();
  };
  var _setupListeners = function(){
    // Click on login checkbox
    var loginCheckboxButton = document.querySelector('#login__form__checkbox__label');
    loginCheckboxButton.addEventListener('click', function(e){
      e.preventDefault();
      console.log(loginCheckboxButton);
      loginCheckboxButton.classList.toggle('login__form__checkbox__label_checked');
    });
    // Click on robot buttons
    var loginFormRadioLabelYes = document.querySelector('#login__form__radio__label__yes');
    var loginFormRadioLabelNo = document.querySelector('#login__form__radio__label__no');
    loginFormRadioLabelYes.addEventListener('click', function(e){
      e.preventDefault();
      loginFormRadioLabelYes.classList.toggle('login__form__radio__label_checked');
    });
    loginFormRadioLabelNo.addEventListener('click', function(e){
      e.preventDefault();
      loginFormRadioLabelNo.classList.toggle('login__form__radio__label_checked');
    });
  };
  return {
    init: init
  };
})();

buttons.init();