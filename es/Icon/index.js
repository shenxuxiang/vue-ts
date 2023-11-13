import 'core-js/modules/es.function.name.js';
import './Icon.vue.js';
import script from './Icon.vue2.js';

script.install = function (app) {
  return app.component(script.name, script);
};

export { script as default };
