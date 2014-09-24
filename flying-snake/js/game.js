// Settings
var cols = 9;
var rows = 20;

var game = function() {
  console.log('Game called');

  resetItemsProbas();
  
  // Canvas sizing
  var ctx = $('#game canvas')[0].getContext('2d');
  
  var resize = function() {
    if (cols/rows < window.innerWidth/window.innerHeight) {
      ctx.canvas.height = window.innerHeight;
      ctx.canvas.width = ctx.canvas.height / rows * cols;
    } else {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = ctx.canvas.width / cols * rows;
    }
  };
  resize();
  
  $(window).resize(function(evt) {
    if (evt.target === window) {
      resize();
      draw();
    }
  });
  // turn off antialiasing
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.oImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;

  // key events
  var direction = 'straight';
  $(window).keydown(function(evt) {
    switch (evt.which) {
      case 37:
        direction = 'left';
        break;
      case 38:
        direction = 'straight';
        break;
      case 39:
        direction = 'right';
        break;
    }
  });
  
  // touch events
  var touchX;
  var touchInterval;
  $('#game canvas').on('touchstart', function(evt) {
    evt.preventDefault();
    touchX = evt.originalEvent.targetTouches[0].pageX;
    touchInterval = setInterval(function() {
      updateDirection();
    }, 10);
  });
  
  $(window).on('touchend', function() {
    evt.preventDefault();
    clearInterval(touchInterval);
  });
  
  $(window).on('touchmove', function(evt) {
    evt.preventDefault();
    touchX = evt.originalEvent.targetTouches[0].pageX;
  });
  
  // mouse events
  $('#game canvas').on('mousedown', function(evt) {
    evt.preventDefault();
    touchX = evt.clientX;
    touchInterval = setInterval(function() {
      updateDirection();
    }, 10);
  });
  
  $(window).on('mouseup', function() {
    evt.preventDefault();
    clearInterval(touchInterval);
  });
  
  $(window).on('mousemove', function(evt) {
    evt.preventDefault();
    touchX = evt.clientX;
  });
  
  // touch/mouse events callback
  var updateDirection = function() {
    // compute target column
    var x;
    if (touchX < $('#game canvas').offset().left) {
      x = 1;
    } else if (touchX > $('#game canvas').offset().left + ctx.canvas.width) {
      x = cols;
    } else {
      x = Math.ceil((touchX - $('#game canvas').offset().left) / (ctx.canvas.width / cols));
    }
    
    // infer snake direction
    if (x < snake.position[0]) {
      direction = 'left';
    } else if (x > snake.position[0]) {
      direction = 'right';
    } else {
      direction = 'straight';
    }
  }
  
  // game progression
  var progression = 0;
  
  // score
  var score = 0;
  
  // particles object
  var particles = new Particles();
  
  // snake object
  var snake = new Snake();
  
  // items object
  var items = new Items();
  
  // draw function
  var draw = function() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.width = ctx.canvas.width; // android stock browser fix for clearRect
    particles.draw(ctx);
    snake.draw(ctx);
    items.draw(ctx);
  };
  draw();
  
  // draw interval
  var drawInterval = setInterval(function() {
    draw();
  }, 15);
  
  // main interval (calling all nexts)
  var nextInterval = setInterval(function() {
    // increase progression count
    progression++;
    
    // snake next step
    snake.next(direction);
    // reset direction
    direction = 'straight';
    
    // items next step
    items.next();
    
    // check for item collision
    score = items.check(snake, score);
    
    // check if player sucks
    if (snake.getLength() < 2) {
      endGame();
    }
    
    // difficulty increasing
    if (progression === 50) {
      mineProbaAppear = 0.1;
    }
    if (progression === 100) {
      $('body').animate({backgroundColor:'#4c6eff'});
      mineProbaAppear = 0.15;
    }
    if (progression === 150) {
      mineProbaAppear = 0.2;
    }
    if (progression === 200) {
      $('body').animate({backgroundColor:'#4c4cff'});
      mineProbaAppear = 0.25;
    }
    if (progression === 350) {
      $('body').animate({backgroundColor:'#4c7fff'});
      resetItemsProbas();
    }
    if (progression === 400) {
      $('body').animate({backgroundColor:'#5858db'});
      mineProbaAppear = 0.28;
    }
    
    // score
    score += snake.getLength();
    $('#score').html(score);
  }, 110);
  
  // particles interval
  var particlesInterval = setInterval(function() {
    particles.next();
  }, 7);
  
  var endGame = function() {
    // clear intervals
    clearInterval(drawInterval);
    clearInterval(nextInterval);
    clearInterval(particlesInterval);
    
    // remove bindings
    $(window).unbind();
    
    $('body').animate({backgroundColor:'#ff4c4c'}, function() {
      $('#lose').fadeIn();
      lose();
    });
  }
  
};