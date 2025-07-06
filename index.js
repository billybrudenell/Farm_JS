import startFarmer from "./farmer.js";
import init_goat from "./goat.js";

const canvas = document.getElementById("canvas");
canvas.width = screen.width / 2;
canvas.height = screen.height / 2;
const context = canvas.getContext("2d");

context.fillStyle = "green";
context.fillRect(0, 0, canvas.width, canvas.height);
export var goat_pos = { x: 0, y: 0 };
export var player_pos = { x: 0, y: 0 };
export var mouse_pos = { x: 0, y: 0 };

canvas.addEventListener("mousemove", (event) => {
  mouse_pos = { x: event.x, y: event.y };
});

startFarmer(context, mouse_pos, player_pos);
init_goat(canvas.width, canvas.height, context);

function draw() {
  context.fillStyle = "green";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(goat_pos.x, goat_pos.y, 10, 10);
  context.fillStyle = "red";
  context.fillRect(player_pos.x, player_pos.y, 10, 10);
}
function update(time = 0) {
  draw();
  requestAnimationFrame(update);
}
update();
