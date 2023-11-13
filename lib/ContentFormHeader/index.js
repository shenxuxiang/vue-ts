"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ContentFormHeaderVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./ContentFormHeader.vue.js");
var _ContentFormHeaderVue2 = _interopRequireDefault(require("./ContentFormHeader.vue2.js"));
_ContentFormHeaderVue2["default"].install = function (app) {
  app.component(_ContentFormHeaderVue2["default"].name, _ContentFormHeaderVue2["default"]);
};