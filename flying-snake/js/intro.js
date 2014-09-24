var intro = function() {
  console.log('Intro called');
  
  var $canvas = $('#intro canvas');
  var canvas = $canvas[0];
  var ctx = canvas.getContext('2d');

  // Canvas init
  canvas.width = 500;
  canvas.height = 250;

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 40.0;
  ctx.lineCap = 'square';

  var snake = {
    position: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    nextPosition: function() {
      // Remove 1st position
      this.position.shift();
      // Generate next position
      var next = this.position[this.position.length-1];
      var rd = Math.random();
      if (rd < 1/3 && next > 1) next--;
      if (rd > 2/3 && next < 5) next++;
      this.position.push(next);
    }
  }

  // Snake animation
  var introInterval = setInterval(function() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate next position
    snake.nextPosition();

    // Draw snake
    ctx.beginPath();
    ctx.moveTo(25, -25+50*snake.position[0]);
    for (var i=1; i<=snake.position.length-1; i++) {
      if (snake.position[i] !== snake.position[i-1]) {
        // angle
        ctx.lineTo(25+50*(i-1), -25+50*snake.position[i]);
      }
      // next position
      ctx.lineTo(25+50*i, -25+50*snake.position[i]);
    }
    ctx.stroke();

    // draw snake eye
    var eye = {
      x: 25+50*(snake.position.length-1),
      y: -25+50*snake.position[snake.position.length-1],
      r: 5
    };
    ctx.clearRect(eye.x - eye.r, eye.y - eye.r, eye.r*2, eye.r*2); 
  }, 100);

  // Play button
  $('#intro div.buttons button:first').click(function() {
    blinkEffect(this);
    playSoundGood();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $('#intro div.buttons button').unbind();
    clearInterval(introInterval);
    // Transition
    introToGame();
  });
  
  // Scores button
  $('#intro div.buttons button:last').click(function() {
    blinkEffect(this);
    playSoundGood();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $('#intro div.buttons button').unbind();
    clearInterval(introInterval);
    // Transition
    introToScores();
  });
  
  // Keyboard shortcuts
  $(window).keydown(function(evt) {
    switch (evt.which) {
      case 37:
        $('#intro div.buttons button:first').click();
        break;
      case 39:
        $('#intro div.buttons button:last').click();
        break;
    }
  });
};