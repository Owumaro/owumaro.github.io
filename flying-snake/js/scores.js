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


var updateScores = function() {
  // Load web storage
  if(typeof(Storage) !== "undefined") {
    // get array from localStorage
    var scoresStorage = localStorage.getItem("scores");
    if (!scoresStorage) {
      scoresStorage = [];
    } else {
      scoresStorage = JSON.parse(scoresStorage);
    }

    // update html
    for (var i=0; i<scoresStorage.length; i++) {
      $('#scores table tbody tr:nth-child(' + (i+1) + ') td:nth-child(2)').html(scoresStorage[i]);
    }
  } else {
    // Sorry! No Web Storage support..
  }
}