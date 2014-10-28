// Returns "black" or "white" given a hex color description.
// The returned color will contrast with the given color.
function GetContrast50(hexColor){
  var hexNumber = hexColor.replace("#", "0x");
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

  this.AttachHandlerAndSetColor = function() {
    // Save 'this' in a var so that it can be accessed
    // when jquery calls the handler.
    var thisObject = this;
    this.pointSpan = $(".clicks" + this.number)
    $("#counter" + this.number).on("click", function() {
     thisObject.IncrementNumber(); })
    // Set the background color of the text.
    $(".player" + this.number).css("color", GetContrast50(this.color));
  }
}

function SelectNumPlayers() {

}

// We will create the players programmatically, based on the selected number of players.
// We will also allow the user to select the colors for each player.
// We can create a player factor object that will create the players
// given the selected parameters.
var player1 = new Player(1, "#FF0000");
var player2 = new Player(2, "#0000FF");

$(document).ready(function(){
  player1.AttachHandlerAndSetColor();
  player2.AttachHandlerAndSetColor();
});