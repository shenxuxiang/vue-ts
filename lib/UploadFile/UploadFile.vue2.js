"use strict";

require("core-js/modules/es.array.push.js");
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
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
require("core-js/modules/es.number.constructor.js");
var _button = _interopRequireDefault(require("ant-design-vue/lib/button"));
var _upload = _interopRequireDefault(require("ant-design-vue/lib/upload"));
var _message2 = _interopRequireDefault(require("ant-design-vue/lib/message"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
var _UploadOutlined = _interopRequireDefault(require("@ant-design/icons-vue/UploadOutlined"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty2(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
  name: 'UploadFile'
}), {}, {
  __name: 'UploadFile',
  props: {
    action: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      required: false,
      "default": "*"
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
      required: false,
      "default": true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    headers: {
      type: Object,
      required: false
    },
    fileList: {
      type: null,
      required: false
    },
    listType: {
      type: String,
      required: false,
      "default": "text"
    }
  },
  emits: ["update:fileList"],
  setup: function setup(__props, _ref) {
    var _props$fileList$lengt, _props$fileList;
    var emit = _ref.emit;
    var props = __props;
    // 当前文件数量，在限制文件上传数量时会被使用
    var fileCount = (_props$fileList$lengt = (_props$fileList = props.fileList) === null || _props$fileList === void 0 ? void 0 : _props$fileList.length) !== null && _props$fileList$lengt !== void 0 ? _props$fileList$lengt : 0;
    var _fileList = (0, _vue.ref)([]);
    (0, _vue.watch)([function () {
      return props.fileList;
    }], function () {
      if (typeof props.fileList === "undefined" || props.fileList === _fileList.value) return;
      _fileList.value = props.fileList;
      // 更新文件数量
      fileCount = props.fileList.length;
    });
    function handleFileChange(field) {
      var _context;
      var maxSize = props.maxSize,
        maxCount = props.maxCount;
      var newFileList = field.fileList;
      if (maxSize) newFileList = (0, _filter["default"])(_context = field.fileList).call(_context, function (file) {
        return file.size <= maxSize;
      });
      if (maxCount) newFileList = (0, _slice["default"])(newFileList).call(newFileList, 0, maxCount);
      _fileList.value = newFileList;
      // 更新文件数量
      fileCount = newFileList.length;
      emit("update:fileList", newFileList);
    }
    function beforeUpload(file) {
      var size = file.size;
      var maxSize = props.maxSize,
        maxCount = props.maxCount;
      if (maxSize && size > maxSize) {
        _message2["default"].warning("文件过大，无法上传！");
        return false;
      }
      if (maxCount && fileCount + 1 > maxCount) return false;
      fileCount++;
      return true;
    }
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_upload["default"]), {
        accept: _ctx.accept,
        action: _ctx.action,
        headers: _ctx.headers,
        multiple: _ctx.multiple,
        disabled: _ctx.disabled,
        listType: _ctx.listType,
        "file-list": _fileList.value,
        beforeUpload: beforeUpload,
        onChange: handleFileChange
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.renderSlot)(_ctx.$slots, "default", {}, function () {
            return [(0, _vue.createVNode)((0, _vue.unref)(_button["default"]), {
              disabled: _ctx.disabled
            }, {
              "default": (0, _vue.withCtx)(function () {
                return [(0, _vue.createTextVNode)(" 上传文件"), (0, _vue.createVNode)((0, _vue.unref)(_UploadOutlined["default"]))];
              }),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["disabled"])];
          })];
        }),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["accept", "action", "headers", "multiple", "disabled", "listType", "file-list"]);
    };
  }
}));