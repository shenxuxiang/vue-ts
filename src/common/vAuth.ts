import type { App } from 'vue';

export default function install(app: App) {
  app.directive('auth', {
    mounted: execude,
    updated: execude,
  });

  function execude(el: any, binding: any) {
    const { value } = binding;
    if (app.config.globalProperties.userButtonList?.includes(value)) {
      el.style.cssText = '';
    } else {
      el.style.cssText = 'display: none';
    }
  }
}
