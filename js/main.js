import Grid from "./Grid.js";
import GamePiece from "./GamePiece.js";

let gameBoardElement = document.getElementById("game-board");
const grid = new Grid(gameBoardElement);


let playerTurnColor = "red";
let playerIndicatorTextElement = document.getElementById("player-indicator-h1")
let currentPlayerText = `Player ${playerTurnColor === "red" ? "One" : "Two"}`
let playerIndicatorSquareElement = document.getElementById("player-indicator-square");


handlePlayerIndicators();


gameBoardElement.addEventListener("click", handlePieceDrop, {once: true});

async function handlePieceDrop(e) {
    let clickedColumnNumber = parseInt(e.target.getAttribute("column"));

    if (isNaN(clickedColumnNumber)) {
       addClickHandlerToBoard();
    }

    if (!grid.canPlacePieceInRow(clickedColumnNumber)){
        addClickHandlerToBoard();
        return;
    }

    let nextEmptyCell = grid.getNextOpenSpotInColumn(clickedColumnNumber);
    let newPiece = new GamePiece(playerTurnColor, gameBoardElement);
    newPiece.x = nextEmptyCell.x;
    newPiece.y = 0;
    if (nextEmptyCell.y !== 0) {
        setTimeout(() => {
            nextEmptyCell.gamePiece = newPiece;
        }, 1)
        await newPiece.waitForTransitionEnd();
    } else {
        nextEmptyCell.gamePiece = newPiece;
    }
    newPiece.gamePieceElement.style.setProperty("--t", "1s");
    await newPiece.waitForAnimationEnd()
    if (!grid.gameOver()) {
        addClickHandlerToBoard();
        playerTurnColor = playerTurnColor === "red" ? "blue" : "red";
        handlePlayerIndicators();
    } else {
        await handleWinAnimations();
        alert(`${currentPlayerText} Wins!`)
    }
}

function addClickHandlerToBoard() {
    gameBoardElement.addEventListener("click", handlePieceDrop, {once: true});
}

function handlePlayerIndicators() {
    currentPlayerText = `Player ${playerTurnColor === "red" ? "One" : "Two"}`
    playerIndicatorTextElement.innerHTML = currentPlayerText;
    playerIndicatorSquareElement.style.background = playerTurnColor;
}

function handleWinAnimations() {
    return new Promise ((resolve) => {
        let playIndicatorContainer = document.getElementById("player-indicator-container");
        playIndicatorContainer.style.animation = "shake 1s ease infinite";
        grid.winningGamePieces.forEach((gamePieceElement) => {
            gamePieceElement.addEventListener("animationstart", resolve, {once: true})
            gamePieceElement.style.animation = "flash 1000ms ease infinite alternate";
        })
    })
}