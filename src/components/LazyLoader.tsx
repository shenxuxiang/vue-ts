import { defineComponent, shallowRef, h } from 'vue';
import { Spin } from 'ant-design-vue';
import type { VNode } from 'vue';

export default function LazyLoader(loader: () => Promise<any>) {
  return defineComponent(
    () => {
      const comp = shallowRef<VNode>(null!);

      loader().then((response: any) => {
        comp.value = response.default;
      });

      return () => {
        if (comp.value) {
          return h(comp.value);
        } else {
          return (
            <Spin
              spinning
              size="large"
              style={{ position: 'absolute', left: 0, right: 0, margin: '0 auto', top: '45vh' }}
            />
          );
        }
      };
    },
    {
      name: 'LazyLoader',
      props: [],
    },
  );
}
