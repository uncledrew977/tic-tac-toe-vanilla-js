import Grid from "./Grid.js";
import GamePiece from "./GamePiece.js";

let gameBoardElement = document.getElementById("game-board");
const grid = new Grid(gameBoardElement);

let playerTurnColor = "red";

gameBoardElement.addEventListener("click", handlePieceDrop, {once: true});

async function handlePieceDrop(e) {
    let clickedColumnNumber = parseInt(e.target.getAttribute("column"));
    if (isNaN(clickedColumnNumber)) {
        gameBoardElement.addEventListener("click", handlePieceDrop, {once: true});
    }
    if (!grid.canPlacePieceInRow(clickedColumnNumber)) return;
    let nextEmptyCell = grid.getNextOpenSpotInColumn(clickedColumnNumber);
    let newPiece = new GamePiece(playerTurnColor, gameBoardElement);
    newPiece.x = nextEmptyCell.x;
    newPiece.y = 0;
    if (nextEmptyCell.y !== 0) {
        setTimeout(() => {
            nextEmptyCell.gamePiece = newPiece;
        }, 1)
        await newPiece.waitForTransitionEnd();
    }
    newPiece.gamePieceElement.style.setProperty("--t", "1s");
    await newPiece.waitForAnimationEnd()
    if (!grid.gameOver()) {
        gameBoardElement.addEventListener("click", handlePieceDrop, {once: true});
        playerTurnColor = playerTurnColor === "red" ? "blue" : "red";
    } else {
        alert(`Player ${playerTurnColor === "red" ? "One" : "Two"} (${playerTurnColor}) wins!`)
    }


}