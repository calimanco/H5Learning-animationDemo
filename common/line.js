/**
  * 线段类
  * @class Representing a line.
  */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "Line" }] */
class Line {
  /**
    * Create a line.
    * @param {Number} [x1 = 0] - 开始点x轴坐标
    * @param {Number} [y1 = 0] - 开始点y轴坐标
    * @param {Number} [x2 = 0] - 结束点x轴坐标
    * @param {Number} [y2 = 0] - 结束点y轴坐标
    */
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.x = 0;
    this.y = 0;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 1;
  }

  draw(_context) {
    const context = _context;
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.closePath();
    context.stroke();
    context.restore();
  }

  getBounds() {
    if (this.rotation === 0) {
      const minX = Math.min(this.x1, this.x2);
      const minY = Math.min(this.y1, this.y2);
      const maxX = Math.max(this.x1, this.x2);
      const maxY = Math.max(this.y1, this.y2);

      return {
        x: this.x + minX,
        y: this.y + minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }
    const sin = Math.sin(this.rotation);
    const cos = Math.cos(this.rotation);
    const x1r = (cos * this.x1) + (sin * this.y1);
    const x2r = (cos * this.x2) + (sin * this.y2);
    const y1r = (cos * this.y1) + (sin * this.x1);
    const y2r = (cos * this.y2) + (sin * this.x2);

    return {
      x: this.x + Math.min(x1r, x2r),
      y: this.y + Math.min(y1r, y2r),
      width: Math.max(x1r, x2r) - Math.min(x1r, x2r),
      height: Math.max(y1r, y2r) - Math.min(y1r, y2r),
    };
  }
}
