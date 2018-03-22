/**
  * 滑块控件类
  * @class Representing a slider.
  */
/* global utils */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "Slider" }] */
class Slider {
  /**
    * Create a slider.
    * @param {Number} [min=0] - 最小值
    * @param {Number} [max=100] - 最大值
    * @param {Number} [value=100] - 当前值
    */
  constructor(min = 0, max = 100, value = 100) {
    this.min = min;
    this.max = max;
    this.value = value;
    this.onchange = null;
    this.x = 0;
    this.y = 0;
    this.width = 16;
    this.height = 100;
    this.backColor = '#cccccc';
    this.backBorderColor = '#999999';
    this.backWidth = 4;
    this.backX = (this.width / 2) - (this.backWidth / 2);
    this.handleColor = '#eeeeee';
    this.handleBorderColor = '#cccccc';
    this.handleHeight = 6;
    this.handleY = 0;
    this.updatePosition();
  }

  draw(_context) {
    const context = _context;
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = this.backColor;
    context.beginPath();
    context.fillRect(this.backX, 0, this.backWidth, this.height);
    context.closePath();
    context.strokeStyle = this.handleBorderColor;
    context.fillStyle = this.handleColor;
    context.beginPath();
    context.rect(0, this.handleY, this.width, this.handleHeight);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }

  updatePosition() {
    const handleRange = this.height - this.handleHeight;
    const valueRange = this.max - this.min;
    this.handleY = handleRange - (((this.value - this.min) / valueRange) * handleRange);
  }

  updateValue() {
    const oldValue = this.value;
    const handleRange = this.height - this.handleHeight;
    const valueRange = this.max - this.min;

    this.value = (((handleRange - this.handleY) / handleRange) * valueRange) + this.min;
    if (typeof this.onchange === 'function' && this.value !== oldValue) {
      this.onchange();
    }
  }

  captureMouse(element) {
    const mouse = utils.captureMouse(element);
    const bounds = {};

    const setHandleBounds = () => {
      bounds.x = this.x;
      bounds.y = this.y + this.handleY;
      bounds.width = this.width;
      bounds.height = this.handleHeight;
    };
    const onMouseMove = () => {
      const posY = mouse.y - this.y;
      this.handleY = Math.min(this.height - this.handleHeight, Math.max(posY, 0));
      this.updateValue();
    };
    const onMouseUp = () => {
      element.removeEventListener('mousemove', onMouseMove, false);
      element.removeEventListener('mouseup', onMouseUp, false);
      setHandleBounds();
    };
    setHandleBounds();

    element.addEventListener('mousedown', () => {
      if (utils.containsPoint(bounds, mouse.x, mouse.y)) {
        element.addEventListener('mouseup', onMouseUp, false);
        element.addEventListener('mousemove', onMouseMove, false);
      }
    }, false);
  }
}
