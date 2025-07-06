import { goat_pos, player_pos } from "./index.js";
var context = null;
var width = 0;
var height = 0;
export default function init_goat(width, height, context_in) {
  console.log("getting goat started");
  goat_pos.x = Math.random() * width;
  goat_pos.y = Math.random() * height;
  context = context_in;
  updateGoat();
}

const fresh_goat = (n, pos) => n + n / Math.sqrt(pos.x ** 2 + pos.y ** 2);
// var lastTime = 0;
function updateGoat(time = 0) {
  // if (context == null) {
  //   console.log("failed to initilise context");
  //   return;
  // }

  // const deltaTime = time - lastTime;
  if (player_pos == goat_pos) {
    console.log("got to destinations");
  } else {
    goat_pos.x = fresh_goat(goat_pos.x, player_pos);
    goat_pos.y = fresh_goat(goat_pos.y, player_pos);
    // if (goat_pos.x > width) goat_pos.x = width - 10;
    // if (goat_pos.x < 0) goat_pos.x = 0;
    // if (goat_pos.y > height) goat_pos.y = height;
    // if (goat_pos.y < 0) goat_pos.y = 0;
  }

  requestAnimationFrame(updateGoat);
}
