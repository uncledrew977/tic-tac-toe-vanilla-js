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

    get gamePieceElement() {
        return this.#gamePieceElement;
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
        this.#gamePieceElement.setAttribute("column", `${this.#x}`);
    }

    set y(y) {
        this.#y = y;
        this.#gamePieceElement.style.setProperty("--y", this.#y);
    }

    get color() {
        return this.#color;
    }

    waitForTransitionEnd() {
        return new Promise((resolve) => {
            this.#gamePieceElement.addEventListener("transitionend", resolve, {once: true})
        })
    }

    waitForAnimationEnd() {
        return new Promise((resolve) => {
            this.#gamePieceElement.addEventListener("animationend", resolve, {once: true})
        })
    }

}