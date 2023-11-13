"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.function.name.js");
var _vue = require("vue");
var _EyeOutlined = _interopRequireDefault(require("@ant-design/icons-vue/EyeOutlined"));
var _DeleteOutlined = _interopRequireDefault(require("@ant-design/icons-vue/DeleteOutlined"));
var _PictureOutlined = _interopRequireDefault(require("@ant-design/icons-vue/PictureOutlined"));
var _upload = _interopRequireDefault(require("./upload.js"));
var _hoisted_1 = {
  key: 0,
  "class": "qm-vnit-upload-image-item-error"
};
var _hoisted_2 = {
  "class": "qm-vnit-upload-image-item-preview"
};
var _hoisted_3 = ["src"];
var _hoisted_4 = {
  "class": "qm-vnit-upload-image-item-mask"
};
var _hoisted_5 = /*#__PURE__*/(0, _vue.createElementVNode)("div", {
  "class": "qm-vnit-upload-image-item-tips"
}, "上传失败", -1 /* HOISTED */);
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)({
  __name: 'RenderItem',
  props: {
    uid: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    response: {
      type: null,
      required: false
    },
    method: {
      type: String,
      required: false,
      "default": 'POST'
    },
    rowSource: {
      type: null,
      required: false
    },
    percent: {
      type: Number,
      required: false,
      "default": 100
    },
    headers: {
      type: Function,
      required: false
    },
    status: {
      type: String,
      required: false,
      "default": 'done'
    }
  },
  emits: ["remove", "preview", "error", "success"],
  setup: function setup(__props, _ref) {
    var emit = _ref.emit;
    var props = __props;
    var easeIn = function easeIn(t, b, c, d) {
      return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    var imgURL = (0, _vue.ref)('');
    var itemRef = (0, _vue.ref)();
    var cvsRef = (0, _vue.ref)();
    var ctxRef = (0, _vue.ref)();
    var uploadInstance = (0, _vue.ref)();
    // canvas 初始化
    (0, _vue.onMounted)(function () {
      var _itemRef$value;
      // 在元素刚刚挂载到 DOM 节点时，添加一个渐入式的动画。
      (_itemRef$value = itemRef.value) === null || _itemRef$value === void 0 || _itemRef$value.classList.add('enter-from');
      requestAnimationFrame(function () {
        var _itemRef$value2;
        return (_itemRef$value2 = itemRef.value) === null || _itemRef$value2 === void 0 ? void 0 : _itemRef$value2.classList.remove('enter-from');
      });
      if (props.url) {
        imgURL.value = props.url;
      } else if (props.rowSource) {
        // 预先添加了一个图片预加载的功能，在网络不太流畅时可以让图片尽早的展示出来。
        var reader = new FileReader();
        reader.readAsDataURL(props.rowSource);
        reader.onload = function () {
          imgURL.value = reader.result;
        };
      }
      if (!props.url && props.status === 'loading') {
        initialCanvas();
        uploadFile();
      }
    });
    (0, _vue.onUnmounted)(function () {
      // 销毁画布
      ctxRef.value = null;
      // 取消请求
      if (uploadInstance.value) uploadInstance.value.abort();
    });
    // 开始上传图片
    function uploadFile() {
      if (props.uid && props.status === 'loading' && props.rowSource) {
        var formData = new FormData();
        formData.append('file', props.rowSource);
        var upload = new _upload["default"]({
          headers: props.headers
        });
        var isUploadStart = true;
        // 更新上传进度
        upload.onProgress(function (progress) {
          // 如果一开始上传的时候，progress 就大于等于 1，说明网速足够快上传图片瞬间就完成了，
          // 此时，我们使用动画完成进度条，否则就是每次 onProgress 事件触发 updateProgressBar
          if (isUploadStart && progress >= 1) {
            progressBarAnimation();
          } else {
            updateProgressBar(progress);
          }
          isUploadStart = false;
        });
        // 上传成功
        upload.onSuccess( /*#__PURE__*/function () {
          var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res) {
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  fadeInAnimation();
                  emit('success', props.uid, res);
                  uploadInstance.value = null;
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }());
        // 上传失败
        upload.onError(function (err) {
          emit('error', props.uid, err);
          uploadInstance.value = null;
        });
        // 将 xhr 实例对象赋值给 uploadInstance，在组件卸载时如果请求还没有完成将会取消请求。
        uploadInstance.value = upload.create(props.action, props.method, formData);
      }
    }
    // canvas 画布初始化
    function initialCanvas() {
      var _cvsRef$value;
      cvsRef.value.width = 84;
      cvsRef.value.height = 84;
      var ctx = ctxRef.value = (_cvsRef$value = cvsRef.value) === null || _cvsRef$value === void 0 ? void 0 : _cvsRef$value.getContext('2d');
      ctx.save();
      ctx.translate(42, 42);
    }
    // 进度条自动更新动画
    function progressBarAnimation(callback) {
      var count = 1;
      (function loop() {
        if (count >= 100) return callback === null || callback === void 0 ? void 0 : callback();
        count += 3;
        count = Math.ceil(easeIn(count, count, 100 - count, 100));
        updateProgressBar(count / 100);
        requestAnimationFrame(loop);
      })();
    }
    // 更新进度条
    function updateProgressBar(progress) {
      if (!ctxRef.value) return;
      var ctx = ctxRef.value;
      ctx.clearRect(-42, -42, 84, 84);
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.fillRect(-42, -42, 84, 84);
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 1.5, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = '#1677ff';
      ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 2 * progress - 0.5 * Math.PI, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'normal normal normal 14px arial';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillText((progress * 100).toFixed(0) + '%', 0, 0);
    }
    // 图片展示（渐入动画）
    function fadeInAnimation() {
      if (cvsRef.value) {
        cvsRef.value.style.display = 'none';
        // @ts-ignore
        cvsRef.value.parentNode.classList.toggle('fade-in');
        (0, _setTimeout2["default"])(function () {
          var _cvsRef$value2;
          if ((_cvsRef$value2 = cvsRef.value) !== null && _cvsRef$value2 !== void 0 && _cvsRef$value2.parentNode) {
            // @ts-ignore
            cvsRef.value.parentNode.style.display = 'none';
          }
        }, 300);
      }
    }
    function handleRemove(uid) {
      var _itemRef$value3;
      // 添加离开时的动画效果
      (_itemRef$value3 = itemRef.value) === null || _itemRef$value3 === void 0 || _itemRef$value3.classList.add('leave-from');
      requestAnimationFrame(function () {
        var _itemRef$value4, _itemRef$value5;
        (_itemRef$value4 = itemRef.value) === null || _itemRef$value4 === void 0 || _itemRef$value4.classList.remove('leave-from');
        (_itemRef$value5 = itemRef.value) === null || _itemRef$value5 === void 0 || _itemRef$value5.classList.add('leave-active');
      });
      (0, _setTimeout2["default"])(function () {
        return emit('remove', uid);
      }, 300);
    }
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("li", {
        ref_key: "itemRef",
        ref: itemRef,
        "class": (0, _vue.normalizeClass)(['qm-vnit-upload-image-item', {
          error: _ctx.status === 'error'
        }])
      }, [(0, _vue.createCommentVNode)(" 进度条 "), (0, _vue.createElementVNode)("div", {
        "class": "qm-vnit-upload-image-item-progress",
        style: (0, _vue.normalizeStyle)({
          display: _ctx.status === 'error' ? 'none' : ''
        })
      }, [(0, _vue.createElementVNode)("canvas", {
        ref_key: "cvsRef",
        ref: cvsRef,
        style: {
          "width": "84px",
          "height": "84px"
        }
      }, null, 512 /* NEED_PATCH */)], 4 /* STYLE */), (0, _vue.createCommentVNode)(" 上传失败 "), _ctx.status === 'error' ? ((0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_1, [(0, _vue.createVNode)((0, _vue.unref)(_PictureOutlined["default"]), {
        style: {
          "font-size": "36px",
          "color": "#ff4d4f"
        }
      }), (0, _vue.createElementVNode)("p", null, (0, _vue.toDisplayString)(_ctx.name), 1 /* TEXT */)])) : _ctx.status === 'done' ? ((0, _vue.openBlock)(), (0, _vue.createElementBlock)(_vue.Fragment, {
        key: 1
      }, [(0, _vue.createCommentVNode)(" 图片展示 "), (0, _vue.createElementVNode)("div", _hoisted_2, [(0, _vue.renderSlot)(_ctx.$slots, "itemRender", {
        src: imgURL.value
      }, function () {
        return [(0, _vue.createElementVNode)("img", {
          src: imgURL.value,
          "class": "qm-vnit-upload-image-item-preview-content"
        }, null, 8 /* PROPS */, _hoisted_3)];
      })])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : (0, _vue.createCommentVNode)("v-if", true), (0, _vue.createCommentVNode)(" 可操作区域 "), (0, _vue.createElementVNode)("div", _hoisted_4, [(0, _vue.createCommentVNode)(" 删除按钮 "), (0, _vue.createVNode)((0, _vue.unref)(_DeleteOutlined["default"]), {
        "class": "qm-vnit-upload-image-item-remove-icon",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return handleRemove(_ctx.uid);
        })
      }), (0, _vue.createCommentVNode)(" 预览按钮 "), _ctx.status === 'done' ? ((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_EyeOutlined["default"]), {
        key: 0,
        "class": "qm-vnit-upload-image-item-preview-icon",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.$emit('preview', imgURL.value);
        })
      })) : (0, _vue.createCommentVNode)("v-if", true)]), _hoisted_5], 2 /* CLASS */);
    };
  }
});