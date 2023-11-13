"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "ContentFormHead", {
  enumerable: true,
  get: function get() {
    return _ContentFormHeaderVue2["default"];
  }
});
_Object$defineProperty(exports, "ContentFormTable", {
  enumerable: true,
  get: function get() {
    return _ContentFormTableVue2["default"];
  }
});
_Object$defineProperty(exports, "Icon", {
  enumerable: true,
  get: function get() {
    return _IconVue2["default"];
  }
});
_Object$defineProperty(exports, "Image", {
  enumerable: true,
  get: function get() {
    return _ImageVue2["default"];
  }
});
_Object$defineProperty(exports, "ImagePreviewGroup", {
  enumerable: true,
  get: function get() {
    return _ImageGroupVue2["default"];
  }
});
_Object$defineProperty(exports, "ModuleTree", {
  enumerable: true,
  get: function get() {
    return _ModuleTreeVue2["default"];
  }
});
_Object$defineProperty(exports, "PreviewImage", {
  enumerable: true,
  get: function get() {
    return _index4["default"];
  }
});
_Object$defineProperty(exports, "UploadFile", {
  enumerable: true,
  get: function get() {
    return _UploadFileVue2["default"];
  }
});
_Object$defineProperty(exports, "UploadImage", {
  enumerable: true,
  get: function get() {
    return _UploadImageVue2["default"];
  }
});
_Object$defineProperty(exports, "UploadVideo", {
  enumerable: true,
  get: function get() {
    return _UploadVideoVue2["default"];
  }
});
exports.install = exports["default"] = void 0;
require("core-js/modules/es.function.name.js");
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
require("./ImagePreviewGroup/index.js");
require("./ContentFormHeader/index.js");
require("./ContentFormTable/index.js");
var _index4 = _interopRequireDefault(require("./PreviewImage/index.js"));
require("./UploadImage/index.js");
require("./UploadVideo/index.js");
require("./ModuleTree/index.js");
require("./UploadFile/index.js");
require("./Image/index.js");
require("./Icon/index.js");
require("./Icon/Icon.vue.js");
var _IconVue2 = _interopRequireDefault(require("./Icon/Icon.vue2.js"));
require("./Image/Image.vue.js");
var _ImageVue2 = _interopRequireDefault(require("./Image/Image.vue2.js"));
require("./ModuleTree/ModuleTree.vue.js");
var _ModuleTreeVue2 = _interopRequireDefault(require("./ModuleTree/ModuleTree.vue2.js"));
require("./UploadFile/UploadFile.vue.js");
var _UploadFileVue2 = _interopRequireDefault(require("./UploadFile/UploadFile.vue2.js"));
require("./UploadImage/UploadImage.vue.js");
var _UploadImageVue2 = _interopRequireDefault(require("./UploadImage/UploadImage.vue2.js"));
require("./UploadVideo/UploadVideo.vue.js");
var _UploadVideoVue2 = _interopRequireDefault(require("./UploadVideo/UploadVideo.vue2.js"));
require("./ContentFormHeader/ContentFormHeader.vue.js");
var _ContentFormHeaderVue2 = _interopRequireDefault(require("./ContentFormHeader/ContentFormHeader.vue2.js"));
require("./ContentFormTable/ContentFormTable.vue.js");
var _ContentFormTableVue2 = _interopRequireDefault(require("./ContentFormTable/ContentFormTable.vue2.js"));
require("./ImagePreviewGroup/ImageGroup.vue.js");
var _ImageGroupVue2 = _interopRequireDefault(require("./ImagePreviewGroup/ImageGroup.vue2.js"));
var components = [_IconVue2["default"], _ImageVue2["default"], _ModuleTreeVue2["default"], _UploadFileVue2["default"], _UploadImageVue2["default"], _UploadVideoVue2["default"], _index4["default"], _ContentFormHeaderVue2["default"], _ContentFormTableVue2["default"], _ImageGroupVue2["default"]];
// 全局注册
var install = exports.install = function install(app) {
  (0, _forEach["default"])(components).call(components, function (component) {
    app.component(component.name, component);
  });
};
var index = exports["default"] = {
  install: install
};