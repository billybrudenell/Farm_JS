import startFarmer from "./farmer.js";
import init_goat from "./goat.js";
const number_of_goats = 2;

const canvas = document.getElementById("canvas");
canvas.width = screen.width / 2;
canvas.height = screen.height / 2;
const context = canvas.getContext("2d");

context.fillStyle = "green";
context.fillRect(0, 0, canvas.width, canvas.height);
export const goat_array = [];
export var player_pos = { x: canvas.width, y: canvas.height };
export var mouse_pos = { x: 0, y: 0 };

canvas.addEventListener("mousemove", (event) => {
  mouse_pos = { x: event.x, y: event.y };
});

startFarmer(context, mouse_pos, player_pos);

init_goat(canvas.width, canvas.height, context, 3);

function draw() {
  context.fillStyle = "green";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "red";
  context.fillRect(player_pos.x, player_pos.y, 10, 10);

  goat_array.forEach((goat_location) => {
    context.fillStyle = "black";
    context.fillRect(goat_location.x, goat_location.y, 10, 10);
  });
}
function update(time = 0) {
  draw();
  requestAnimationFrame(update);
}
update();
