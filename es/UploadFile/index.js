import 'core-js/modules/es.function.name.js';
import './UploadFile.vue.js';
import script from './UploadFile.vue2.js';

script.install = function (app) {
  return app.component(script.name, script);
};

export { script as default };
