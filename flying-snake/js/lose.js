var lose = function() {
  console.log('Lose called');

  // Home button
  $('#lose div.buttons button:first').click(function() {
    blinkEffect(this);
    playSoundGood();
    $('#lose div.buttons button').unbind();
    // Transition
    $('#lose').fadeOut(function() {
      gameToIntro();
    });
  });

  // Play again button
  $('#lose div.buttons button:nth-child(2)').click(function() {
    blinkEffect(this);
    playSoundGood();
    $('#lose div.buttons button').unbind();
    // Transition
    $('#lose').fadeOut(function() {
      $('body').animate({backgroundColor:'#4c7fff'}, function() {
        game();
      });
    });
  });

  // Scores button
  $('#lose div.buttons button:last').click(function() {
    blinkEffect(this);
    playSoundGood();
    $('#lose div.buttons button').unbind();
    // Transition
    $('#lose').fadeOut(function() {
      gameToScore();
    });
  });
  
  // Keyboard shortcuts
  $(window).keydown(function(evt) {
    switch (evt.which) {
      case 37:
        $('#lose div.buttons button:first').click();
        break;
      case 38:
      case 40:
        $('#lose div.buttons button:nth-child(2)').click();
        break;
      case 39:
        $('#lose div.buttons button:last').click();
        break;
    }
  });
};