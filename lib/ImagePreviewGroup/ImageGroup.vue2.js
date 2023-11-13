"use strict";

require("core-js/modules/es.array.push.js");
var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
require("./ImageGroup.css");
require("../Image/index.js");
var _index2 = _interopRequireDefault(require("../PreviewImage/index.js"));
require("../Image/Image.vue.js");
var _ImageVue2 = _interopRequireDefault(require("../Image/Image.vue2.js"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  "class": "qm-vnit-image-group"
};
var _hoisted_2 = ["onClick"];
var _hoisted_3 = ["onClick"];
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
  inheritAttrs: false,
  name: 'ImagePreviewGroup'
}), {}, {
  __name: 'ImageGroup',
  props: {
    "class": {
      type: String,
      required: false
    },
    bordered: {
      type: Boolean,
      required: false,
      "default": true
    },
    options: {
      type: Array,
      required: false
    },
    style: {
      type: null,
      required: false
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var slots = (0, _vue.useSlots)();
    var indicator = (0, _vue.ref)(0);
    var className = props["class"];
    var showPreview = (0, _vue.ref)(false);
    var children = (0, _vue.computed)(function () {
      var _slots$default, _slots$default2;
      return (_slots$default = (_slots$default2 = slots["default"]) === null || _slots$default2 === void 0 ? void 0 : _slots$default2.call(slots)) !== null && _slots$default !== void 0 ? _slots$default : [];
    });
    var imgs = (0, _vue.computed)(function () {
      var _slots$default3;
      if ((_slots$default3 = slots["default"]) !== null && _slots$default3 !== void 0 && _slots$default3.call(slots)) {
        var _context;
        return (0, _map["default"])(_context = children.value).call(_context, function (item) {
          return item.props.src;
        });
      } else {
        return props.options;
      }
    });
    function handlePreview(index) {
      indicator.value = index;
      showPreview.value = true;
    }
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)(_vue.Fragment, null, [(0, _vue.createElementVNode)("ul", _hoisted_1, [_ctx.options ? ((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, {
        key: 0
      }, (0, _vue.renderList)(_ctx.options, function (item, index) {
        return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("li", {
          key: index,
          style: (0, _vue.normalizeStyle)(_ctx.style),
          "class": (0, _vue.normalizeClass)(['qm-vnit-image-group-item', (0, _vue.unref)(className), {
            bordered: _ctx.bordered
          }]),
          onClick: function onClick($event) {
            return handlePreview(index);
          }
        }, [(0, _vue.createVNode)((0, _vue.unref)(_ImageVue2["default"]), {
          src: item
        }, null, 8 /* PROPS */, ["src"])], 14 /* CLASS, STYLE, PROPS */, _hoisted_2);
      }), 128 /* KEYED_FRAGMENT */)) : children.value ? ((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, {
        key: 1
      }, (0, _vue.renderList)(children.value, function (item, index) {
        return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("li", {
          key: index,
          style: (0, _vue.normalizeStyle)(_ctx.style),
          "class": (0, _vue.normalizeClass)(['qm-vnit-image-group-item', (0, _vue.unref)(className), {
            bordered: _ctx.bordered
          }]),
          onClick: function onClick($event) {
            return handlePreview(index);
          }
        }, [((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.resolveDynamicComponent)(item), (0, _vue.normalizeProps)((0, _vue.guardReactiveProps)(item.props)), null, 16 /* FULL_PROPS */))], 14 /* CLASS, STYLE, PROPS */, _hoisted_3);
      }), 128 /* KEYED_FRAGMENT */)) : (0, _vue.createCommentVNode)("v-if", true)]), ((0, _vue.openBlock)(), (0, _vue.createBlock)(_vue.Teleport, {
        to: "body"
      }, [(0, _vue.createVNode)((0, _vue.unref)(_index2["default"]), {
        imgs: imgs.value,
        index: indicator.value,
        open: showPreview.value,
        onClose: _cache[0] || (_cache[0] = function ($event) {
          return showPreview.value = false;
        })
      }, null, 8 /* PROPS */, ["imgs", "index", "open"])]))], 64 /* STABLE_FRAGMENT */);
    };
  }
}));