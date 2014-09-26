// Main
FastClick.attach(document.body);
$('#game').hide();
$('#lose').hide();
$('#scores').hide();
updateScores();
intro();

// Transitions
var introToGame = function() {
  $('#intro').fadeOut(function() {
    $('body').animate({backgroundColor:'#4c7fff'});
    $('#game').fadeIn(function() {
      game();
    });
  });
};

var introToScores = function() {
  $('#intro').fadeOut(function() {
    $('body').animate({backgroundColor:'#ff754c'});
    $('#scores').fadeIn(function() {
      scores();
    });
  });
};

var scoresToIntro = function() {
  $('#scores').fadeOut(function() {
    $('body').animate({backgroundColor:'#84c455'});
    $('#intro').fadeIn(function() {
      intro();
    });
  });
};

var gameToIntro = function() {
  $('#game').fadeOut(function() {
    $('body').animate({backgroundColor:'#84c455'});
    $('#intro').fadeIn(function() {
      intro();
    });
  });
};

var gameToScore = function() {
  $('#game').fadeOut(function() {
    $('body').animate({backgroundColor:'#ff754c'});
    $('#scores').fadeIn(function() {
      scores();
    });
  });
};

// Blink effect for button clicks
var blinkEffect = function(item) {
  $(item).addClass('hover');
  setTimeout(function() {
    $(item).removeClass('hover');
  },100);

};