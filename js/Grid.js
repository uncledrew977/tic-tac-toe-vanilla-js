import Cell from "./Cell.js"

const MAX_X = 6;
const MAX_Y = 5;
export default class Grid {
    #cells

    constructor(gridElement) {
        this.#cells = createGameBoard(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index % 7, Math.floor(index / 7))
        })
    }

    //This function serves to get all cells in a column in reverse order, so we can search in a top-bottom fashion.
    #getAllCellsInAColumn(columnNumber) {
        return [...this.#cells].filter((cell) => {
            return cell.x === columnNumber;
        }).reverse();
    }

    #getCellsByRow() {
        return this.#cells.reduce((rows, cell) => {
            rows[cell.y] = rows[cell.y] || [];
            rows[cell.y][cell.x] = cell;
            return rows;
        }, [])
    }

    #getCellsByColumns() {
        return this.#cells.reduce((columns, cell) => {
            columns[cell.x] = columns[cell.x] || [];
            columns[cell.x][cell.y] = cell;
            return columns;
        }, [])
    }

    canPlacePieceInRow(columnNumber) {
        return this.#getAllCellsInAColumn(columnNumber).some((cell) => {
            return cell.gamePiece == null
        })
    }

    getNextOpenSpotInColumn(columnNumber) {
        let cellsInColumn = this.#getAllCellsInAColumn(columnNumber);
        for (let i = 0; i < cellsInColumn.length; i++) {
            if (cellsInColumn[i].gamePiece == null) {
                return cellsInColumn[i];
            }
        }

    }

    gameOver() {
        return this.#checkForStraightWin(this.#getCellsByRow()) || this.#checkForStraightWin(this.#getCellsByColumns()) || this.#checkForDiagonalWin(this.#getCellsByColumns())

    }

    #checkForStraightWin(cells) {
        let didWin = false;
        cells.forEach((row) => {
            for (let i = 0; i < row.length; i++) {
                let gamePieceOne = row[i].gamePiece;
                if (gamePieceOne == null) continue;
                let count = 1;
                for (let j = i + 1; j < row.length; j++) {
                    let gamePieceTwo = row[j].gamePiece;
                    if (gamePieceTwo == null) break;
                    else if (gamePieceOne.color === gamePieceTwo.color) {
                        count++;
                        if (count === 4) {
                            didWin = true;
                        }
                    } else break;
                }
            }
        })
        return didWin;
    }

    #checkForDiagonalWin(cells) {
        return this.#checkForwardDiagonal(cells) || this.#checkBackwardDiagonal(cells);
    }

    #checkForwardDiagonal(cells) {
        let didWin = false;
        cells.forEach((row) => {
            for (let i = 0; i < row.length; i++) {
                let cell = row[i];
                let gamePieceOne = cell.gamePiece;
                if (gamePieceOne == null) continue;
                let nextX = cell.x + 1;
                let nextY = cell.y + 1;
                let count = 1;
                while (nextX <= MAX_X && nextY <= MAX_Y) {
                    let gamePieceTwo = cells[nextX][nextY].gamePiece
                    if (gamePieceTwo == null) break;
                    if (gamePieceTwo.color === gamePieceOne.color) {
                        count++;
                        if (count === 4) {
                            didWin = true;
                            break;
                        }
                        nextX++;
                        nextY++;
                    } else {
                        break;
                    }
                }
            }
        })

        return didWin;
    }

    #checkBackwardDiagonal(cells) {
        let didWin = false;
        cells.forEach((row) => {
            for (let i = 0; i < row.length; i++) {
                let cell = row[i];
                let gamePieceOne = cell.gamePiece;
                if (gamePieceOne == null) continue;
                let nextX = cell.x + 1;
                let nextY = cell.y - 1;
                let count = 1;
                while (nextX <= MAX_X && nextY >= 0) {
                    let gamePieceTwo = cells[nextX][nextY].gamePiece
                    if (gamePieceTwo == null) break;
                    if (gamePieceTwo.color === gamePieceOne.color) {
                        count++;
                        if (count === 4) {
                            didWin = true;
                            break;
                        }
                        nextX++;
                        nextY--;
                    } else {
                        break;
                    }
                }
            }
        })

        return didWin;
    }


}


function createGameBoard(gridElement) {
    let cellElements = [];
    for (let i = 0; i < 42; i++) {
        let cellElement = document.createElement("div");
        cellElement.classList.add("game-cell");
        cellElement.setAttribute("column", `${Math.floor(i % 7)}`);
        gridElement.appendChild(cellElement);
        cellElements.push(cellElement);
    }
    return cellElements;
}