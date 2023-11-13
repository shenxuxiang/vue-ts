"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _sign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/math/sign"));
var _vue = require("vue");
var _getTransformProperties = _interopRequireDefault(require("../utils/getTransformProperties.js"));
require("../Icon/index.js");
require("./ToolBar.css");
require("../Icon/Icon.vue.js");
var _IconVue2 = _interopRequireDefault(require("../Icon/Icon.vue2.js"));
var _hoisted_1 = {
  "class": "qm-vnit-preview-image-header"
};
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)({
  __name: 'ToolBar',
  props: {
    imageElement: {
      type: null,
      required: true
    }
  },
  emits: ["close"],
  setup: function setup(__props) {
    var props = __props;
    // Y轴镜像
    function handleMirrorY() {
      var _context, _context2;
      var _getTransformProperti = (0, _getTransformProperties["default"])(props.imageElement),
        scaleX = _getTransformProperti.scaleX,
        scaleY = _getTransformProperti.scaleY,
        rotate = _getTransformProperti.rotate;
      props.imageElement.style.cssText = (0, _concat["default"])(_context = (0, _concat["default"])(_context2 = "transform: scale(".concat(scaleX, ", ")).call(_context2, scaleY * -1, ") rotate(")).call(_context, rotate, "deg);");
    }
    // X轴镜像
    function handleMirrorX() {
      var _context3, _context4;
      var _getTransformProperti2 = (0, _getTransformProperties["default"])(props.imageElement),
        scaleX = _getTransformProperti2.scaleX,
        scaleY = _getTransformProperti2.scaleY,
        rotate = _getTransformProperti2.rotate;
      props.imageElement.style.cssText = (0, _concat["default"])(_context3 = (0, _concat["default"])(_context4 = "transform: scale(".concat(scaleX * -1, ", ")).call(_context4, scaleY, ") rotate(")).call(_context3, rotate, "deg);");
    }
    // 缩小
    function handleShrink() {
      var _context5, _context6;
      var _getTransformProperti3 = (0, _getTransformProperties["default"])(props.imageElement),
        scaleX = _getTransformProperti3.scaleX,
        scaleY = _getTransformProperti3.scaleY,
        rotate = _getTransformProperti3.rotate;
      var x = scaleX * 0.8;
      var y = scaleY * 0.8;
      if (Math.abs(x) < 1) x = (0, _sign["default"])(x);
      if (Math.abs(y) < 1) y = (0, _sign["default"])(y);
      props.imageElement.style.cssText = (0, _concat["default"])(_context5 = (0, _concat["default"])(_context6 = "transform: scale(".concat(x, ", ")).call(_context6, y, ") rotate(")).call(_context5, rotate, "deg);");
    }
    // 放大
    function handleEnlarge() {
      var _context7, _context8;
      var _getTransformProperti4 = (0, _getTransformProperties["default"])(props.imageElement),
        scaleX = _getTransformProperti4.scaleX,
        scaleY = _getTransformProperti4.scaleY,
        rotate = _getTransformProperti4.rotate;
      props.imageElement.style.cssText = (0, _concat["default"])(_context7 = (0, _concat["default"])(_context8 = "transform: scale(".concat(scaleX * 1.25, ", ")).call(_context8, scaleY * 1.25, ") rotate(")).call(_context7, rotate, "deg);");
    }
    // 顺时针旋转
    function handleRotateLeft() {
      var _context9, _context10;
      var _getTransformProperti5 = (0, _getTransformProperties["default"])(props.imageElement),
        scaleX = _getTransformProperti5.scaleX,
        scaleY = _getTransformProperti5.scaleY,
        rotate = _getTransformProperti5.rotate;
      props.imageElement.style.cssText = (0, _concat["default"])(_context9 = (0, _concat["default"])(_context10 = "transform: scale(".concat(scaleX, ", ")).call(_context10, scaleY, ") rotate(")).call(_context9, rotate + 90, "deg);");
    }
    // 逆时针旋转
    function handleRotateRight() {
      var _context11, _context12;
      var _getTransformProperti6 = (0, _getTransformProperties["default"])(props.imageElement),
        scaleX = _getTransformProperti6.scaleX,
        scaleY = _getTransformProperti6.scaleY,
        rotate = _getTransformProperti6.rotate;
      props.imageElement.style.cssText = (0, _concat["default"])(_context11 = (0, _concat["default"])(_context12 = "transform: scale(".concat(scaleX, ", ")).call(_context12, scaleY, ") rotate(")).call(_context11, rotate - 90, "deg);");
    }
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_1, [(0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
        name: "swap-outline",
        style: {
          "transform": "rotate(90deg)"
        },
        "class": "qm-vnit-preview-image-icon",
        onClick: handleMirrorY
      }), (0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
        name: "swap-outline",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleMirrorX
      }), (0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
        name: "rotate-left",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleRotateRight
      }), (0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
        name: "rotate-right",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleRotateLeft
      }), (0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
        name: "minus-circle",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleShrink
      }), (0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
        name: "plus-circle",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleEnlarge
      }), (0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
        name: "close",
        "class": "qm-vnit-preview-image-icon",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.$emit('close', $event);
        })
      })]);
    };
  }
});