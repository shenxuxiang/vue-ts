import 'core-js/modules/es.function.name.js';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import './ImagePreviewGroup/index.js';
import './ContentFormHeader/index.js';
import './ContentFormTable/index.js';
import _default from './PreviewImage/index.js';
import './UploadImage/index.js';
import './UploadVideo/index.js';
import './ModuleTree/index.js';
import './UploadFile/index.js';
import './Image/index.js';
import './Icon/index.js';
import './Icon/Icon.vue.js';
import script from './Icon/Icon.vue2.js';
import './Image/Image.vue.js';
import script$1 from './Image/Image.vue2.js';
import './ModuleTree/ModuleTree.vue.js';
import script$2 from './ModuleTree/ModuleTree.vue2.js';
import './UploadFile/UploadFile.vue.js';
import script$3 from './UploadFile/UploadFile.vue2.js';
import './UploadImage/UploadImage.vue.js';
import script$4 from './UploadImage/UploadImage.vue2.js';
import './UploadVideo/UploadVideo.vue.js';
import script$5 from './UploadVideo/UploadVideo.vue2.js';
import './ContentFormHeader/ContentFormHeader.vue.js';
import script$6 from './ContentFormHeader/ContentFormHeader.vue2.js';
import './ContentFormTable/ContentFormTable.vue.js';
import script$7 from './ContentFormTable/ContentFormTable.vue2.js';
import './ImagePreviewGroup/ImageGroup.vue.js';
import script$8 from './ImagePreviewGroup/ImageGroup.vue2.js';

var components = [script, script$1, script$2, script$3, script$4, script$5, _default, script$6, script$7, script$8];
// 全局注册
var install = function install(app) {
  _forEachInstanceProperty(components).call(components, function (component) {
    app.component(component.name, component);
  });
};
var index = {
  install: install
};

export { script$6 as ContentFormHead, script$7 as ContentFormTable, script as Icon, script$1 as Image, script$8 as ImagePreviewGroup, script$2 as ModuleTree, _default as PreviewImage, script$3 as UploadFile, script$4 as UploadImage, script$5 as UploadVideo, index as default, install };
