import '@babel/runtime-corejs3/helpers/typeof';
import 'core-js/modules/es.error.to-string.js';
import 'core-js/modules/es.date.to-string.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/es.number.to-fixed.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.regexp.test.js';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _URL from '@babel/runtime-corejs3/core-js-stable/url';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import '@babel/runtime-corejs3/core-js-stable/promise';

function getType(data) {
  var _context;
  return _sliceInstanceProperty(_context = Object.prototype.toString.call(data)).call(_context, 8, -1);
}
function isArray(data) {
  return getType(data) === "Array";
}
function isEmpty(data) {
  var _context2;
  if (!data) return true;
  var type = getType(data);
  switch (type) {
    case "Map":
    case "Set":
      return data.size <= 0;
    case "Array":
      return data.length <= 0;
    case "Object":
      return _concatInstanceProperty(_context2 = _Object$keys(data)).call(_context2, _Object$getOwnPropertySymbols(data)).length <= 0;
    default:
      return false;
  }
}
/**
 * 下载文件
 * @param fileName 指定文件下载后的文件名
 * @param data     文件资源（blob）
 * @param extName  文件后缀
 */
function downloadFile(fileName, data) {
  var extName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".xlsx";
  var blob = data instanceof Blob ? data : new Blob([data]);
  var eLink = document.createElement("a");
  // <a/> 上的 download 属性用于重命名一个需要下载的文件
  eLink.download = /\.([a-zA-Z]+)$/i.test(fileName) ? fileName : fileName + extName;
  eLink.style.display = "none";
  eLink.href = _URL.createObjectURL(blob);
  document.body.appendChild(eLink);
  eLink.click();
  // 释放 URL 对象
  _URL.revokeObjectURL(eLink.href);
  document.body.removeChild(eLink);
}
/**
 * 节流
 * @param func        节流的方法
 * @param delay       节流的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
function throttle(func, delay) {
  var immediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var interval = null;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (immediately) {
      if (interval) return;
      func.apply(void 0, args);
      interval = _setTimeout(function () {
        return interval = null;
      }, delay);
    } else {
      if (interval) return;
      interval = _setTimeout(function () {
        func.apply(void 0, args);
        interval = null;
      }, delay);
    }
  };
}
// 获取视口尺寸
function getViewportSize() {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return {
    width: width,
    height: height
  };
}

export { downloadFile, getType, getViewportSize, isArray, isEmpty, throttle };
