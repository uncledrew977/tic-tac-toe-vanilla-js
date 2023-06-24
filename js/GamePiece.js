
export default class GamePiece {
    #color
    #x
    #y
    #gamePieceElement
    constructor(color, gridElement) {
        this.#color = color;
        this.#gamePieceElement = document.createElement("div");
        this.#gamePieceElement.classList.add("game-piece");
        this.#gamePieceElement.style.background = this.#color;
        gridElement.appendChild(this.#gamePieceElement);

    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(x) {
        this.#x = x;
        this.#gamePieceElement.style.setProperty("--x", this.#x);
        this.#gamePieceElement.setAttribute("column",`${this.#x}`);
    }

    set y(y) {
        this.#y = y;
        this.#gamePieceElement.style.setProperty("--y", this.#y);
    }

    set color(color) {
        this.#color = color;
        this.#gamePieceElement.style.background = this.#color;
    }

    get color() {
        return this.#color;
    }

    remove() {
        this.#gamePieceElement.remove();
    }
}