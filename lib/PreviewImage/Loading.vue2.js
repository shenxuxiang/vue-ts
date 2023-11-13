"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _vue = require("vue");
require("./Loading.css");
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)({
  __name: 'Loading',
  props: {
    open: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: false,
      "default": "light"
    },
    size: {
      type: String,
      required: false,
      "default": "default"
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var dotColor = (0, _vue.computed)(function () {
      switch (props.theme) {
        case "light":
          return "#f2f2f2";
        case "dark":
          return "#b3b3b3";
        default:
          return props.theme;
      }
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createBlock)(_vue.Transition, {
        name: "qm-vnit-loading",
        persisted: ""
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.withDirectives)((0, _vue.createElementVNode)("div", {
            "class": (0, _vue.normalizeClass)(['qm-vnit-loading', _ctx.size])
          }, [((0, _vue.openBlock)(), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(6, function (n) {
            return (0, _vue.createElementVNode)("div", {
              key: n,
              "class": "qm-vnit-loading-dot",
              style: (0, _vue.normalizeStyle)({
                background: dotColor.value
              })
            }, null, 4 /* STYLE */);
          }), 64 /* STABLE_FRAGMENT */))], 2 /* CLASS */), [[_vue.vShow, _ctx.open]])];
        }),
        _: 1 /* STABLE */
      });
    };
  }
});