import 'core-js/modules/es.function.name.js';
import './UploadVideo.vue.js';
import script from './UploadVideo.vue2.js';

script.install = function (app) {
  return app.component(script.name, script);
};

export { script as default };
