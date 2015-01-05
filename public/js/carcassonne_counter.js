var colorHexes = {
  red: "#FF0000",
  blue: "#0000FF",
  grey: "#808080",
  black: "#000000",
  green: "#009900",
  yellow: "#FFFF00"
},
  playersArray = [], 
  colorsArray = [],
  gameId = 0;

// Returns "black" or "white" given a hex color description.
// The returned color will contrast with the given color.
function getTextColor(backgroundColor){
  var hexNumber = colorHexes[backgroundColor].replace("#", "0x");
  return (parseInt(hexNumber, 16) > 0xffffff/2) ? 'black':'white';
}

// The color must be in hex ("#00FF00")
function Player(number, color) {
  this.number = number;
  this.color = color;
  this.points = 0;
  this.pointSpan = $(".clicks" + this.number)
}

Player.prototype = {
  incrementNumber: function(){
    this.points += 1;
    this.pointSpan.html(this.points);
    saveGame();
  },
  decrementNumber: function(){
    if(this.points == 0){
      return;
    }
    this.points -= 1;
    this.pointSpan.html(this.points);
    saveGame();
  },
  setHTMLColor: function(){
    // Set the background color of the text.
    $(".player" + this.number).css("color", getTextColor(this.color));
    $(".player" + this.number).css("background-color", this.color);
    console.log("Setting color of .player" + this.number + " to " + this.color);
  },
  setHTMLNumber: function() {
    this.pointSpan.html(this.points);
  },
  attachClickHandler: function(){
    // We use the jquery.finger plugin to detect "tap" events.
    // On iOS (both Mobile Safari and Mobile Chrome), double-tapping an
    // element does not fire two click events, even if page zoom is disabled.
    // We treat both tap and double-tap the same (a double-tap is always
    // preceeded by a tap).
    $(".player" + this.number).on("tap", function() {
      this.incrementNumber(); }.bind(this));
    $(".player" + this.number).on("doubletap", function() {
      this.incrementNumber(); }.bind(this));
    $(".player" + this.number).on("flick", function() {
      this.decrementNumber(); }.bind(this));
  }
}

function resetGame() {
  // Build colorsArray.
  selectColors();
  console.log("colors: " + colorsArray);
  // Delete the players and create new ones.
  while (playersArray.length) {
    playersArray.pop();
  }
  createPlayers(colorsArray.length, colorsArray);
  setGameId();  // resetGame creates a new game, so the gameId needs to be reset
}

function setResetHandler() {
  $(".reset").on("click", resetGame);
}

function setLayout(numOfPlayers) {
  // Hide all the other layouts, and display the right one for this number of players.
  $(".layout-container").css("display", "none");
  $("#container" + numOfPlayers).css("display", "block");
}

function selectColors() {
  // Reset colors array to the selected colors.
  var selectedColors = $("input:checked");
  colorsArray = [];
  for (var i = 0, numColors = selectedColors.length; i < numColors; i++) {
    colorsArray.push(selectedColors[i].value);
  };
}

function createPlayers(numOfPlayers, colors) {
  for (var i = 0; i < numOfPlayers; i++) {
    playersArray.push(new Player(i, colors[i]));
    playersArray[i].attachClickHandler();
    playersArray[i].setHTMLColor();
    playersArray[i].setHTMLNumber();
    console.log("Created player " + i + " of color " + colors[i]);
  };
  setLayout(numOfPlayers);
}

function setGameId() {
  gameId = Date.now();
}

function saveGame() {
  //game id, num players, scores
  $.ajax({
    type: "POST",
    url: '/save_game',
    dataType: "json",
    data: { 
      game_id: gameId, 
      num_players: playersArray.length,
      player_1_score: playersArray[0].points,
      player_2_score: playersArray[1].points,
      player_3_score: playersArray.length >= 3 ? playersArray[2].points : 0,
      player_4_score: playersArray.length >= 4 ? playersArray[3].points : 0,
      player_5_score: playersArray.length >= 5 ? playersArray[4].points : 0,
      player_6_score: playersArray.length >= 6 ? playersArray[5].points : 0
    }
  });
}

$(document).ready(function() {
  setGameId();
  selectColors();
  createPlayers(colorsArray.length, colorsArray);
  setResetHandler();
});
