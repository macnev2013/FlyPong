const INIT_VELOCITY = 0.025;
const VELOCITY_INCR = 0.00001;

const score = document.getElementById('score');

export default class Fly {
    constructor(flyElem) {
        this.flyElem = flyElem;
        this.reset()
    }

    get x() {
        return parseFloat(getComputedStyle(this.flyElem).getPropertyValue("--x"));
    }
    set x(value) {
        this.flyElem.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.flyElem).getPropertyValue("--y"));
    }
    set y(value) {
        this.flyElem.style.setProperty("--y", value);
    }

    rect() {
        return this.flyElem.getBoundingClientRect();
    }

    reset() {
        this.x = 50 
        this.y = 50
        this.direction = { x: .0}
        while (Math.abs(this.direction.x) <= .9 || Math.abs(this.direction.y) >= .9) {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity  = INIT_VELOCITY
    }

    update(delta, paddleRect) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCR * delta;
        const rect = this.rect();
        if (rect.top <= 0) {
            this.direction.y *= -1;
        }
        if (rect.right >= window.innerWidth || rect.left <= 0) {
            this.direction.x *= -1;
        }

        if (paddleRect.some(r => isCollision(r, rect))) {
            this.direction.y *= -1;
            score.textContent = parseInt(score.textContent) + 1;
        }
  }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
    return rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
}