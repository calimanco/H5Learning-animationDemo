/**
 * 球类
 * @param {Number} radius - 半径
 * @param {String} color - 颜色
 */
function Ball(radius, color) {
  if (radius === undefined) {
    radius = 40;
  }
  if (color === undefined) {
    color = '#ff0000';
  }
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Ball.prototype.draw = function(context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  // 参数分别是：x，y，半径，开始角度，结束角度，是否反时针方向
  context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
  context.closePath();
  context.fill();
  if (this.lineWidth>0) {
    // 开始绘制
    context.stroke();
  }
  context.restore();
};
