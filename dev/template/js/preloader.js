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