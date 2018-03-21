/**
  * 节段类
  * @class Representing a segment.
  */
/* global utils */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "Segment" }] */
class Segment {
  /**
    * Create a segment.
    * @param {Number} width - 宽度
    * @param {Number} height - 高度
    * @param {String} [color='#ffffff'] - 颜色
    */
  constructor(width, height, color = '#ffffff') {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = utils.parseColor(color);
    this.lineWidth = 1;
  }

  draw(_context) {
    const context = _context;
    // 高度
    const h = this.height;
    // 总长度（包括圆角）
    const d = this.width + h;
    // 圆角半径
    const cr = h / 2;
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(0, -cr);
    context.lineTo(d - (2 * cr), -cr);
    context.quadraticCurveTo(-cr + d, -cr, -cr + d, 0);
    context.lineTo(-cr + d, h - (2 * cr));
    context.quadraticCurveTo(-cr + d, -cr + h, d - (2 * cr), -cr + h);
    context.lineTo(0, -cr + h);
    context.quadraticCurveTo(-cr, -cr + h, -cr, h - (2 * cr));
    context.lineTo(-cr, 0);
    context.quadraticCurveTo(-cr, -cr, 0, -cr);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    // 画两个圆圈
    context.beginPath();
    context.arc(0, 0, 2, 0, (Math.PI * 2), true);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.arc(this.width, 0, 2, 0, (Math.PI * 2), true);
    context.closePath();
    context.stroke();
    context.restore();
  }

  getPin() {
    return {
      x: this.x + (Math.cos(this.rotation) * this.width),
      y: this.y + (Math.sin(this.rotation) * this.width),
    };
  }
}
