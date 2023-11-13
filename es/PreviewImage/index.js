import 'core-js/modules/es.function.name.js';
import './SuperPreviewImage.vue.js';
import './PreviewImage.vue.js';
import script from './SuperPreviewImage.vue2.js';
import script$1 from './PreviewImage.vue2.js';

var _default = script$1;
_default.SuperPreviewImage = script;
_default.install = function (app) {
  app.component(script$1.name, script$1);
  app.component(script.name, script);
};

export { script as SuperPreviewImage, _default as default };
