import { player_pos, goat_array } from "./index.js";
import { normalizationOrSomething } from "./helper.js";
var context = null;
var width = 0;
var height = 0;
var angle = Math.random() * 2 * Math.PI;
var angle_timer = 0;
var speed = 0;

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
    console.log("hello");
    goat_array.add({
      x: Math.random() * width,
      y: Math.random() * height,
    });
  }
  console.log(goat_array);
  updateGoat();
}

function updateGoat(time = 0) {
  console.log(goat_array);
  goat_array.forEach((goat_pos) => {
    console.log(goat_pos);
    const dx = goat_pos.x - player_pos.x;
    const dy = goat_pos.y - player_pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (dx ** 2 < 20000 && dy ** 2 < 200000) {
      // Distance threshold
      goat_pos.x += dx / distance;
      goat_pos.y += dy / distance;
    } else {
      // Random movement
      angle_timer += 1;
      if (angle_timer >= 60) {
        angle = Math.random() * 2 * Math.PI; // Change direction every 30 frames
        angle_timer = 0;
        // Flip coin: 50% chance of movement
        speed = Math.random() < 0.5 ? 1 : 0;
      }
      goat_pos.x += Math.cos(angle) * speed;
      goat_pos.y += Math.sin(angle) * speed;
    }

    // Adjust Canvas boundaries
    console.log("goat_pos", goat_pos);
    goat_pos.x = Math.max(0, Math.min(width - 10, goat_pos.x));
    goat_pos.y = Math.max(0, Math.min(height - 10, goat_pos.y));
    console.log("goat_pos", goat_pos);
  });

  requestAnimationFrame(updateGoat);
}
