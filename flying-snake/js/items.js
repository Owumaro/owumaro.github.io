// Settings
var maxNbApples = 10;
var maxNbMines = 100;

var appleProbaAppear;
var mineProbaAppear;
var resetItemsProbas = function() {
  appleProbaAppear = 0.5;
  mineProbaAppear = 0.05
};
resetItemsProbas();

// Snake object
var Items = function() {
  this.apples = [];
  this.mines = [];
  
  // check if there is an apple at the top
  var checkApple = function(col) {
    if (this.apples) {
      for (var i=0; i<this.apples.length; i++) {
        if (this.apples[i].y === rows && this.apples[i].x === col) return true;
      }
    }
    return false;
  }

  // function to call at each new step
  this.next = function() {
    // make apples go down
    for (var i=0; i<this.apples.length; i++) {
      this.apples[i].y--;
    }
    // remove apples out of screen
    for (var i=0; i<this.apples.length; i++) {
      if (this.apples[i].y < 0) {
        this.apples.splice(i, 1);
      }
    }
    
    // make mines go down
    for (var i=0; i<this.mines.length; i++) {
      this.mines[i].y--;
    }
    // remove mines out of screen
    for (var i=0; i<this.mines.length; i++) {
      if (this.mines[i].y < 0) {
        this.mines.splice(i, 1);
      }
    }
     
    // generate new apple ?
    if (this.apples.length < maxNbApples) {
      if (Math.random() < appleProbaAppear) {
        // generate Apple iPhone 7
        // joke, just kidding
        var newApple = {
          x: Math.ceil(Math.random()*cols),
          y: rows
        };
        if (Math.random()>1/2) newApple.color = '#ff4030';
        else newApple.color = '#99db4c';

        this.apples.push(newApple);
      }
    }
    
    // generate new mines ?
    if (this.mines.length < maxNbMines) {
      for (var i=1; i<=cols; i++) {
        // check if there is no apple
        if (!checkApple(i)) {
          if (Math.random() < mineProbaAppear) {
            var newMine = {
              x: i,
              y: rows
            };

            this.mines.push(newMine);
          }
        }
      }
    }
  };

  this.draw = function(ctx) {
    // aliases
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    var gridSize = width/cols;
    
    // apples
    for (var i=0; i<this.apples.length; i++) {
      ctx.fillStyle = this.apples[i].color;
      ctx.fillRect((this.apples[i].x-1) * gridSize + gridSize*0.1, height - this.apples[i].y * gridSize + gridSize*0.2, gridSize*0.8, gridSize*0.6);
      ctx.fillRect((this.apples[i].x-1) * gridSize + gridSize*0.2, height - this.apples[i].y * gridSize + gridSize*0.1, gridSize*0.6, gridSize*0.8);
      ctx.fillStyle = '#fff';
      ctx.fillRect((this.apples[i].x-1) * gridSize + gridSize*0.7, height - this.apples[i].y * gridSize + gridSize*0.2, gridSize*0.1, gridSize*0.1);
    }
    
    // mines
    for (var i=0; i<this.mines.length; i++) {
      ctx.fillStyle = '#6b00c7';
      ctx.fillRect((this.mines[i].x-1) * gridSize + gridSize*0.1, height - this.mines[i].y * gridSize + gridSize*0.2, gridSize*0.8, gridSize*0.6);
      ctx.fillRect((this.mines[i].x-1) * gridSize + gridSize*0.2, height - this.mines[i].y * gridSize + gridSize*0.1, gridSize*0.6, gridSize*0.8);
    }
  };
  
  this.check = function(snake, score) {
    var snakeHead = snake.position[0];
    
    // apples
    for (var i=0; i<this.apples.length; i++) {
      if ((this.apples[i].y === maxSnakeLength || this.apples[i].y === maxSnakeLength-1) && this.apples[i].x === snakeHead) {
        snake.eat();
        this.apples.splice(i, 1);
        score += 50;
      }
    }
    
    // mines
    for (var i=0; i<this.mines.length; i++) {
      if ((this.mines[i].y === maxSnakeLength || this.mines[i].y === maxSnakeLength-1) && this.mines[i].x === snakeHead) {
        snake.hit();
        this.mines.splice(i, 1);
      }
    }
    
    return score;
  }
}