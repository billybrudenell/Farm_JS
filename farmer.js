const offsetX = -0.7;
const offsetY = -0.7;
import { player_pos, mouse_pos } from "./index.js";

var context = null;

export default function startFarmer(context_in) {
  context = context_in;
  if (context != null) {
    updateFarmer();
  }
}

let lastTime = 0;
function updateFarmer(time = 0) {
  if (context == null) {
    console.log("failed to initilise context");
    return;
  }

  const deltaTime = time - lastTime;
  if (player_pos == mouse_pos) {
    console.log("got to destinations");
  } else {
    player_pos.x =
      player_pos.x - (1 / 16) * (player_pos.x - mouse_pos.x) + offsetX;
    player_pos.y =
      player_pos.y - (1 / 16) * (player_pos.y - mouse_pos.y) + offsetY;
  }

  context.fillStyle = "red";
  context.fillRect(player_pos.x, player_pos.y, 10, 10);

  requestAnimationFrame(updateFarmer);
}
