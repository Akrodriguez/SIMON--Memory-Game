  var buttonColors = ["red", "blue", "green", "yellow"];     // Array of button colors
 
  var started = false;  // Game not started yet
  
  var level = 0;           // Current level of the game

  var userClickedPattern = [];            // Array to store user clicks

  var gamePattern = [];                // Array to store the game pattern

  $(document).keydown(function() {           // Event listener for keydown event

    if(!started) 
    {
      $("#level-title").text("Level " + level);          // Update the title with the current level
      nextSequence();                                     // Call the nextSequence function to start the game
      started = true;                                     // Set started to true to indicate the game has started
    }
  });


  // Event listener for button clicks
$(".btn").click(function() {

  var chosenColor = $(this).attr("id");             // Get the ID of the clicked button

  console.log("Chosen Color:", chosenColor);            
  
  userClickedPattern.push(chosenColor);

  playSound(chosenColor);

  animatePress(chosenColor);    

  checkAnswer(userClickedPattern.length - 1);  // Call animatePress function to animate the button press

});  


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {

  userClickedPattern = [];                // Reset userClickedPattern for the new level
  level++;

  $("#level-title").text("Level " + level);                  // Update the title with the current level

    var randomNumber = Math.floor(Math.random() * 4);                 // Generate a random number between 0 and 3
    var randomChosenColor = buttonColors[randomNumber];               // Randomly chosen color from buttonColors

    // (Optional) Log it to check the value
    console.log("Random Number:", randomNumber);

   gamePattern.push(randomChosenColor);                            // Add the random color to the game pattern 

// Animate flash
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);        // Flash the button with the chosen color

playSound(randomChosenColor);

}

function animatePress(currentColor) {
  
  $("#" + currentColor).addClass("pressed");                        // Add pressed class to the button

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function startOver() {
  level = 0;                     // Reset level to 0
  gamePattern = [];              // Reset gamePattern to an empty array 
  started = false;               // Reset started to false
}