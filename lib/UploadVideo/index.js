"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _UploadVideoVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./UploadVideo.vue.js");
var _UploadVideoVue2 = _interopRequireDefault(require("./UploadVideo.vue2.js"));
_UploadVideoVue2["default"].install = function (app) {
  return app.component(_UploadVideoVue2["default"].name, _UploadVideoVue2["default"]);
};