"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
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
var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));
var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.error.to-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.array.push.js");
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));
var _message2 = _interopRequireDefault(require("ant-design-vue/lib/message"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
var _index = _interopRequireDefault(require("../PreviewImage/index.js"));
var _PlusOutlined = _interopRequireDefault(require("@ant-design/icons-vue/PlusOutlined"));
require("./RenderItem.vue.js");
require("./UploadImage.css");
var _RenderItemVue2 = _interopRequireDefault(require("./RenderItem.vue2.js"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty2(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context5, _context6; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context5 = ownKeys(Object(t), !0)).call(_context5, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context6 = ownKeys(Object(t))).call(_context6, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  "class": "qm-vnit-upload-image"
};
var _hoisted_2 = {
  "class": /*#__PURE__*/(0, _vue.normalizeClass)(['qm-vnit-upload-image-list'])
};
var _hoisted_3 = {
  "class": "qm-vnit-upload-image-slot"
};
var _hoisted_4 = /*#__PURE__*/(0, _vue.createElementVNode)("div", null, "上传图片", -1 /* HOISTED */);
var _hoisted_5 = ["multiple"];
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
  name: 'UploadImage'
}), {}, {
  __name: 'UploadImage',
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
      type: Array,
      required: false
    },
    previewFile: {
      type: Function,
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
    var _fileList = (0, _vue.ref)([]);
    var inputRef = (0, _vue.ref)();
    var uploadButtonRef = (0, _vue.ref)();
    var previewIdx = (0, _vue.ref)(0);
    var previewImgs = (0, _vue.ref)([]);
    var showPreviewImage = (0, _vue.ref)(false);
    (0, _vue.watch)(function () {
      return props.fileList;
    }, function () {
      if (props.fileList === _fileList.value) return;
      _fileList.value = props.fileList;
    }, {
      immediate: true
    });
    function handleFileChange(event) {
      var _fileList$value;
      var newFiles = (0, _from["default"])(event.target.files);
      // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
      inputRef.value.value = '';
      if (props.maxCount && _fileList.value.length >= props.maxCount) return;
      if (props.maxSize) {
        var length = newFiles.length;
        while (length--) {
          var file = newFiles[length];
          if (file.size > props.maxSize) {
            (0, _splice["default"])(newFiles).call(newFiles, length, 1);
            _message2["default"].warning(file.name + '文件过大无法上传！');
          }
        }
        if (newFiles.length <= 0) return;
      }
      if (props.maxCount) {
        var surplus = props.maxCount - _fileList.value.length;
        newFiles = (0, _slice["default"])(newFiles).call(newFiles, 0, surplus);
      }
      var newFileList = (0, _map["default"])(newFiles).call(newFiles, function (file) {
        var _context;
        return {
          percent: 0,
          uid: (0, _slice["default"])(_context = Math.random().toString(32)).call(_context, 2) + (0, _now["default"])(),
          name: file.name,
          rowSource: file,
          status: 'loading'
        };
      });
      (_fileList$value = _fileList.value).push.apply(_fileList$value, (0, _toConsumableArray2["default"])(newFileList));
      triggerUpdateFileList();
      // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
      inputRef.value.value = '';
      // 每次上传时，给上传按钮一个向右移动的动效。
      uploadButtonRef.value.classList.add('enter-from');
      requestAnimationFrame(function () {
        return uploadButtonRef.value.classList.remove('enter-from');
      });
    }
    function handleClick() {
      var _inputRef$value;
      (_inputRef$value = inputRef.value) === null || _inputRef$value === void 0 || _inputRef$value.click();
    }
    // 图片上传成功
    function handleUploadSuccess(uid, res) {
      var _context2;
      var target = (0, _find["default"])(_context2 = _fileList.value).call(_context2, function (file) {
        return file.uid === uid;
      });
      if (target) {
        target.status = 'done';
        target.percent = 100;
        target.response = res;
        triggerUpdateFileList();
      }
    }
    // 图片上传失败
    function handleUploadError(uid, error) {
      var _context3;
      emit('error', error);
      var target = (0, _find["default"])(_context3 = _fileList.value).call(_context3, function (file) {
        return file.uid === uid;
      });
      if (target) {
        target.status = 'error';
        triggerUpdateFileList();
      }
    }
    // 移除
    function handleRemoveItem(uid) {
      var _context4;
      _fileList.value = (0, _filter["default"])(_context4 = _fileList.value).call(_context4, function (file) {
        return file.uid !== uid;
      });
      triggerUpdateFileList();
    }
    function handlePreviewImage(url) {
      if (props.previewFile) {
        props.previewFile(url);
      } else {
        previewImgs.value = [url];
        showPreviewImage.value = true;
      }
    }
    // 触发 'update:fileList' 事件
    function triggerUpdateFileList() {
      (0, _vue.nextTick)(function () {
        return emit('update:fileList', _fileList.value);
      });
    }
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)(_vue.Fragment, null, [(0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createElementVNode)("ul", _hoisted_2, [((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(_fileList.value, function (file) {
        return (0, _vue.openBlock)(), (0, _vue.createBlock)(_RenderItemVue2["default"], (0, _vue.mergeProps)({
          key: file.uid
        }, file, {
          metod: _ctx.method,
          action: _ctx.action,
          headers: _ctx.headers,
          onError: handleUploadError,
          onRemove: handleRemoveItem,
          onPreview: handlePreviewImage,
          onSuccess: handleUploadSuccess
        }), {
          itemRender: (0, _vue.withCtx)(function (_ref2) {
            var src = _ref2.src;
            return [(0, _vue.renderSlot)(_ctx.$slots, "itemRender", {
              src: src
            })];
          }),
          _: 2 /* DYNAMIC */
        }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["metod", "action", "headers"]);
      }), 128 /* KEYED_FRAGMENT */)), (0, _vue.withDirectives)((0, _vue.createElementVNode)("li", {
        "class": "qm-vnit-upload-image-label",
        onClick: handleClick,
        ref_key: "uploadButtonRef",
        ref: uploadButtonRef
      }, [(0, _vue.renderSlot)(_ctx.$slots, "default", {}, function () {
        return [(0, _vue.createElementVNode)("div", _hoisted_3, [(0, _vue.createVNode)((0, _vue.unref)(_PlusOutlined["default"]), {
          style: {
            "font-size": "16px",
            "margin-bottom": "10px",
            "color": "rgba(0, 0, 0, 0.8)"
          }
        }), _hoisted_4])];
      }), (0, _vue.createElementVNode)("input", {
        type: "file",
        multiple: _ctx.multiple,
        style: {
          "display": "none"
        },
        ref_key: "inputRef",
        ref: inputRef,
        onChange: handleFileChange
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_5)], 512 /* NEED_PATCH */), [[_vue.vShow, !_ctx.maxCount || _fileList.value.length < _ctx.maxCount]])])]), !_ctx.previewFile ? ((0, _vue.openBlock)(), (0, _vue.createBlock)(_vue.Teleport, {
        key: 0,
        to: "body"
      }, [(0, _vue.createVNode)((0, _vue.unref)(_index["default"]), {
        pageSize: 1,
        imgs: previewImgs.value,
        index: previewIdx.value,
        open: showPreviewImage.value,
        onClose: _cache[0] || (_cache[0] = function ($event) {
          return showPreviewImage.value = !showPreviewImage.value;
        })
      }, null, 8 /* PROPS */, ["imgs", "index", "open"])])) : (0, _vue.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */);
    };
  }
}));