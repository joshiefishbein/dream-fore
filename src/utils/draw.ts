export const drawPointBackground = function(
  pt: { x: number, y: number },
  $canvas: HTMLCanvasElement,
  $video: HTMLVideoElement
) {
  if (!$canvas || !$video) return;
  const ctx = $canvas.getContext('2d');
  if (!ctx) return;

  const clipWidth = 15;
  const clipHeight = 120;
  const useLeft = Math.random() > .5;
  const randomX = useLeft
    ? Math.floor(Math.random() * ($video.clientWidth * 0.15)) + 0
    : Math.floor(Math.random() * ($video.clientWidth * 0.15)) + ($video.clientWidth * 0.85);
  const randomY = useLeft
    ? Math.floor(Math.random() * ($video.clientWidth * 0.15)) + 0
    : Math.floor(Math.random() * ($video.clientWidth * 0.15)) + ($video.clientWidth * 0.85);

  ctx.globalAlpha = 0.5;
  ctx?.drawImage($video,
    randomX, randomY, clipWidth, clipHeight,
    pt.x - clipWidth / 2, pt.y - clipHeight / 2, clipWidth, clipHeight,
  );
};

export const drawPoint = function(
  pt: { x: number, y: number },
  $canvas: HTMLCanvasElement
) {
  if (!$canvas) return;
  const ctx = $canvas.getContext('2d');
  if (!ctx) return;
  const pointSize = 3;

  ctx.globalAlpha = 1
  ctx.fillStyle = '#333'
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, pointSize, 0, 2 * Math.PI);
  ctx.fill();   
};

export const drawPoint2 = function(
  pt: { x: number, y: number },
  $canvas: HTMLCanvasElement
) {
  if (!$canvas) return;
  const ctx = $canvas.getContext('2d');
  if (!ctx) return;
  const pointSize = 3;

  if (!ctx) return;
  
  ctx.globalAlpha = 1
  ctx.fillStyle = '#fff'
  ctx.beginPath();
  ctx.arc(pt.x + (pointSize * 0.25), pt.y + (pointSize * 0.25), pointSize, 0, 2 * Math.PI);
  ctx.fill();
};

export const drawPoint3 = function(
  pt: { x: number, y: number },
  $canvas: HTMLCanvasElement
) {
  if (!$canvas) return;
  const ctx = $canvas.getContext('2d');
  if (!ctx) return;
  const pointSize = 2;

  if (!ctx) return;
  
  ctx.fillStyle = '#fff'
  ctx.beginPath();
  ctx.arc(pt.x + (pointSize * 0.25), pt.y + (pointSize * 0.25), pointSize, 0, 2 * Math.PI);
  ctx.fill();
};

export const drawBody = function(
  pt: { x: number, y: number },
  $canvas: HTMLCanvasElement
) {
  if (!$canvas) return;
  const ctx = $canvas.getContext('2d');
  if (!ctx) return;

  ctx.beginPath();
  ctx.fillStyle = '#00F';
  ctx.moveTo(pt.x, pt.y);
  ctx.lineTo(
    $canvas.clientWidth / 4,
    $canvas.clientHeight
  );
  ctx.lineTo(
    $canvas.clientWidth / 4 * 3,
    $canvas.clientHeight
  );
  ctx.fill();
};

export const drawBackground = function(
  pt: { x: number, y: number },
  $canvas: HTMLCanvasElement,
  $video: HTMLVideoElement
) {
  if (!$canvas || !$video) return;
  const ctx = $canvas.getContext('2d');
  if (!ctx) return;

  ctx?.drawImage($video,
    pt.x - $video.clientWidth * 0.015, pt.y - $video.clientHeight * 0.025,
    $video.clientWidth * 0.1, $video.clientHeight * 0.1,
    0, 0, $canvas.clientWidth * 1.25, $canvas.clientHeight
  );
  const imageData = ctx.getImageData(0, 0, $canvas.clientWidth * 1.25, $canvas.clientHeight);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
      data[i]     = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
  }
  ctx.putImageData(imageData, 0, 0);

};
