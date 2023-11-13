"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _UploadImageVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./UploadImage.vue.js");
var _UploadImageVue2 = _interopRequireDefault(require("./UploadImage.vue2.js"));
_UploadImageVue2["default"].install = function (app) {
  return app.component(_UploadImageVue2["default"].name, _UploadImageVue2["default"]);
};