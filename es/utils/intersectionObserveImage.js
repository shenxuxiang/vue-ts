import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _Map from '@babel/runtime-corejs3/core-js-stable/map';
import _bindInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/bind';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';

var IntersectionObserveImage = /*#__PURE__*/function () {
  function IntersectionObserveImage() {
    var _context;
    _classCallCheck(this, IntersectionObserveImage);
    _defineProperty(this, "nodeMap", new _Map());
    this.instance = new IntersectionObserver(_bindInstanceProperty(_context = this.intersectionCallback).call(_context, this));
  }
  _createClass(IntersectionObserveImage, [{
    key: "intersectionCallback",
    value: function intersectionCallback(entries) {
      var _this = this;
      _forEachInstanceProperty(entries).call(entries, function (item) {
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
var intersectionObserveImage = new IntersectionObserveImage();

export { intersectionObserveImage as default };
