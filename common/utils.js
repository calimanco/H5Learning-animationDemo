/* eslint no-bitwise: "off" */
const utils = {};
utils.captureMouse = function captureMouse(element) {
  const mouse = {
    x: 0,
    y: 0,
  };
  element.addEventListener('mousemove', (event) => {
    let x;
    let y;
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= element.offsetLeft;
    y -= element.offsetTop;

    mouse.x = x;
    mouse.y = y;
  }, false);

  return mouse;
};

utils.captureTouch = function captureTouch(element) {
  const touch = {
    x: null,
    y: null,
    isPressed: false,
  };

  element.addEventListener('touchstart', () => {
    touch.isPressed = true;
  }, false);

  element.addEventListener('touchend', () => {
    touch.isPressed = false;
    touch.x = null;
    touch.y = null;
  }, false);

  element.addEventListener('touchmove', (event) => {
    let x;
    let y;
    const touchEvent = event.touches[0]; // 单指触控

    if (touchEvent.pageX || touchEvent.pageY) {
      x = touchEvent.pageX;
      y = touchEvent.pageY;
    } else {
      x = touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= element.offsetLeft;
    y -= element.offsetTop;

    touch.x = x;
    touch.y = y;
  }, false);

  return touch;
};

utils.colorToRGB = function colorToRGB(_color, _alpha) {
  let color = _color;
  // 如果是字符串，转换成数字
  if (typeof color === 'string' && color[0] === '#') {
    color = parseInt(color.slice(1), 16);
  }
  const alpha = (_alpha === undefined) ? 1 : _alpha;

  // 提取各颜色的值
  const r = (color >> 16) & 0xFF;
  const g = (color >> 8) & 0xFF;
  const b = color & 0xFF;
  // 检查透明度，并剔除非法值
  let a = (alpha < 0) ? 0 : alpha;
  a = (alpha > 1) ? 1 : alpha;

  // 判断是否以rgba表示
  if (a === 1) {
    return `rgb(${r},${g},${b})`;
  }
  return `rgba(${r},${g},${b},${a})`;
};

utils.parseColor = function parseColor(_color, toNumber) {
  let color = _color;
  if (toNumber === true) {
    if (typeof color === 'number') {
      // 判断是数字，剔除小数即可
      return (color | 0);
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return parseInt(color, 16);
  }
  if (typeof color === 'number') {
    // 确保十六进制数字被填了
    // 先去掉小数点，然后转16进制，补足6位，剪切出后6位
    color = `#${(`00000${(color | 0).toString(16)}`).substr(-6)}`;
  }
  return color;
};

utils.containsPoint = function containsPoint(rect, x, y) {
  return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);
};
