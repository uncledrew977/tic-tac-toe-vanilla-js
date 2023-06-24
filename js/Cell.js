
export default class Cell {
    #cellElement
    #x
    #y
    #gamePiece
    constructor(cellElement, x, y) {
      this.#cellElement = cellElement;
      this.#cellElement.innerHTML = `X: ${x} Y: ${y} `
      this.#x = x;
      this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get gamePiece() {
        return this.#gamePiece;
    }

    set gamePiece(gamePiece) {
        this.#gamePiece = gamePiece;
        this.#gamePiece.x = this.#x;
        this.#gamePiece.y = this.#y;
    }

}