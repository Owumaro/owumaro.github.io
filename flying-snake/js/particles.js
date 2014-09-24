// Settings
var maxNbParticles = 10;
var particleProbaAppear = 0.05;
var particleWidthPercentage = 0.05; // % of game width
var particleHeightPercentage = 0.15; // % of game height

// Particles object
var Particles = function() {
  this.particles = [];

  this.next = function() {
    // Try to generate a new particle if maxNbParticles isn't reached
    if (this.particles.length < maxNbParticles) {
      if (Math.random() < particleProbaAppear) {
        var particle = {
          x: Math.random(),
          y: 0
        };
        this.particles.push(particle);
      }
    }

    // For each particle
    for (var i=0; i<this.particles.length; i++) {
      // Make it go down
      this.particles[i].y += 0.01;
      // If we reach 100%, remove it
      if (this.particles[i].y > 1 + particleHeightPercentage) {
        this.particles.splice(i, 1);
      }
    }
  }

  this.draw = function(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    
    var particleWidth = width * particleWidthPercentage;
    var particleHeight = height * particleHeightPercentage;
    
    // For each particle
    for (var i=0; i<this.particles.length; i++) {
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(this.particles[i].x * width, this.particles[i].y * height - particleHeight, particleWidth, particleHeight);
    }
  }
}