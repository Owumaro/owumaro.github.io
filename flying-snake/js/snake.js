// Settings
var initialSnakeLength = 3;
var maxSnakeLength = 9;
var snakeWidthPercentage = 0.8;
var snakeEyeWidthPercentage = 0.25;
var snakeEyeDistPercentage = 0.5;

// Snake object
var Snake = function() {
  this.position = [];
  for (var i=0; i<initialSnakeLength; i++) {
    this.position.push(Math.ceil(cols/2));
  }

  this.getLength = function() {
    return this.position.length;
  }

  this.eat = function() {
    playSoundGood();
    if (this.getLength() < maxSnakeLength) {
      this.position.push(this.position[this.getLength()-1]);
    }
  }
  
  this.hit = function() {
    playSoundBad();
    this.position.pop();
  }

  this.next = function(direction) {
    if (direction === 'left') {
      // remove tail
      this.position.pop();
      // compute new head
      var newHead = this.position[0];
      if (newHead > 1) newHead--;
      // add new head
      this.position.unshift(newHead);
    } else if (direction === 'right') {
      // remove tail
      this.position.pop();
      // compute new head
      var newHead = this.position[0];
      if (newHead < cols) newHead++;
      // add new head
      this.position.unshift(newHead);
    } else if (direction === 'straight') {
      // remove tail
      this.position.pop();
      // add new head
      this.position.unshift(this.position[0]);
    }
  }

  this.draw = function(ctx) {
    // aliases
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    var colWidth = width / cols;
    var lineHeight = colWidth; // yep, it's a square...
    var snakeWidth = colWidth * snakeWidthPercentage;

    // canvas line settings
    ctx.lineCap = 'square';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = snakeWidth;

    // line
    ctx.beginPath();
    ctx.moveTo(this.position[0] * colWidth - colWidth/2, height - lineHeight*maxSnakeLength + lineHeight/2);

    for (var i=1; i<this.getLength(); i++) {
      if (this.position[i] !== this.position[i-1]) {
        // angle
        ctx.lineTo(this.position[i-1] * colWidth - colWidth/2, height - lineHeight*maxSnakeLength + lineHeight/2 + lineHeight*i);
      }
      // next position
      ctx.lineTo(this.position[i] * colWidth - colWidth/2, height - lineHeight*maxSnakeLength + lineHeight/2 + lineHeight*i);
    }

    ctx.stroke();

    // eyes
    var eyeX = this.position[0] * colWidth - colWidth/2,
        eyeY = height - lineHeight*maxSnakeLength + lineHeight/2,
        eyeR = snakeWidth/2 * snakeEyeWidthPercentage,
        eyeD = snakeWidth * snakeEyeDistPercentage / 2;
    //ctx.clearRect(eyeX - eyeR, eyeY - eyeR, eyeR*2, eyeR*2);
    ctx.clearRect(eyeX - eyeR - eyeD, eyeY - eyeR, eyeR*2, eyeR*2);
    ctx.clearRect(eyeX - eyeR + eyeD, eyeY - eyeR, eyeR*2, eyeR*2);
  }
}