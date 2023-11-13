import 'core-js/modules/es.function.name.js';
import './ContentFormTable.vue.js';
import script from './ContentFormTable.vue2.js';

script.install = function (app) {
  app.component(script.name, script);
};

export { script as default };
