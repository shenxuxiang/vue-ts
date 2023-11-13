"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ImageVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./Image.vue.js");
var _ImageVue2 = _interopRequireDefault(require("./Image.vue2.js"));
_ImageVue2["default"].install = function (app) {
  return app.component(_ImageVue2["default"].name, _ImageVue2["default"]);
};