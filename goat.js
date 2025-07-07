import { player_pos, goat_array } from "./index.js";
var context = null;
var width = 0;
var height = 0;

export default function init_goats(
  width_in,
  height_in,
  context_in,
  number_of_goats
) {
  width = width_in;
  height = height_in;
  context = context_in;
  for (let i = 0; i < number_of_goats; i++) {
    goat_array.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: getRandomSpeed(),
      angle: getRandomAngle(),
    });
  }
  updateGoat();
}

let lastTime = 0;
let moveCounter = 0;
const moveInterval = 1000;

function updateGoat(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  moveCounter += deltaTime;

  goat_array.forEach((goat) => {
    const dx = goat.x - player_pos.x;
    const dy = goat.y - player_pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < width / 4) {
      goat.x += dx / distance;
      goat.y += dy / distance;
      goat.speed = getRandomSpeed();
      goat.angle = getRandomAngle();
    } else {
      if (moveCounter >= moveInterval) {
        goat.speed = getRandomSpeed();
        goat.angle = getRandomAngle();
        moveCounter = 0;
      }
      goat.x += Math.cos(goat.angle) * goat.speed;
      goat.y += Math.sin(goat.angle) * goat.speed;
    }

    goat.x = Math.max(0, Math.min(width - 10, goat.x));
    goat.y = Math.max(0, Math.min(height - 10, goat.y));
  });

  requestAnimationFrame(updateGoat);
}

const getRandomAngle = () => Math.random() * 2 * Math.PI;
const getRandomSpeed = () => (Math.random() < 0.5 ? 4 : 0);
