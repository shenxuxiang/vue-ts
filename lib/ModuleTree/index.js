"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ModuleTreeVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./ModuleTree.vue.js");
var _ModuleTreeVue2 = _interopRequireDefault(require("./ModuleTree.vue2.js"));
_ModuleTreeVue2["default"].install = function (app) {
  return app.component(_ModuleTreeVue2["default"].name, _ModuleTreeVue2["default"]);
};