import 'core-js/modules/es.function.name.js';
import './UploadImage.vue.js';
import script from './UploadImage.vue2.js';

script.install = function (app) {
  return app.component(script.name, script);
};

export { script as default };
