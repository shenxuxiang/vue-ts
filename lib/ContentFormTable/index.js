"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ContentFormTableVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./ContentFormTable.vue.js");
var _ContentFormTableVue2 = _interopRequireDefault(require("./ContentFormTable.vue2.js"));
_ContentFormTableVue2["default"].install = function (app) {
  app.component(_ContentFormTableVue2["default"].name, _ContentFormTableVue2["default"]);
};