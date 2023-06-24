import Grid from "./Grid.js";
import GamePiece from "./GamePiece.js";

//TODO: Fix css positioning styling (x and y) maybe by making the piece so big that it doesn't really matter the position, just make it behind blue background.
//TODO: Implement check for Win

let gameBoardElement = document.getElementById("game-board");
const grid = new Grid(gameBoardElement);

let playerTurnColor = "blue";

gameBoardElement.addEventListener("click", handlePieceDrop, {once: true});

async function handlePieceDrop(e) {
   let clickedColumnNumber = parseInt(e.target.getAttribute("column"));
   if(!grid.canPlacePieceInRow(clickedColumnNumber)) return;
   let nextEmptyCell = grid.getNextOpenSpotInColumn(clickedColumnNumber);
   let newPiece = new GamePiece(playerTurnColor,gameBoardElement);
   newPiece.x = nextEmptyCell.x;
   newPiece.y = 0;
   if(nextEmptyCell.y !== 0)  {
      setTimeout(() => {
         nextEmptyCell.gamePiece = newPiece;
      },1)
      await newPiece.waitForTransitionEnd();
   }
   gameBoardElement.addEventListener("click", handlePieceDrop, {once: true});
   playerTurnColor = playerTurnColor === "blue" ? "red" : "blue";


}