"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "SuperPreviewImage", {
  enumerable: true,
  get: function get() {
    return _SuperPreviewImageVue2["default"];
  }
});
exports["default"] = void 0;
require("core-js/modules/es.function.name.js");
require("./SuperPreviewImage.vue.js");
require("./PreviewImage.vue.js");
var _SuperPreviewImageVue2 = _interopRequireDefault(require("./SuperPreviewImage.vue2.js"));
var _PreviewImageVue2 = _interopRequireDefault(require("./PreviewImage.vue2.js"));
var _default = exports["default"] = _PreviewImageVue2["default"];
_default.SuperPreviewImage = _SuperPreviewImageVue2["default"];
_default.install = function (app) {
  app.component(_PreviewImageVue2["default"].name, _PreviewImageVue2["default"]);
  app.component(_SuperPreviewImageVue2["default"].name, _SuperPreviewImageVue2["default"]);
};