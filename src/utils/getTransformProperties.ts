// 获取 transform 属性的 scale 值： scaleX、scaleY
const transformScaleReg = /scale\((-?[0-9.]+),\s?(-?[0-9.]+)\)/;
// 获取 transform 属性的 rotate 值
const transformRotateReg = /rotate\((-?[0-9.]+)deg\)/;
// 获取 transform 属性的 translate 值： translateX、translateY、translateZ
const transformTranslateReg =
  /translate3d\((-?[0-9.]+)px,\s?(-?[0-9.]+)px,\s?(-?[0-9.]+)px\)/;

/**
 * 获取元素的 transform 相关属性值。
 * @return scaleX
 * @return scaleY
 * @return rotate
 * @return translateX
 * @return translateY
 * @return translateZ
 */
export default function getTransformProperties(element: HTMLElement) {
  const transform = element.style.transform;
  const result = {
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
  };

  if (transformScaleReg.test(transform)) {
    result.scaleX = +RegExp.$1;
    result.scaleY = +RegExp.$2;
  }

  if (transformRotateReg.test(transform)) {
    result.rotate = +RegExp.$1;
  }

  if (transformTranslateReg.test(transform)) {
    result.translateX = +RegExp.$1;
    result.translateY = +RegExp.$2;
    result.translateZ = +RegExp.$3;
  }
  return result;
}
