var colorHexes = {
  red: "#FF0000",
  blue: "#0000FF",
  grey: "#808080",
  black: "#000000",
  green: "#009900",
  yellow: "#FFFF00"
};
var playersArray = [];
var colorsArray = [];

// Returns "black" or "white" given a hex color description.
// The returned color will contrast with the given color.
function getTextColor(backgroundColor){
  var hexNumber = backgroundColor.replace("#", "0x");
  return (parseInt(hexNumber, 16) > 0xffffff/2) ? 'black':'white';
}

// The color must be in hex ("#00FF00")
function Player(number, color) {
  this.number = number;
  this.color = color;
  this.points = 0;
}

Player.prototype.incrementNumber = function() {
  this.points += 1;
  this.pointSpan.html(this.points);
}

Player.prototype.resetScore = function() {
  this.points = 0;
  this.pointSpan.html(this.points);
}

Player.prototype.attachHandlerAndSetColor = function() {
  this.pointSpan = $(".clicks" + this.number)
  $(".player" + this.number).on("click", function() {
    this.incrementNumber(); }.bind(this))
  // Set the background color of the text.
  $(".player" + this.number).css("color", getTextColor(this.color));
  $(".player" + this.number).css("background-color", this.color);
}

function resetGame() {
  // reset players points
  for (var i = 0; i < playersArray.length; i++) {
    playersArray[i].resetScore();
  };
}

function setResetHandler() {
  $(".reset").on("click", resetGame);
}

function selectColors() {
  var selectedColors = $("input:checked");
  for (var i = 0; i < selectedColors.length; i++) {
    colorsArray.push(selectedColors[i].value);
  };
  // on click of checkboxes, reset colors array and players array to represent the checked things
}

function createPlayers(numOfPlayers, colors) {
  for (var i = 0; i < numOfPlayers; i++) {
    playersArray.push(new Player(i, colors[i]));
  };
  // Hide all the other layouts, and display the right one for this number of players.
  $(".layout-container").css("display", "none");
  $("#container" + numOfPlayers).css("display", "block");
}

$(document).ready(function(){
  selectColors();
  createPlayers(colorsArray.length, colorsArray);
  for (var i = 0; i < playersArray.length; i++) {
    playersArray[i].attachHandlerAndSetColor();
  };
  setResetHandler();
});
