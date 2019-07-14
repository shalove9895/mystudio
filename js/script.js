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


var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var result = document.getElementById('result');
var btns = document.querySelectorAll('.btn');''
var inputFieldSelected = null;
console.log('btn');
for(var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
    console.log('btn');
      var value = this.innerHTML;

      if(value == '+') {
          result.value = parseInt(input1.value) + parseInt(input2.value);
      } else if(value == '-') {
          result.value = parseInt(input1.value) - parseInt(input2.value);
      } else if(value == '*') {
          result.value = parseInt(input1.value) * parseInt(input2.value);
      } else if(value == '/') {
          result.value = parseInt(input1.value) / parseInt(input2.value);

      } else if(inputFieldSelected) {
          if(inputFieldSelected == 'input1') {
              input1.value += value;
          } else if(inputFieldSelected == 'input2') {
              input2.value += value;
          }
      }
  })

}

input1.addEventListener('focus', function() {
  inputFieldSelected = 'input1';
})
input2.addEventListener('focus', function() {
  inputFieldSelected = 'input2';
})

document.addEventListener('scroll', function() {
      if(scrollY > 200) {
          document.getElementById('goToTopBtn').classList.add('active');
      } else {
          document.getElementById('goToTopBtn').classList.remove('active');
      }
  })
