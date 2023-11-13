"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));
var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var IntersectionObserveImage = /*#__PURE__*/function () {
  function IntersectionObserveImage() {
    var _context;
    (0, _classCallCheck2["default"])(this, IntersectionObserveImage);
    (0, _defineProperty2["default"])(this, "nodeMap", new _map["default"]());
    this.instance = new IntersectionObserver((0, _bind["default"])(_context = this.intersectionCallback).call(_context, this));
  }
  (0, _createClass2["default"])(IntersectionObserveImage, [{
    key: "intersectionCallback",
    value: function intersectionCallback(entries) {
      var _this = this;
      (0, _forEach["default"])(entries).call(entries, function (item) {
        var target = item.target,
          intersectionRatio = item.intersectionRatio;
        if (intersectionRatio > 0) {
          if (_this.nodeMap.has(target)) {
            var imgURL = _this.nodeMap.get(target);
            target.src = imgURL;
            _this.removeElement(target);
          }
        }
      });
    }
  }, {
    key: "addElement",
    value: function addElement(node, src) {
      this.instance.observe(node);
      this.nodeMap.set(node, src);
    }
  }, {
    key: "removeElement",
    value: function removeElement(node) {
      this.instance.unobserve(node);
      this.nodeMap["delete"](node);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.instance.disconnect();
    }
  }]);
  return IntersectionObserveImage;
}();
var intersectionObserveImage = exports["default"] = new IntersectionObserveImage();