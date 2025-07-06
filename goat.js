import { goat_pos, player_pos } from "./index.js";
var context = null;
var width = 0;
var height = 0;
export default function init_goat(width_in, height_in, context_in) {
  console.log("getting goat started");
  goat_pos.x = Math.random() * width_in;
  goat_pos.y = Math.random() * height_in;
  width = width_in;
  height = height_in;
  context = context_in;
  updateGoat();
}

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

    goat_pos.x = 
      goat_pos.x + (goat_pos.x - player_pos.x) /
      Math.sqrt((goat_pos.x - player_pos.x) ** 2 +  (goat_pos.y - player_pos.y) ** 2);
    goat_pos.y = 
    goat_pos.y +  (goat_pos.y - player_pos.y)  /
     Math.sqrt((goat_pos.x - player_pos.x) ** 2 +  (goat_pos.y - player_pos.y) ** 2);
    
    console.log("goat_pos", goat_pos);
    goat_pos.x = Math.max(0, Math.min(width, goat_pos.x));
    goat_pos.y = Math.max(0, Math.min(height, goat_pos.y));
    console.log("goat_pos", goat_pos);
  }

  requestAnimationFrame(updateGoat);
}
