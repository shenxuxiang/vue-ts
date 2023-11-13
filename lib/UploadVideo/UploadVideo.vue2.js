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
require("core-js/modules/es.number.constructor.js");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
require("./UploadVideo.css");
require("../Icon/index.js");
require("../UploadImage/index.js");
require("../UploadImage/UploadImage.vue.js");
var _UploadImageVue2 = _interopRequireDefault(require("../UploadImage/UploadImage.vue2.js"));
require("../Icon/Icon.vue.js");
var _IconVue2 = _interopRequireDefault(require("../Icon/Icon.vue2.js"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = ["src"];
var _hoisted_2 = ["src"];
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
  name: 'UploadVideo'
}), {}, {
  __name: 'UploadVideo',
  props: {
    action: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: false
    },
    maxSize: {
      type: Number,
      required: false
    },
    maxCount: {
      type: Number,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    fileList: {
      type: null,
      required: false
    },
    headers: {
      type: Function,
      required: false
    }
  },
  emits: ["error", "update:fileList"],
  setup: function setup(__props, _ref) {
    var emit = _ref.emit;
    var props = __props;
    var videoURL = (0, _vue.ref)('');
    var videoRef = (0, _vue.ref)();
    var localVideos = (0, _vue.ref)([]);
    var showPreview = (0, _vue.ref)(false);
    var videoPreviewRef = (0, _vue.ref)();
    var videoList = (0, _vue.computed)({
      get: function get() {
        return props.fileList || localVideos.value;
      },
      set: function set(value) {
        return emit('update:fileList', value);
      }
    });
    function handlePreviewFile(url) {
      videoURL.value = url;
      showPreview.value = true;
    }
    function handleCanPlay(event) {
      var video = event.target;
      var videoWidth = video.videoWidth,
        videoHeight = video.videoHeight;
      var ratio = videoWidth / videoHeight;
      var maxWidth = document.documentElement.clientWidth * 0.7;
      var maxHeight = document.documentElement.clientWidth * 0.8;
      var width;
      var height;
      if (ratio > maxWidth / maxHeight) {
        if (videoWidth > maxWidth) {
          width = maxWidth;
          height = width / ratio;
        } else {
          width = videoWidth;
          height = videoHeight;
        }
      } else {
        if (videoHeight > maxHeight) {
          height = maxHeight;
          width = height / ratio;
        } else {
          width = videoWidth;
          height = videoHeight;
        }
      }
      video.width = width;
      video.height = height;
    }
    function handleClosePreview(event) {
      if (event.target === event.currentTarget) {
        videoPreviewRef.value.pause();
        showPreview.value = false;
        videoURL.value = '';
      }
    }
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)(_vue.Fragment, null, [(0, _vue.createVNode)((0, _vue.unref)(_UploadImageVue2["default"]), {
        action: _ctx.action,
        method: _ctx.method,
        headers: _ctx.headers,
        maxSize: _ctx.maxSize,
        multiple: _ctx.multiple,
        maxCount: _ctx.maxCount,
        previewFile: handlePreviewFile,
        fileList: videoList.value,
        "onUpdate:fileList": _cache[0] || (_cache[0] = function ($event) {
          return videoList.value = $event;
        }),
        onError: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.$emit('error', $event);
        })
      }, {
        itemRender: (0, _vue.withCtx)(function (_ref2) {
          var src = _ref2.src;
          return [src ? ((0, _vue.openBlock)(), (0, _vue.createElementBlock)("video", {
            key: 0,
            "class": "qm-vnit-upload-video",
            muted: "",
            ref_key: "videoRef",
            ref: videoRef,
            preload: "auto"
          }, [(0, _vue.createElementVNode)("source", {
            src: src
          }, null, 8 /* PROPS */, _hoisted_1)], 512 /* NEED_PATCH */)) : (0, _vue.createCommentVNode)("v-if", true)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["action", "method", "headers", "maxSize", "multiple", "maxCount", "fileList"]), ((0, _vue.openBlock)(), (0, _vue.createBlock)(_vue.Teleport, {
        to: "body"
      }, [(0, _vue.createVNode)(_vue.Transition, {
        name: "uploadVidePreview"
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [showPreview.value ? ((0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
            key: 0,
            "class": "qm-vnit-upload-video-previewe",
            onClick: handleClosePreview
          }, [(0, _vue.createElementVNode)("video", {
            controls: "",
            onCanplay: handleCanPlay,
            ref_key: "videoPreviewRef",
            ref: videoPreviewRef,
            "class": "qm-vnit-upload-video-preview-content"
          }, [(0, _vue.createElementVNode)("source", {
            src: videoURL.value
          }, null, 8 /* PROPS */, _hoisted_2)], 544 /* HYDRATE_EVENTS, NEED_PATCH */), (0, _vue.createVNode)((0, _vue.unref)(_IconVue2["default"]), {
            name: "close",
            "class": "qm-vnit-upload-video-preview-close-icon",
            onClick: handleClosePreview
          })])) : (0, _vue.createCommentVNode)("v-if", true)];
        }),
        _: 1 /* STABLE */
      })]))], 64 /* STABLE_FRAGMENT */);
    };
  }
}));