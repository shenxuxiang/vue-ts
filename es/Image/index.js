import 'core-js/modules/es.function.name.js';
import './Image.vue.js';
import script from './Image.vue2.js';

script.install = function (app) {
  return app.component(script.name, script);
};

export { script as default };
