console.log('js is linked');



$(document).ready(function(){

//  add class 'key' to black keys and white keys.
// to add hover in css
 const wKeys = $('.w-key');
 wKeys.addClass('key');
 const bKeys = $('.b-key');
 bKeys.addClass('key');

// EVENT LISTENERS
// each piano key div runs a function
// that plays the correct note
$('.key').click(markCorrect);
$('button').click(reset);
$('#c1').click(playC1);
$('#c-sharp1').click(playCSharp1);
$('#d1').click(playD1);
$('#d-sharp1').click(playDSharp1);
$('#e1').click(playE1);
$('#f1').click(playF1);
$('#f-sharp1').click(playFSharp1);
$('#g1').click(playG1);
$('#g-sharp1').click(playGSharp1);
$('#a1').click(playA1);
$('#a-sharp1').click(playASharp1);
$('#b1').click(playB1);
$('#c2').click(playC2);
$('#c-sharp2').click(playCSharp2);
$('#d2').click(playD2);
$('#d-sharp2').click(playDSharp2);
$('#e2').click(playE2);
$('#f2').click(playF2);
$('#f-sharp2').click(playFSharp2);
$('#g2').click(playG2);
$('#g-sharp2').click(playGSharp2);
$('#a2').click(playA2);
$('#a-sharp2').click(playASharp2);
$('#b2').click(playB2);
$('.play').click(currentChallenge, resetPosition);


// GLOBAL VARIABLES
let nextChallenge = $('.next-scale');
// ball refers to Michael Jackson gif
const ball = $('.ball');
let challenge = $('.challenge');
let fire = $('.fire');

const scaleNames = ['C Major', 'G Major', 'D Major', 'A Major',
                    'E Major', 'B Major', 'F# Major', 'C# Major',
                     'Ab Major', 'Eb Major', 'Bb Major', 'F Major', 'YOU WIN!'];



// ARRAYS representing correct order of notes
const cMajor = ['c1', 'd1', 'e1', 'f1', 'g1', 'a1', 'b1', 'c2'];
const gMajor = ['g1', 'a1', 'b1', 'c2', 'd2', 'e2', 'f-sharp2', 'g2'];
const dMajor = ['d1', 'e1', 'f-sharp1', 'g1', 'a1', 'b1', 'c-sharp2', 'd2'];
const aMajor = ['a1', 'b1', 'c-sharp2', 'd2', 'e2', 'f-sharp2', 'g-sharp2', 'a2'];
const eMajor = ['e1', 'f-sharp1', 'g-sharp1', 'a1', 'b1', 'c-sharp2', 'd-sharp2', 'e2'];
const bMajor = ['b1', 'c-sharp2', 'd-sharp2', 'e2', 'f-sharp2', 'g-sharp2', 'a-sharp2', 'b2'];
const gFlatMajor = ['f-sharp1', 'g-sharp1', 'a-sharp1', 'b1', 'c-sharp2', 'd-sharp2', 'f2', 'f-sharp2'];
const dFlatMajor = ['c-sharp1', 'd-sharp1', 'f1', 'f-sharp1', 'g-sharp1', 'a-sharp1', 'c2', 'c-sharp2'];
const aFlatMajor = ['g-sharp1', 'a-sharp1', 'c2', 'c-sharp2', 'd-sharp2', 'f2', 'g2', 'g-sharp2'];
const eFlatMajor = ['d-sharp1', 'f1', 'g1', 'g-sharp1', 'a-sharp1', 'c2', 'd2', 'd-sharp2'];
const bFlatMajor = ['a-sharp1', 'c2', 'd2', 'd-sharp2', 'f2', 'g2', 'a2', 'a-sharp2'];
const fMajor = ['f1', 'g1', 'a1', 'a-sharp1', 'c2', 'd2', 'e2', 'f2'];

// set empty array for markCorrect() to push to
let playedScale = [];
// list each scale/challenge in array
const currentScale = [cMajor, gMajor, dMajor, aMajor,
                    eMajor, bMajor, gFlatMajor, dFlatMajor,
                    aFlatMajor, eFlatMajor, bFlatMajor, fMajor];



// FUNCTIONS

// generate new challenge
// update display screen with the current and challenge/scale
function currentChallenge() {
  challenge.css('fontSize', '40px');
  challenge.text(scaleNames[count2]);
     if (count2 < 11) {
       nextChallenge.text(scaleNames[count2 + 1]);
     } else {
      nextChallenge.text('');
     }
 }

 // reset Michael's position on play button click
 // engage the lose-testing function interval
function resetPosition() {
  ball.css('marginLeft', '0px');
  currentChallenge();
  setInterval(youLose, 10);
}

// when correct key is played, turn the key blue and
// push it's ID to the playedScale[] array.
// push MJ away from fire every correct click
let count = 0;
function markCorrect() {
  if ($(this).attr('id') === currentScale[count2][count]) {
    playedScale.push($(this).attr('id'));
    $(this).css('backgroundColor', 'blue');
    count++;
    ball.stop();
    ball.animate({marginLeft: '500px'}, 'fast');
    ball.animate({marginLeft: '-=550px'}, 3000);
  }
  checkScale();
}

// function to reset the key colors and note counter
function reset() {
  playedScale = [];
  $('.w-key').css('backgroundColor', 'white');
  $('.b-key').css('backgroundColor', 'black');
  count = 0;
}

// function to check if scale has been fully played
// if so, go on to the next scale and clear the keys' color
let count2 = 0;
function checkScale() {
  if (count === 8) {
    reset();
    count2++;
    currentChallenge();
  }
}

// check if MJ is in the fire every 10ms
var loseCheck = setInterval(youLose, 10);

// function to lose and win the game
// if MJ gets into the fire, you lose
// if all 12 scales are played correctly, you win.
function youLose() {
  const ball = $('.ball');
  var currentMargin = parseInt(ball.css('marginLeft'));
  if (count2 < 11) {
  if (currentMargin < -40) {
    var ow = $('#ow').get(0);
    ow.play();
    count = 0;
    count2 = 0;
    currentChallenge();
    clearInterval(loseCheck);
    challenge.css('fontSize', '20px');
    challenge.text('You lose. Press "Play" to try again.');
    nextChallenge.text("");
  }
  } else if (count2 === 12) {
    fire.remove();
    const dontStop = $('#dont-stop').get(0);
    dontStop.play()
  }
}

// PLAY NOTE FUNCTIONS
function playC1() {
  let cNote1 = $('#ac1').get(0);
  cNote1.play();
}
function playCSharp1() {
  let cSharp1 = $('#ac-sharp1').get(0);
  cSharp1.play();
}
function playD1() {
  let dNote1 = $('#ad1').get(0);
  dNote1.play();
}
function playDSharp1() {
  let dSharp1 = $('#ad-sharp1').get(0);
  dSharp1.play();
}
function playE1() {
  let e1 = $('#ae1').get(0);
  e1.play();
}
function playF1() {
  let f1 = $('#af1').get(0);
  f1.play();
}
function playFSharp1() {
  var fSharp1 = $('#af-sharp1').get(0);
  fSharp1.play();
}
function playG1() {
  var g1 = $('#ag1').get(0);
  g1.play();
}
function playGSharp1() {
  let gSharp1 = $('#ag-sharp1').get(0);
  gSharp1.play();
}
function playA1() {
  let a1 = $('#aa1').get(0);
  a1.play();
}
function playASharp1() {
  let aSharp1 = $('#aa-sharp1').get(0);
  aSharp1.play();
}
function playB1() {
  let b1 = $('#ab1').get(0);
  b1.play();
}
 function playC2() {
   let cNote2 = $('#ac2').get(0);
   cNote2.play();
 }
function playCSharp2() {
  let cSharp2 = $('#ac-sharp2').get(0);
  cSharp2.play();
}
function playD2() {
  var d2 = $('#ad2').get(0);
  d2.play();
}
function playDSharp2() {
  let dSharp2 = $('#ad-sharp2').get(0);
  dSharp2.play();
}
function playE2() {
  let e2 = $('#ae2').get(0);
  e2.play();
}
function playF2() {
  let f2 = $('#af2').get(0);
  f2.play();
}
function playFSharp2() {
  var fSharp2 = $('#af-sharp2').get(0);
  fSharp2.play();
}
function playG2() {
  var g2 = $('#ag2').get(0);
  g2.play();
}
function playGSharp2() {
  let gSharpNote2 = $('#ag-sharp2').get(0);
  gSharpNote2.play();
}
function playA2() {
  let a2 = $('#aa2').get(0);
  a2.play();
}
function playASharp2() {
  let aSharp2 = $('#aa-sharp2').get(0);
  aSharp2.play();
}
function playB2() {
  let b2 = $('#ab2').get(0);
  b2.play();
}

// GETTING USER INFO
// pull user data from URL
let query = window.location.search.substring(1);
let urlStringUser = query.split("&");


for (let i = 0; i <urlStringUser.length; i++) {
  let tempArr = [];
  tempArr = urlStringUser[i].split("=");
  let key = tempArr[0];
  let value = tempArr[1];
    if (i === 1) {
      let greeting = $('h3');
      greeting.append(value);
    }
}




});
