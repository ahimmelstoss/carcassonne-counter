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
function GetTextColor(backgroundColor){
  var hexNumber = backgroundColor.replace("#", "0x");
  return (parseInt(hexNumber, 16) > 0xffffff/2) ? 'black':'white';
}

// The color must be in hex ("#00FF00")
function Player(number, color) {
  this.number = number;
  this.color = color;
  this.points = 0;

  this.IncrementNumber = function() {
    this.points += 1;
    this.pointSpan.html(this.points);
  }

  this.ResetScore = function() {
    this.points = 0;
    this.pointSpan.html(this.points);
  }

  this.AttachHandlerAndSetColor = function() {
    // Save 'this' in a var so that it can be accessed when jquery calls the handler.
    var thisObject = this;
    this.pointSpan = $(".clicks" + this.number)
    $(".player" + this.number).on("click", function() {
      thisObject.IncrementNumber(); })
    // Set the background color of the text.
    $(".player" + this.number).css("color", GetTextColor(this.color));
    $(".player" + this.number).css("background-color", this.color);
  }
}

function ResetGame() {
  // reset players points
  for (var i = 0; i < playersArray.length; i++) {
    playersArray[i].ResetScore();
  };
}

function SetResetHandler() {
  $(".reset").on("click", ResetGame);
}

function SelectColors() {
  var selectedColors = $("input:checked");
  for (var i = 0; i < selectedColors.length; i++) {
    colorsArray.push(selectedColors[i].value);
  };
  // on click of checkboxes, reset colors array and players array to represent the checked things
}

function CreatePlayers(numOfPlayers, colors) {
  for (var i = 0; i < numOfPlayers; i++) {
    playersArray.push(new Player(i, colors[i]));
  };
  // Hide all the other layouts, and display the right one for this number of players.
  $(".layout-container").css("display", "none");
  $("#container" + numOfPlayers).css("display", "block");
}

$(document).ready(function(){
  SelectColors();
  CreatePlayers(colorsArray.length, colorsArray);
  for (var i = 0; i < playersArray.length; i++) {
    playersArray[i].AttachHandlerAndSetColor();
  };
  SetResetHandler();
});
