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