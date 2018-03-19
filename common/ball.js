/**
  * 球类
  * @class Representing a ball.
  */
/* global utils */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "Ball" }] */
class Ball {
  /**
    * Create a ball.
    * @param {Number} [radius=40] - 半径
    * @param {String} [color='#ff0000'] - 颜色
    */
  constructor(radius = 40, color = '#ff0000') {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = utils.parseColor(color);
    this.lineWidth = 1;
    this.mass = 1;
  }
  /**
   * Draw the ball.
   * @param {Object} _context - The canvas context.
   */
  draw(_context) {
    const context = _context;
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
    if (this.lineWidth > 0) {
      // 开始绘制
      context.stroke();
    }
    context.restore();
  }
  /**
   * get Bound.
   */
  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
  }
}
