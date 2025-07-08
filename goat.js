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
      radius: 7
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
      // goat.speed = getRandomSpeed();
      // goat.angle = getRandomAngle();
    } else {
      if (moveCounter >= moveInterval) {
        goat.speed = getRandomSpeed();
        goat.angle = getRandomAngle();
        moveCounter = 0;
      }
      goat.x += Math.cos(goat.angle) * goat.speed;
      goat.y += Math.sin(goat.angle) * goat.speed;

      if (goat.x < 0 || goat.x > width-10 || goat.y < 0 || goat.y > height-10) {
        goat.angle = (goat.angle + Math.PI) % (2 * Math.PI);
        goat.x += Math.cos(goat.angle) * goat.speed;
        goat.y += Math.sin(goat.angle) * goat.speed;
      }

    }

    goat.x = Math.max(0, Math.min(width - 10, goat.x));
    goat.y = Math.max(0, Math.min(height - 10, goat.y));

    resolveOverlap(goat, goat_array);
  });

  requestAnimationFrame(updateGoat);
}

const getRandomAngle = () => Math.random() * 2 * Math.PI;
const getRandomSpeed = () => (Math.random() < 0.8 ? 0.7 : 0);


function resolveOverlap(npc, others) {
  for (let other of others) {
    if (npc === other) continue;
    const dx = npc.x - other.x;
    const dy = npc.y - other.y;
    const dist = Math.sqrt(dx **2 + dy **2);
    const minDist = npc.radius;

    if (dist < minDist) {
      const overlap = minDist - dist;
      const pushX = (dx / dist) * (overlap / 2);
      const pushY = (dy / dist) * (overlap / 2);

      npc.x += pushX;
      npc.y += pushY;
      other.x -= pushX;
      other.y -= pushY;
    }
  }
}
