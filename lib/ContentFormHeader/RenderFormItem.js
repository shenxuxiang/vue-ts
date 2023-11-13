"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty2(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cascader = _interopRequireDefault(require("ant-design-vue/lib/cascader"));
var _datePicker = _interopRequireDefault(require("ant-design-vue/lib/date-picker"));
var _select = _interopRequireDefault(require("ant-design-vue/lib/select"));
var _input = _interopRequireDefault(require("ant-design-vue/lib/input"));
require("core-js/modules/es.array.push.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));
var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
function ownKeys(e, r) {
  var t = (0, _keys["default"])(e);
  if (_getOwnPropertySymbols["default"]) {
    var o = (0, _getOwnPropertySymbols["default"])(e);
    r && (o = (0, _filter["default"])(o).call(o, function (r) {
      return (0, _getOwnPropertyDescriptor["default"])(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var _context, _context2;
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? (0, _forEach["default"])(_context = ownKeys(Object(t), !0)).call(_context, function (r) {
      (0, _defineProperty3["default"])(e, r, t[r]);
    }) : _getOwnPropertyDescriptors["default"] ? (0, _defineProperties["default"])(e, (0, _getOwnPropertyDescriptors["default"])(t)) : (0, _forEach["default"])(_context2 = ownKeys(Object(t))).call(_context2, function (r) {
      (0, _defineProperty2["default"])(e, r, (0, _getOwnPropertyDescriptor["default"])(t, r));
    });
  }
  return e;
}
var RenderFormItem = exports["default"] = (0, _vue.defineComponent)(function (props, _ref) {
  var emit = _ref.emit;
  // 对于一些需要响应式的数据，不应该使用对象解构
  var title = props.title,
    watch = props.watch,
    formType = props.formType,
    formModel = props.formModel,
    component = props.component,
    properties = props.properties,
    placeholder = props.placeholder;
  function onChange(event) {
    var value = event !== null && event !== void 0 && event.type ? event.target.value : event;
    emit("update:value", value);
    watch === null || watch === void 0 || watch(value, (0, _vue.toRaw)(formModel));
  }
  if (formType === "input") {
    return function () {
      return (0, _vue.h)(_input["default"], _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
      }));
    };
  } else if (formType === "select") {
    return function () {
      return (0, _vue.h)(_select["default"], _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        options: props.options,
        placeholder: placeholder || "\u8BF7\u9009\u62E9".concat(title)
      }));
    };
  } else if (formType === "rangePicker") {
    var RangePicker = _datePicker["default"].RangePicker;
    return function () {
      return (0, _vue.h)(RangePicker, _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        style: "width: 100%",
        placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : ["开始时间", "结束时间"]
      }));
    };
  } else if (formType === "datePicker") {
    return function () {
      return (0, _vue.h)(_datePicker["default"], _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        style: "width: 100%",
        placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "请选择查询时间"
      }));
    };
  } else if (formType === "cascader") {
    return function () {
      return (0, _vue.h)(_cascader["default"], _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        options: props.options,
        placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "\u8BF7\u9009\u62E9".concat(title)
      }));
    };
  } else if (typeof component === "function") {
    return function () {
      return (0, _vue.cloneVNode)(component(), {
        onChange: onChange,
        placeholder: placeholder,
        value: props.value
      });
    };
  }
  return function () {
    return null;
  };
}, {
  props: ["title", "formType", "component", "properties", "options", "watch", "placeholder", "formModel", "value"],
  emits: ["update:value"]
});