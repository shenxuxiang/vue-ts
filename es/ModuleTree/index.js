import 'core-js/modules/es.function.name.js';
import './ModuleTree.vue.js';
import script from './ModuleTree.vue2.js';

script.install = function (app) {
  return app.component(script.name, script);
};

export { script as default };
