import 'core-js/modules/es.function.name.js';
import './ImageGroup.vue.js';
import script from './ImageGroup.vue2.js';

script.install = function (app) {
  return app.component(Image.name, Image);
};

export { script as default };
