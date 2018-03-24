/**
 * 箭头类
 * @class Representing a arrow.
 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "Arrow" }] */
class Arrow {
  /**
    * Create a arrow.
    */
  constructor() {
    this.x = 0;
    this.y = 0;
    this.color = '#ffff00';
    this.rotation = 0;
  }
  /**
   * Draw the arrow.
   * @param {Object} _context - The canvas context.
   */
  draw(_context) {
    const context = _context;
    // 会先保存画笔状态
    context.save();
    // 移动画笔
    context.translate(this.x, this.y);
    // 旋转画笔
    context.rotate(this.rotation);
    // 设置线条宽度
    context.lineWidth = 2;
    // 设置线条颜色
    context.strokeStyle = '#ff0000';
    // 设置填充颜色
    context.fillStyle = this.color;
    // 开始路径
    context.beginPath();
    // 将笔移动到相对位置
    context.moveTo(-50, -25);
    // 画线到相对位置
    context.lineTo(0, -25);
    context.lineTo(0, -50);
    context.lineTo(50, 0);
    context.lineTo(0, 50);
    context.lineTo(0, 25);
    context.lineTo(-50, 25);
    context.lineTo(-50, -25);
    // 闭合路径
    context.closePath();
    // 填充路径包围区
    context.fill();
    // 绘制路径
    context.stroke();
    // 载入保存的笔信息
    context.restore();
  }
}
