$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top +'px'
        }, 2000);
        return false;
      }
    }
  });
});


var Rotation = (function () {
  var p = Rotation.prototype;

  function Rotation($elem) {
    this._$elem = $elem;
    this._$child = $elem.children();
    this._props = {};
    
    this._onResize();
    this._handleEvents();
  }

  p._handleEvents = function () {
    this._$elem.on('mousemove', this._onMousemove.bind(this));
    this._$elem.on('mouseout', this._onMouseout.bind(this));
  }
  
  p._onMousemove = function (e) {
    var _x = e.offsetX - this._props.center[0];
    var _y = e.offsetY - this._props.center[1];
    
    TweenMax.to(this._$child, .1, {
      rotationX: _y / 30,
      rotationY: _x / 30
    });
  };
  
  p._onMouseout = function () {
    TweenMax.to(this._$child, .3, {
      rotationX: 0,
      rotationY: 0
    });
  };
  
  p._onResize = function () {
    this._props.center = [this._$elem.width() / 2, this._$elem.height() / 2];
  };
  
  return Rotation;
}());

new Rotation($('.js-rotation'));
