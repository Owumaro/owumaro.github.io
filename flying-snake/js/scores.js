var scores = function() {
  console.log('Scores called');
  
  // "<< Back" click
  $('#scores button').click(function() {
    blinkEffect(this);
    playSoundGood();
    // Unbind events
    $('#scores button').unbind();
    // Transition
    scoresToIntro();
  });
  
  // Keyboard shortcut
  $(window).keydown(function(evt) {
    switch (evt.which) {
      case 37:
        $('#scores button').click();
        break;
    }
  });
}