var users={
    "p": "p",
};

var page;

function showPage(pageId) {
    var pages = ['login', 'register','welcome', 'game', 'configuration'];
    for (var i = 0; i < pages.length; i++) {
        page = document.getElementById(pages[i]);
        if (pageId=='configuration'){
          document.addEventListener("keydown", Message ,false);}
        if (pages[i] === pageId) {
            page.style.display = 'block';
        } else {
            page.style.display = 'none';
        }
    }
    
}

function about(){
// Get the modal
var modal = document.getElementById("about");
modal.style.display = 'block';
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
}
  
function isPassValid(pass) {
    var regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regex.test(pass);
}

function areNamesValid(str) {
    // Regular expression to match non-numeric characters
    var regex = /^[^\d]+$/;
    return regex.test(str);
}

function isEmailValid(email) {
    // Regular expression to match email pattern
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function arePassSame(pass1,pass2) {
    return pass1==pass2;
}

function checkValidation()
{
    if (!areNamesValid(document.getElementById("name").value)) {
        alert("Please enter a valid name.");
        return;
        }

        if (!areNamesValid(document.getElementById("last-name").value)) {
        alert("Please enter a valid last name.");
        return;
        }

        if (!isEmailValid(document.getElementById("email").value)) {
        alert("Please enter a valid email address.");
        return;
        }

        if (!isPassValid(document.getElementById("password").value)) {
        alert("Please enter a valid password with at least 8 characters and a combination of letters and digits.");
        return;
        }

        if (!arePassSame(document.getElementById("confirm-password").value, document.getElementById("password").value)) {
        alert("Please make sure your passwords match.");
        return;
        }

        users[document.getElementById("username").value] = document.getElementById("password").value;

    showPage('welcome')
}

function loginGame(){
    username=document.getElementById("reg_username").value
    password=document.getElementById("reg_password").value
    if (!(username in users)) {
        alert("The username you entered dosent exist.");
        return; 
    }
    else if(!(users[username]==password)){
        alert("Password is not correct.");
        return;   
    }
    showPage('configuration')

}



var chosenShootingKey;
var chosenTime;

function Message(event) {
  if (event.keyCode == 32 || // space bar
    (event.keyCode >= 65 && event.keyCode <= 90)) { // letters A-Z
      // update the shooting key variable
      chosenShootingKey = event.keyCode;
      message = document.getElementById("message");
      if (message) {
        message.style.display = "none";
        const label = document.querySelector('label[for="minutes"]');
        const input = document.getElementById('minutes');
        const start = document.getElementById('start');
        label.style.display = 'block';
        input.style.display = 'block';
        start.style.display = 'block';
      }
      document.removeEventListener("keydown", Message, false);
  } else {
    alert("Please choose a key that is either the space bar or one of the letters");
    return; 
  }
}

function doneConf() {
  chosenTime = document.getElementById('minutes').value;
  if (chosenTime<2){
    alert("The minimum is 2 minuets");
  }
  else{
    showPage('game')
  }
}



// ------------------------------------- code from cannon -------------------------------------------------------------------------------
var canvas; // the canvas
var context; // used for drawing on the canvas

var TARGET_PIECES = 20; // sections in the target
var MISS_PENALTY = 2; // seconds deducted on a miss
var HIT_REWARD = 3; // seconds added on a hit
var TIME_INTERVAL = 15; // screen refresh interval in milliseconds

// variables for the game loop and tracking statistics
var intervalTimer; // holds interval timer
var intervalTimerBadShots;
var timerCount; // number of times the timer fired since the last second
var timeLeft; // the amount of time left in seconds
var shotsFired; // the number of shots the user has fired
var timeElapsed; // the number of seconds elapsed

// variables for the blocker and target
var goodSpaceShip; // start and end points of the blocker
var goodSpaceDistance; // blocker distance from left
var goodSpaceBeginning; // blocker distance from top
var goodSpaceEnd; // blocker bottom edge distance from top
var initialgoodSpaceVelocity; // initial blocker speed multiplier
var goodSpaceVelocity; // blocker speed multiplier during game

var badSpaceShip; // start and end points of the target
var badSpaceDistance; // target distance from left
var badSpaceBeginning; // target distance from top
var badSpaceEnd; // target bottom's distance from top
var pieceLength; // length of a target piece
var initialbadSpaceVelocity; // initial target speed multiplier
var badSpaceVelocity; // target speed multiplier during game
var circlesX; //contain the x cooardinate for the circles
var circlesY; //contain the y cooardinate for the circles

var lineWidth; // width of the target and blocker
var hitStates; // is each target piece hit?
var badSpacePiecesHit; // number of target pieces hit (out of 7)

var circleRadius;
var circleSpacingX ;
var circleSpacingY ;

var goodShoot;

var score;



// // variables for sounds
// var targetSound;
// var cannonSound;
// var blockerSound;

window.addEventListener("load", setupGame, false);

// called when the app first launches
function setupGame()
{
   // stop timer if document unload event occurs
   document.addEventListener( "unload", stopTimer, false );
   // get the canvas, its context and setup its click event handler
   canvas = document.getElementById( "theCanvas" );
   context = canvas.getContext("2d");

   // start a new game when user clicks Start Game button
   document.getElementById( "startButton" ).addEventListener( 
      "click", newGame, false );

   // JavaScript Object representing game items
   goodSpace = new Object(); // object representing good SpaceShip
   goodSpace.start = new Object(); // will hold x-y coords of good SpaceShip start
   goodSpace.end = new Object(); // will hold x-y coords of good SpaceShip end
   badSpace = new Object(); // object representing bad SpaceShip
   badSpace.start = new Object(); // will hold x-y coords of bad SpaceShip start
   badSpace.end = new Object(); // will hold x-y coords of bad SpaceShip end
   
   goodShot = new Object();
   badShot1 = new Object();
   badShot1.free=true;
   badShot2 = new Object();
   badShot2.free=true;


   // initialize hitStates as an array
   hitStates = new Array();
   circlesX = new Array();
   circlesY = new Array();

   for (let i = 0; i < 4; i++) {
    hitStates[i] = new Array();
  }


   // get sounds
//    targetSound = document.getElementById( "targetSound" );
//    cannonSound = document.getElementById( "cannonSound" );
//    blockerSound = document.getElementById( "blockerSound" );
} // end function setupGame

// set up interval timer to update game
function startTimer()
{
    window.addEventListener("keydown", keydownHandler, false );
    window.addEventListener("keydown", fireGoodshot, false);
    intervalTimer = window.setInterval( updatePositions, TIME_INTERVAL );
    intervalTimerBadShots = window.setInterval( fireBadShot, TIME_INTERVAL );

    document.addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });

    window.addEventListener("keyup", function(event) {
      if (event.keyCode == 32) { // spacebar released
    event.preventDefault(); // prevent default action
  }
    }, false);



} // end function startTimer

// terminate interval timer
function stopTimer()
{
   window.removeEventListener("keydown", keydownHandler, false );
   window.removeEventListener("keydown", fireGoodshot, false );
   window.clearInterval( intervalTimer );
   window.clearInterval( intervalTimerBadShots );
} // end function stopTimer


// called by function newGame to scale the size of the game elements
// relative to the size of the canvas before the game begins
function resetElements()
{
   var w = canvas.width;
   var h = canvas.height;
   canvasWidth = w; // store the width
   canvasHeight = h; // store the height

   shotRadius = w / 50; // Shot radius 1/36 canvas width
   shotSpeed = w * 3 / 2; // Shot speed multiplier
   badShotSpeed = shotSpeed/3;

   lineWidth = w / 24; 

   // configure instance variables related to the goodSpace

   goodSpaceDistance = w *4/ 10; // 1/4 canvas width from left
   goodSpaceBeginning = h * 19 / 20; // distance from bottom 1/4 canvas height
   goodSpaceEnd = h * 7 / 8; // distance from bottom 1/8 canvas height
   goodSpace.start.x = goodSpaceDistance;
   goodSpace.start.y = goodSpaceBeginning;
   goodSpace.end.x = w - goodSpaceDistance;
   goodSpace.end.y = goodSpaceBeginning;
   

   // configure instance variables related to the badSpace
   badSpaceDistance = w / 8; // distance from left 1/8 canvas width
   badSpaceBeginning = h / 8; // distance from top 1/8 canvas height
   badSpaceEnd = h / 3; // distance from top 1/4 canvas height    
   pieceLength = (badSpaceEnd - badSpaceBeginning) / TARGET_PIECES;
   initialbadSpacVelocity = -h / 4; // initial target speed multiplier
   badSpace.start.x = badSpaceDistance;
   badSpace.start.y = badSpaceBeginning;
   badSpace.end.x = w - badSpaceDistance;
   badSpace.end.y = badSpaceEnd;

  // Calculate the dimensions of each circle and the spacing between them
  circleRadius = pieceLength *1.5;
  circleSpacingX = (badSpace.end.x - badSpace.start.x - circleRadius) / 4.5;
  circleSpacingY = (badSpace.end.y - badSpace.start.y - 3 * circleRadius) / 4;
  
} // end function resetElements



// reset all the screen elements and start a new game
function newGame()
{
   resetElements(); // reinitialize all game elements
   stopTimer(); // terminate previous interval timer

    // set every element of hitStates to false--restores target pieces
    for (var i = 0; i < 4; ++i){
      for (var j = 0; j < 5; ++j){
        hitStates[i][j] = false; // circle piece not destroyed
      }
    }
    
   badSpacePiecesHit = 0; // no badSpace pieces have been hit
   badSpaceVelocity = initialbadSpacVelocity; // set initial velocity
   timeLeft = chosenTime*60 ; // start the countdown at 10 seconds
   timerCount = 0; // the timer has fired 0 times so far
   goodShotOnScreen = false; // the goodShoot is not on the screen
   badShot1.free = true; // the badShoot1 is not on the screen
   badShot2.free = true; // the badShoot2 is not on the screen
   strikes = 0; // set the initial number of strikes 
   timeElapsed = 0; // set the time elapsed to zero
   score=0

   startTimer(); // starts the game loop
} // end function newGame


// called every TIME_INTERVAL milliseconds
function updatePositions()
{
  
    //if bad shots exist and need to progress
    if (!badShot1.free){
        if (badShot1.y > canvas.height){
            badShot1.free=true;
        }
        // update position
        var interval = TIME_INTERVAL / 1000.0;
        badShot1.y += interval * badShotSpeed;

    }

    if (!badShot2.free){
        // update position
        if (badShot2.y > canvas.height){
            badShot2.free=true;
        }
        var interval = TIME_INTERVAL / 1000.0;
        badShot2.y += interval * badShotSpeed;

        }
    
   // update the badSpace's position
   var badSpaceUpdate = TIME_INTERVAL / 1000.0 * badSpaceVelocity;
   badSpace.start.x += badSpaceUpdate;
   badSpace.end.x += badSpaceUpdate;

   // if the badSpace hit the left or right, reverse direction
   if (badSpace.start.x < 0 || badSpace.end.x > canvasWidth)
        badSpaceVelocity *= -1;

   if (goodShotOnScreen) // if there is currently a shot fired
   {

      // update cannonball position
      var interval = TIME_INTERVAL / 1000.0;
        
      //goodShot.x -= interval * shotSpeed;
      goodShot.y -= interval * shotSpeed;

      if (goodShot.y < 0){
        goodShotOnScreen=false;
    }
    
    // check for collision with badspace 
    for (let row = 0; row < 4; row++) {
      if (goodShot.y+shotRadius <= circlesY[row]+circleRadius && goodShot.y+shotRadius >= circlesY[row]-circleRadius ){
        for (let col = 0; col < 5; col++) {
          if (goodShot.x <= circlesX[col]+circleRadius && goodShot.x >= circlesX[col]-circleRadius ){
            if (!hitStates[row][col]){
              hitStates[row][col]=true
              goodShotOnScreen=false;
              badSpacePiecesHit++;
              addscore(row);
            }
            }
        }
      }
      }

    // if (badSpacePiecesHit == 20)
    //         {
    //            stopTimer(); // game over so stop the interval timer
    //            draw(); // draw the game pieces one final time
    //            showGameOverDialog("You Won!"); // show winning dialog
    //         }

   } // end if

   ++timerCount; // increment the timer event counter

   // if one second has passed
   if (TIME_INTERVAL * timerCount >= 1000)
   {
      --timeLeft; // decrement the timer
      ++timeElapsed; // increment the time elapsed
      timerCount = 0; // reset the count
   } // end if

   draw(); // draw all elements at updated positions

   // if the timer reached zero
   if (timeLeft <= 0)
   {
      stopTimer();
      //showGameOverDialog("You lost"); // show the losing dialog
   } // end if
} // end function updatePositions

// draws the game elements to the given Canvas
function draw()
{
   canvas.width = canvas.width; // clears the canvas (from W3C docs)

   // display time remaining
   context.fillStyle = "black";
   context.font = "bold 24px serif";
   context.textBaseline = "top";
   let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let timeString = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    context.fillText("Time remaining: " + timeString, 5, 5);

    // display th score
    context.fillStyle = "black";
    context.font = "bold 24px serif";
    context.textBaseline = "top";
    context.fillText("Score: " + score, 250, 5);

   // if a cannonball is currently on the screen, draw it
   if (goodShotOnScreen)
   { 
      context.fillStyle = "gray";
      context.beginPath();
      context.arc(goodShot.x, goodShot.y, shotRadius, 0, Math.PI * 2);
      context.closePath();
      context.fill();
   } // end if

   if (!badShot1.free){
    context.fillStyle = "black";
    context.beginPath();
    context.arc(badShot1.x, badShot1.y, shotRadius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
   }

   if (!badShot2.free){
    context.fillStyle = "black";
    context.beginPath();
    context.arc(badShot2.x, badShot2.y, shotRadius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
   }

   // draw the goodspace
   context.beginPath(); // begin a new path
   context.moveTo(goodSpace.start.x, goodSpace.start.y); // path origin
   context.lineTo(goodSpace.end.x, goodSpace.end.y); 
   context.lineWidth = lineWidth; // line width
   context.strokeStyle = "purple"; // set stroke color
   context.lineCap = "round"; // line cap style
   context.stroke(); // draw path
   
    //draw the badspace
    context.beginPath();
    context.moveTo(badSpace.start.x, badSpace.start.y);
    context.lineTo(badSpace.end.x, badSpace.start.y);
    context.lineTo(badSpace.end.x, badSpace.end.y);
    context.lineTo(badSpace.start.x, badSpace.end.y);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    context.stroke()
    
    const colors = ['red', 'green', 'blue', 'yellow'];
    for (let row = 0; row < 4; row++) {
      const color = colors[row];
      for (let col = 0; col < 5; col++) {
        if (hitStates[row][col]) {
          continue;
        }
    
        // Calculate the center of the current circle
        const centerX = badSpace.start.x + circleRadius + col * (circleRadius  + circleSpacingX);
        const centerY = badSpace.start.y + circleRadius + row * (circleRadius  + circleSpacingY);
    
        // Draw the circle
        context.beginPath();
        context.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    
        // Push the X and Y values into their respective arrays
        if (row == 0) {
          circlesX[col]=centerX;
        }
        if (col == 0) {
          circlesY[row]=centerY;
        }
      }
    }
    
} // end function draw

function keydownHandler(event) {
    moveDistance=10
    switch(event.keyCode) {
        case 37: // Left arrow key
          // Move goodspace to the left
          if (goodSpace.start.x - moveDistance >= 10) {
            goodSpace.start.x -= moveDistance;
            goodSpace.end.x -= moveDistance;
          }
          break;
        case 39: // Right arrow key
          // Move goodspace to the right
          if (goodSpace.end.x + moveDistance <= canvas.width -10 ) {
            goodSpace.start.x += moveDistance;
            goodSpace.end.x += moveDistance;
          }
          break;
        case 38: // Up arrow key
          // Move goodspace up
          if (goodSpace.start.y - moveDistance >= canvas.height*0.6) {
            goodSpace.start.y -= moveDistance;
            goodSpace.end.y -= moveDistance;
          }
          break;
        case 40: // Down arrow key
          // Move goodspace down
          if (goodSpace.end.y + moveDistance <= canvas.height-10) {
            goodSpace.start.y += moveDistance;
            goodSpace.end.y += moveDistance;
          }
          break;
      }
  }

  
  function fireGoodshot(event){
    if(event.keyCode ==  chosenShootingKey){
        if (goodShotOnScreen) // if a cannonball is already on the screen
            return; // do nothing

        goodShot.y = goodSpace.end.y + shotRadius; // align x-coordinate 
        goodShot.x = goodSpace.start.x + (goodSpace.end.x - goodSpace.start.x)/2; // centers ball vertically

        goodShotOnScreen = true; // the cannonball is on the screen
        ++shotsFired; // increment shotsFired
        // play cannon fired sound
        //cannonSound.play();

     }
}

function fireBadShot(){
    function randnum(maxLimit){
        let rand = Math.random() * maxLimit;      
        rand = Math.floor(rand); 
      
        return rand;
      }

    let res = randnum(101);
    if (res==91){
        if (badShot1.free==true || badShot2.free==true){
            let col = randnum(5);
            let row = randnum(4);
            if (badShot1.free==true){
            badShot1.x = badSpace.start.x + circleRadius + col * (circleRadius  + circleSpacingX);
            badShot1.y = badSpace.start.y + circleRadius + row * (circleRadius  + circleSpacingY);
            badShot1.free=false;
            }
            else{
            badShot2.x = badSpace.start.x + circleRadius + col * (circleRadius  + circleSpacingX);
            badShot2.y = badSpace.start.y + circleRadius + row * (circleRadius  + circleSpacingY);
            badShot2.free=false;
            }
    }
    }
}

function addscore(row){
  const rowScores = [20, 15, 10, 5]; 
  const rowScore = rowScores[row]; // get the score value for the given row
  score += rowScore; // add the row score to the overall score
}