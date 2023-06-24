import Cell from "./Cell.js"
export default class Grid {
    #cells
    constructor(gridElement) {
        this.#cells = createGameBoard(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index % 7, Math.floor(index / 7))
        })
    }

    get cells() {
        return this.#cells;
    }
    //This function serves to get all cells in a column in reverse order, so we can search in a top-bottom fashion.
    #getAllCellsInAColumn(columnNumber) {
        return [...this.#cells].filter((cell) => {
            return cell.x === columnNumber;
        }).reverse();
    }

    canPlacePieceInRow(columnNumber) {
        return this.#getAllCellsInAColumn(columnNumber).some((cell) => {
            return cell.gamePiece == null
        })
    }

    getNextOpenSpotInColumn(columnNumber) {
        let cellsInColumn = this.#getAllCellsInAColumn(columnNumber);
        for(let i = 0; i < cellsInColumn.length; i++) {
            if(cellsInColumn[i].gamePiece == null) {
                return cellsInColumn[i];
            }
        }

    }


}

function createGameBoard(gridElement) {
    let cellElements = [];
    for(let i = 0; i < 42; i++) {
        let cellElement = document.createElement("div");
        cellElement.classList.add("game-cell");
        cellElement.setAttribute("column", `${Math.floor(i % 7)}`);
        gridElement.appendChild(cellElement);
        cellElements.push(cellElement);
    }
    return cellElements;
}