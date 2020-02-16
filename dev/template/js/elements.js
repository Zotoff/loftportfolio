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