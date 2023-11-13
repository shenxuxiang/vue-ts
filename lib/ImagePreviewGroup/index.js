"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ImageGroupVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./ImageGroup.vue.js");
var _ImageGroupVue2 = _interopRequireDefault(require("./ImageGroup.vue2.js"));
_ImageGroupVue2["default"].install = function (app) {
  return app.component(Image.name, Image);
};