var soundOn = true; 

// Audio
var soundGood = new Audio('sound/good.mp3');
var soundBad = new Audio('sound/bad.mp3');

var playSoundGood = function() {
  if (soundOn) {
    soundGood.currentTime=0;
    soundGood.play();
  }
}

var playSoundBad = function() {
  if (soundOn) {
    soundBad.currentTime=0;
    soundBad.play();
  }
}

// UI
$('#sound button').mouseover(function() {
  var img = $('#sound button img')[0];
  if (soundOn) img.src = 'img/sound_on_hover.gif';
  else img.src = 'img/sound_off_hover.gif';
});

$('#sound button').mouseout(function() {
  var img = $('#sound button img')[0];
  if (soundOn) img.src = 'img/sound_on.gif';
  else img.src = 'img/sound_off.gif';
});

$('#sound button').click(function() {
  if (soundOn) soundOn = false;
  else soundOn = true;
  $('#sound button').mouseover();
});