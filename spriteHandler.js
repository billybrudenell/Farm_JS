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

  function getRunning() {
    return running;
  }
  function setRunning(running_in) {
    running = running_in;
  }

  function draw(x, y) {
    if (running) {
      totalFrames = 9;
    } else {
      totalFrames = 1;
      currentFrame = 0;
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
  return { update, draw, getRunning, setRunning };
}
