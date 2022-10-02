import Fly from './fly.js';
import Paddle from './paddle.js';

const fly = new Fly(document.getElementById('fly'));
const paddle = new Paddle(document.getElementById('paddle'));
const score = document.getElementById('score');

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        fly.update(delta, [paddle.rect()]);
        if (isLose()) handleLose()
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = fly.rect();
    return rect.bottom >= window.innerHeight
}

function handleLose() {
    alert("You scored " +  score.textContent + "!");
    fly.reset();
    paddle.reset();
    score.textContent = 0;
}

document.addEventListener('mousemove', e => {
    paddle.position = (e.x / window.innerWidth) * 100;
});

window.requestAnimationFrame(update);