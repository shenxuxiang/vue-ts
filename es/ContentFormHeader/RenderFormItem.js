import 'core-js/modules/es.array.push.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import { defineComponent, h, cloneVNode, toRaw } from 'vue';
import { Input, Select, DatePicker, Cascader } from 'ant-design-vue';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var RenderFormItem = defineComponent(function (props, _ref) {
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
    watch === null || watch === void 0 || watch(value, toRaw(formModel));
  }
  if (formType === "input") {
    return function () {
      return h(Input, _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
      }));
    };
  } else if (formType === "select") {
    return function () {
      return h(Select, _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        options: props.options,
        placeholder: placeholder || "\u8BF7\u9009\u62E9".concat(title)
      }));
    };
  } else if (formType === "rangePicker") {
    var RangePicker = DatePicker.RangePicker;
    return function () {
      return h(RangePicker, _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        style: "width: 100%",
        placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : ["开始时间", "结束时间"]
      }));
    };
  } else if (formType === "datePicker") {
    return function () {
      return h(DatePicker, _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        style: "width: 100%",
        placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "请选择查询时间"
      }));
    };
  } else if (formType === "cascader") {
    return function () {
      return h(Cascader, _objectSpread(_objectSpread({}, properties), {}, {
        onChange: onChange,
        value: props.value,
        options: props.options,
        placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "\u8BF7\u9009\u62E9".concat(title)
      }));
    };
  } else if (typeof component === "function") {
    return function () {
      return cloneVNode(component(), {
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

export { RenderFormItem as default };
