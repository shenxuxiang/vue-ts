"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.number.constructor.js");
var _vue = require("vue");
var _getTransformProperties = _interopRequireDefault(require("../utils/getTransformProperties.js"));
require("../Image/index.js");
require("../Icon/index.js");
require("./Slider.css");
require("../Icon/Icon.vue.js");
var _IconVue2 = _interopRequireDefault(require("../Icon/Icon.vue2.js"));
require("../Image/Image.vue.js");
var _ImageVue2 = _interopRequireDefault(require("../Image/Image.vue2.js"));
var _hoisted_1 = {
  "class": "qm-vnit-preview-image-bar-slider-x"
};
var _hoisted_2 = ["onClick"];
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)({
  __name: 'Slider',
  props: {
    open: {
      type: Boolean,
      required: true
    },
    imgs: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    indicator: {
      type: Number,
      required: true
    }
  },
  emits: ["update:indicator"],
  setup: function setup(__props, _ref) {
    var emit = _ref.emit;
    var props = __props;
    var sliderRef = (0, _vue.ref)();
    var isFirstPage = (0, _vue.ref)(false);
    var isLastPage = (0, _vue.ref)(false);
    // 底部 bar 的宽度
    var foodBarWidth = (0, _vue.computed)(function () {
      if (props.imgs.length < props.pageSize) {
        return props.imgs.length * 120 + 68 + "px";
      } else {
        return props.pageSize * 120 + 68 + "px";
      }
    });
    (0, _vue.watch)([function () {
      return props.open;
    }, function () {
      return props.imgs;
    }, function () {
      return props.pageSize;
    }, function () {
      return props.indicator;
    }], sliderAnimation);
    // 计算 isFirstPage、isLastPage
    (0, _vue.watchEffect)(function () {
      var imgs = props.imgs,
        pageSize = props.pageSize,
        indicator = props.indicator;
      if (imgs.length <= pageSize) {
        isFirstPage.value = true;
        isLastPage.value = true;
        return;
      }
      if (indicator <= pageSize / 2) {
        isFirstPage.value = true;
        isLastPage.value = false;
      } else if (indicator > imgs.length - pageSize / 2) {
        isFirstPage.value = false;
        isLastPage.value = true;
      } else {
        isFirstPage.value = false;
        isLastPage.value = false;
      }
    });
    function sliderAnimation() {
      if (!sliderRef.value || !props.open) return;
      var imgs = props.imgs,
        pageSize = props.pageSize,
        indicator = props.indicator;
      var idx = indicator + 1;
      var length = imgs.length;
      // 如果 imgs 的长度小于 pageSize 则不需要滑动动效（偏移量始终都是 0）。
      if (length <= pageSize) {
        sliderRef.value.style.cssText = "\n        transform: translate3d(0px, 0px, 0px);\n        transition: transform 0s ease;\n      ";
        return;
      }
      var cssText = "";
      var half = pageSize / 2;
      if (idx <= half) {
        cssText = "transform: translate3d(0px, 0px, 0px); transition: transform 0.3s ease;";
      } else if (idx > length - half) {
        cssText = "transform: translate3d(".concat((pageSize - length) * 120, "px, 0px, 0px); transition: transform 0.3s ease;");
      } else {
        var distance = -(idx - half - 0.5) * 120;
        cssText = "transform: translate3d(".concat(distance, "px, 0px, 0px); transition: transform 0.3s ease;");
      }
      sliderRef.value.style.cssText = cssText;
    }
    function handleChangeIndicator(index) {
      emit("update:indicator", index);
    }
    // 上一页
    function handlePrevPage() {
      // 第一页
      if (isFirstPage.value) return;
      isLastPage.value = false;
      var _getTransformProperti = (0, _getTransformProperties["default"])(sliderRef.value),
        translateX = _getTransformProperti.translateX;
      var distance = translateX + props.pageSize * 120;
      if (distance >= 0) {
        distance = 0;
        isFirstPage.value = true;
      } else {
        isFirstPage.value = false;
      }
      sliderRef.value.style.cssText = "transform: translate3d(".concat(distance, "px, 0px, 0px); transition: transform 0.3s ease;");
    }
    // 下一页
    function handleNextPage() {
      // 最后一页
      if (isLastPage.value) return;
      isFirstPage.value = false;
      var _getTransformProperti2 = (0, _getTransformProperties["default"])(sliderRef.value),
        translateX = _getTransformProperti2.translateX;
      var max = (props.imgs.length - props.pageSize) * 120;
      var distance = translateX - props.pageSize * 120;
      if (distance <= -max) {
        distance = -max;
        isLastPage.value = true;
      } else {
        isLastPage.value = false;
      }
      sliderRef.value.style.cssText = "transform: translate3d(".concat(distance, "px, 0px, 0px); transition: transform 0.3s ease;");
    }
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
        "class": "qm-vnit-preview-image-bar",
        style: (0, _vue.normalizeStyle)({
          width: foodBarWidth.value
        })
      }, [(0, _vue.createElementVNode)("div", {
        "class": (0, _vue.normalizeClass)(['qm-vnit-preview-image-prevpage', {
          disabled: isFirstPage.value
        }]),
        onClick: handlePrevPage
      }, [(0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
        name: "arrow-left-bold",
        style: {
          "font-size": "30px"
        }
      })], 2 /* CLASS */), (0, _vue.createElementVNode)("div", {
        "class": (0, _vue.normalizeClass)(['qm-vnit-preview-image-nextpage', {
          disabled: isLastPage.value
        }]),
        onClick: handleNextPage
      }, [(0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
        name: "arrow-right-bold",
        style: {
          "font-size": "30px"
        }
      })], 2 /* CLASS */), (0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createElementVNode)("ul", {
        ref_key: "sliderRef",
        ref: sliderRef,
        "class": "qm-vnit-preview-image-bar-slider"
      }, [((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(_ctx.imgs, function (item, index) {
        return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("li", {
          key: item + index,
          "class": (0, _vue.normalizeClass)(['qm-vnit-preview-image-bar-slider-item', {
            active: index === _ctx.indicator
          }]),
          onClick: function onClick($event) {
            return handleChangeIndicator(index);
          }
        }, [(0, _vue.createVNode)((0, _vue.unref)(_ImageVue2["default"]), {
          src: item,
          alt: ""
        }, null, 8 /* PROPS */, ["src"])], 10 /* CLASS, PROPS */, _hoisted_2);
      }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)])], 4 /* STYLE */);
    };
  }
});