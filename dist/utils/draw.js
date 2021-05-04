export var drawPointBackground = function (pt, $canvas, $video) {
    if (!$canvas || !$video)
        return;
    var ctx = $canvas.getContext('2d');
    if (!ctx)
        return;
    var clipWidth = 15;
    var clipHeight = 120;
    var useLeft = Math.random() > .5;
    var randomX = useLeft
        ? Math.floor(Math.random() * ($video.clientWidth * 0.15)) + 0
        : Math.floor(Math.random() * ($video.clientWidth * 0.15)) + ($video.clientWidth * 0.85);
    var randomY = useLeft
        ? Math.floor(Math.random() * ($video.clientWidth * 0.15)) + 0
        : Math.floor(Math.random() * ($video.clientWidth * 0.15)) + ($video.clientWidth * 0.85);
    ctx.globalAlpha = 0.5;
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage($video, randomX, randomY, clipWidth, clipHeight, pt.x - clipWidth / 2, pt.y - clipHeight / 2, clipWidth, clipHeight);
};
export var drawPoint = function (pt, $canvas) {
    if (!$canvas)
        return;
    var ctx = $canvas.getContext('2d');
    if (!ctx)
        return;
    var pointSize = 3;
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pointSize, 0, 2 * Math.PI);
    ctx.fill();
};
export var drawPoint2 = function (pt, $canvas) {
    if (!$canvas)
        return;
    var ctx = $canvas.getContext('2d');
    if (!ctx)
        return;
    var pointSize = 3;
    if (!ctx)
        return;
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(pt.x + (pointSize * 0.25), pt.y + (pointSize * 0.25), pointSize, 0, 2 * Math.PI);
    ctx.fill();
};
export var drawPoint3 = function (pt, $canvas) {
    if (!$canvas)
        return;
    var ctx = $canvas.getContext('2d');
    if (!ctx)
        return;
    var pointSize = 2;
    if (!ctx)
        return;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(pt.x + (pointSize * 0.25), pt.y + (pointSize * 0.25), pointSize, 0, 2 * Math.PI);
    ctx.fill();
};
export var drawBody = function (pt, $canvas) {
    if (!$canvas)
        return;
    var ctx = $canvas.getContext('2d');
    if (!ctx)
        return;
    ctx.beginPath();
    ctx.fillStyle = '#00F';
    ctx.moveTo(pt.x, pt.y);
    ctx.lineTo($canvas.clientWidth / 4, $canvas.clientHeight);
    ctx.lineTo($canvas.clientWidth / 4 * 3, $canvas.clientHeight);
    ctx.fill();
};
export var drawBackground = function (pt, $canvas, $video) {
    if (!$canvas || !$video)
        return;
    var ctx = $canvas.getContext('2d');
    if (!ctx)
        return;
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage($video, pt.x - $video.clientWidth * 0.015, pt.y - $video.clientHeight * 0.025, $video.clientWidth * 0.1, $video.clientHeight * 0.1, 0, 0, $canvas.clientWidth * 1.25, $canvas.clientHeight);
    var imageData = ctx.getImageData(0, 0, $canvas.clientWidth * 1.25, $canvas.clientHeight);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
};
