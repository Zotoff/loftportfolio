let flip = (function(){
  let init = function(){
    _setupListeners();
  };
  let _setupListeners = function(){
    console.log('check');
  };
  return {
    init: init
  };
})();