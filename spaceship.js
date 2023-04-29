var users={
    "p": "testuser",
};

var page;
var records;
var ifConf=false;

function showPage(pageId) {
    var pages = ['login', 'register','welcome', 'game', 'configuration'];
    for (var i = 0; i < pages.length; i++) {
        page = document.getElementById(pages[i]);
        if (pages[i] === pageId) {
            page.style.display = 'block';
            if (pageId=='configuration'){
              if(ifConf){
                resetConf();}
              console.log("listner on");
              document.addEventListener("keydown", Message ,false);}
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
    //var regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    var regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
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
    if (document.getElementById("name").value == "" || document.getElementById("last-name").value == "" || document.getElementById("email").value == "" || document.getElementById("password").value == ""){
        alert("Please fill all fields.");
        return;
    }

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
      alert("Please enter a valid password with at least 1 letter character and at least 1 digit character.");
      return;
      }

    if (!arePassSame(document.getElementById("confirm-password").value, document.getElementById("password").value)) {
      alert("Please make sure your passwords match.");
      return;
      }

      users[document.getElementById("username").value] = document.getElementById("password").value;



    showPage('welcome')
    document.getElementById("username").value="";
    document.getElementById("name").value="";
    document.getElementById("last-name").value="";
    document.getElementById("email").value="";
    document.getElementById("password").value="";
    document.getElementById("confirm-password").value="";
    document.getElementById("birthdate").value="";

}

function loginGame(){
    username=document.getElementById("reg_username").value
    document.getElementById("reg_username").value = "";
    password=document.getElementById("reg_password").value
    document.getElementById("reg_password").value = "";
    if (username == "" || password== "" ){
      alert("Please fill all fields.");
      return;
    }
    if (!(username in users)) {
        alert("The username you entered dosent exist.");
        return; 
    }
    else if(!(users[username]==password)){
        alert("Password is not correct.");
        return;   
    }
    records = [];
    showPage('configuration')
}



var chosenShootingKey;
var chosenTime;

function Message(event) {
  ifConf=true;
  if (event.keyCode == 32 || // space bar
    (event.keyCode >= 65 && event.keyCode <= 90)) { // letters A-Z
      // update the shooting key variable
      chosenShootingKey = event.keyCode;
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
      console.log("listner off");
  } else {
    alert("Please choose a key that is either the space bar or one of the letters");
    return; 
  }
}

function resetConf(){
  message = document.getElementById("message");
  message.style.display = 'block';
  const label = document.querySelector('label[for="minutes"]');
  const input = document.getElementById('minutes');
  const start = document.getElementById('start');
  label.style.display = 'none';
  input.style.display = 'none';
  start.style.display = 'none';
}

function doneConf() {
  chosenTime = document.getElementById('minutes').value;
  if (chosenTime<2){
    alert("The minimum is 2 minuets");
    return; 
  }
  if (chosenTime != parseInt(chosenTime, 10)){
    alert("Please insert the number of minutes");
    return; 
  }
  else{
    document.getElementById('minutes').value = "";
    showPage('game')
  }
}



// ------------------------------------- code from cannon -------------------------------------------------------------------------------
var canvas; // the canvas
var context; // used for drawing on the canvas

var TARGET_PIECES = 20; // sections in the target
//var MISS_PENALTY = 2; // seconds deducted on a miss
//var HIT_REWARD = 3; // seconds added on a hit
var TIME_INTERVAL = 15; // screen refresh interval in milliseconds
var life = 3;

// variables for the game loop and tracking statistics
var intervalTimer; // holds interval timer
var intervalTimerBadShots;
var intervalBadSpaceSpeed; // interval timer for bad space ships speed
var intervalMusic;
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
var speedUpRound = 0;

var targetSound;
var cannonSound;
var goodSpaceHitSound;
var backMusic;
var draw_back;



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
   badShot1.hit = false;
   badShot2 = new Object();
   badShot2.free=true;
   badShot2.hit = false;


   // initialize hitStates as an array
   hitStates = new Array();
   circlesX = new Array();
   circlesY = new Array();

   for (let i = 0; i < 4; i++) {
    hitStates[i] = new Array();
  }


   // get sounds
    targetSound = document.getElementById( "targetSound" );
    cannonSound = document.getElementById( "cannonSound" );
    goodSpaceHitSound = document.getElementById( "goodSpaceHitSound" );
    backMusicSound = document.getElementById("backMusicSound");
    draw_back = true;

} // end function setupGame

// set up interval timer to update game
function startTimer()
{
    window.addEventListener("keydown", keydownHandler, false );
    window.addEventListener("keydown", fireGoodshot, false);
    intervalTimer = window.setInterval( updatePositions, 10 );
    intervalTimerBadShots = window.setInterval( fireBadShot, TIME_INTERVAL );
    intervalBadSpaceSpeed = window.setInterval( speedUp, 5000 );
    intervalMusic = window.setInterval(backMusicSound.play(), 39000);


    //dont do nothing if i press enter
    document.addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault(); // prevent default action
      }
    });
    //dont do nothing if i press space
    window.addEventListener("keyup", function(event) {
      if (event.keyCode == 32) { 
    event.preventDefault(); // prevent default action
  }
    }, false);

    //stopping the game if one of this 2 buttons are pressed
    const menuDiv = document.getElementById("menu");
    const registerLink = menuDiv.getElementsByTagName("a")[0];
    const loginLink = menuDiv.getElementsByTagName("a")[1];

    loginLink.addEventListener("click", stopTimer);
    registerLink.addEventListener("click", stopTimer);



} // end function startTimer

// terminate interval timer
function stopTimer()
{
   window.removeEventListener("keydown", keydownHandler, false );
   window.removeEventListener("keydown", fireGoodshot, false );
   window.clearInterval( intervalTimer );
   window.clearInterval( intervalTimerBadShots );
   window.clearInterval( intervalBadSpaceSpeed);
   window.clearInterval(intervalMusic);
   backMusicSound.pause();

} // end function stopTimer



// called by function newGame to scale the size of the game elements
// relative to the size of the canvas before the game begins
function resetElements()
{
   document.getElementById("my-table").style.display = "none";
   life = 3;
   backMusicSound.currentTime = 0;
   speedUpRound = 0;
   draw_back =true;
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
   initialbadSpacVelocity = -h / 6; // initial target speed multiplier
   badSpace.start.x = badSpaceDistance;
   badSpace.start.y = badSpaceBeginning;
   badSpace.end.x = w - badSpaceDistance;
   badSpace.end.y = badSpaceEnd;

  // Calculate the dimensions of each circle and the spacing between them
  circleRadius = pieceLength *1.5;
  circleSpacingX = (badSpace.end.x - badSpace.start.x - circleRadius) / 4.5;
  circleSpacingY = (badSpace.end.y - badSpace.start.y - 3 * circleRadius) / 4;

  badShot1.hit = false;
  badShot2.hit = false;

  
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
   life = 3;

   startTimer(); // starts the game loop
} // end function newGame

function gotostartpoint(){
    var w = canvas.width;
    var h = canvas.height;
    canvasWidth = w; // store the width
    canvasHeight = h; // store the height
    // configure instance variables related to the goodSpace
 
    goodSpaceDistance = w *4/ 10; // 1/4 canvas width from left
    goodSpaceBeginning = h * 19 / 20; // distance from bottom 1/4 canvas height
    goodSpaceEnd = h * 7 / 8; // distance from bottom 1/8 canvas height
    goodSpace.start.x = goodSpaceDistance;
    goodSpace.start.y = goodSpaceBeginning;
    goodSpace.end.x = w - goodSpaceDistance;
    goodSpace.end.y = goodSpaceBeginning;
}
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
      // update position
      var interval = TIME_INTERVAL / 1000.0;
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
              targetSound.play();
            }
            }
        }
      }
      }

    if (badSpacePiecesHit == 20)
            {
               showTable();
               stopTimer(); // game over so stop the interval timer
               draw(); // draw the game pieces one final time
               showGameOverDialog("Champion!"); // show winning dialog
            }

   } // end if

    // check for hit by badshot1 & 2
    if (!badShot1.free && goodSpace.start.x <= badShot1.x && badShot1.x <= goodSpace.end.x){
        if (!badShot1.free && !badShot1.hit &&badShot1.y>= goodSpace.start.y){
            life--;
            badShot1.hit = true;
            badShot1.free = true;
            goodSpaceHitSound.play();
            gotostartpoint();
        }
    }

    if (!badShot2.free && goodSpace.start.x <= badShot2.x && badShot2.x <= goodSpace.end.x){
        if (!badShot2.free && !badShot2.hit && badShot2.y>= goodSpace.start.y){
            life--;
            badShot2.hit = true;
            badShot2.free = true;
            goodSpaceHitSound.play();
            gotostartpoint();
        }
    }


   if (life==0){
    showTable();
    stopTimer(); // game over so stop the interval timer
    draw(); // draw the game pieces one final time
    showGameOverDialog("You Lost"); // show winning dialog
   }

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
      if (score < 100){ 
        showTable();
        showGameOverDialog("you can do better")}
      else{ 
        showTable();
        showGameOverDialog("Winner!")}
   } // end if
} // end function updatePositions

// draws the game elements to the given Canvas
function draw()
{

    let backgroundImage = new Image();
    backgroundImage.src = "https://raw.githubusercontent.com/Web-Development-Environments-2023/assignment2-318190253_206921116/main/smallback.jpg";
  
    // Draw the background image once it has loaded
    backgroundImage.onload = function() {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


   // display time remaining
   context.fillStyle = "white";
   context.font = "bold 24px serif";
   context.textBaseline = "top";
   let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let timeString = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    context.fillText("Time remaining: " + timeString, 5, 5);

    // display th score
    context.fillStyle = "white";
    context.font = "bold 24px serif";
    context.textBaseline = "top";
    context.fillText("Score: " + score, 250, 5);

    // display life
    context.fillStyle = "white";
    context.font = "bold 24px serif";
    context.textBaseline = "top";
    context.fillText("lives: " + life, 350, 5);

   // if a cannonball is currently on the screen, draw it
   if (goodShotOnScreen)
   { 
      context.fillStyle = "white";
      context.beginPath();
      context.arc(goodShot.x, goodShot.y, shotRadius, 0, Math.PI * 2);
      context.closePath();
      context.fill();
   } // end if

   if (!badShot1.free){
    context.fillStyle = "orange";
    context.beginPath();
    context.arc(badShot1.x, badShot1.y, shotRadius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
   }

   if (!badShot2.free){
    context.fillStyle = "orange";
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
    context.fillStyle = 'rgba(0, 0, 0, 0)'; 
    context.fill(); 
    
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
    
}} // end function draw

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
        cannonSound.play();

     }
}

function fireBadShot(){
    function randnum(maxLimit){
        let rand = Math.random() * maxLimit;      
        rand = Math.floor(rand); 
      
        return rand;
      }

    let res = randnum(101);
    if (res>95){
        if (badShot1.free==true || badShot2.free==true){
            let col = randnum(5);
            let row = randnum(4);
            if (hitStates[row][col]){
                return;
            }
            //if (!badShot1.free && badShot1)
            if (badShot1.free==true){
                if (!badShot2.free && badShot2.y <= canvas.height*0.75){
                    return;
                }
            badShot1.x = badSpace.start.x + circleRadius + col * (circleRadius  + circleSpacingX);
            badShot1.y = badSpace.start.y + circleRadius + row * (circleRadius  + circleSpacingY);
            badShot1.free=false;
            badShot1.hit = false;
            }
            else{
                if (badShot1.y > canvas.height*0.75){
                    badShot2.x = badSpace.start.x + circleRadius + col * (circleRadius  + circleSpacingX);
                    badShot2.y = badSpace.start.y + circleRadius + row * (circleRadius  + circleSpacingY);
                    badShot2.free=false;
                    badShot2.hit = false;
                }
            }
    }
    }
}

function addscore(row){
  const rowScores = [20, 15, 10, 5]; 
  const rowScore = rowScores[row]; // get the score value for the given row
  score += rowScore; // add the row score to the overall score
}

function showGameOverDialog(message)
{
   alert(message + "\nFinal Score: " + score + 
      "\nTotal time: " + timeElapsed + " seconds ");
} // end function showGameOverDialog

function speedUp(){
    if (speedUpRound < 4){
        speedUpRound++;
        badSpaceVelocity = 1.3*badSpaceVelocity;
    }
}




// Initially hide the table
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("my-table").style.display = "none";
    let table = document.getElementById("my-table");});


function showTable(){
    records.push(score);
    records.sort(function(a, b) {
        return a - b;
      });
    records.reverse();
    let table = document.getElementById("my-table");
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    document.getElementById("my-table").style.display = "table";
    for (var i=0; i < records.length; i++){
        let newRow = table.insertRow();

        let indexCell = newRow.insertCell();
        indexCell.innerText = i+1;
        
        let valueCell = newRow.insertCell();
        valueCell.innerText = records[i];
        if (records[i]==score){
            newRow.style.backgroundColor = "pink";
            indexCell.style.color = "gray";
            valueCell.style.color = "gray";
            }
        
    }
    console.log("done with table");
}

