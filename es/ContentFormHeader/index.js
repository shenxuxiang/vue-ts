import 'core-js/modules/es.function.name.js';
import './ContentFormHeader.vue.js';
import script from './ContentFormHeader.vue2.js';

script.install = function (app) {
  app.component(script.name, script);
};

export { script as default };
