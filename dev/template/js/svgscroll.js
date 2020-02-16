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