export const spriteWidth = 80;
export const spriteHeight = 96;
export default function loadSprite(url, context) {
  const spriteSheet = new Image();
  spriteSheet.src = url;

  let totalFrames = 1;
  let currentFrame = 0;
  var running = false;
  const frameRate = 200;
  const row = 0;

  let lastFrameTime = 0;

  function update(timestamp) {
    if (timestamp - lastFrameTime > frameRate) {
      currentFrame = (currentFrame + 1) % totalFrames;
      lastFrameTime = timestamp;
    }
  }

  function draw(x, y) {
    if (running) {
      console.log("not running");
      totalFrames = 1;
    } else {
      console.log("lol");
      totalFrames = 9;
    }
    context.drawImage(
      spriteSheet,
      currentFrame * spriteWidth,
      0,
      spriteWidth,
      spriteHeight,
      x,
      y,
      spriteWidth / 2,
      spriteHeight / 2
    );
  }
  return { update, draw, running };
}
