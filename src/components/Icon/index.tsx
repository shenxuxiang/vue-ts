import type { CSSProperties } from "vue";
import { defineComponent, h } from "vue";
import "./font/iconfont.css";

type IconProps = {
  name: string;
  style?: string | CSSProperties;
  class?: string;
};

export default defineComponent<IconProps>(
  (props, { attrs }) => {
    return () =>
      h("i", {
        ...attrs,
        style: props.style,
        className: `qm-vnit-iconfont qm-vnit-icon-${props.name}${
          props.class ? " " + props.class : ""
        }`,
      });
  },
  {
    inheritAttrs: false,
    props: ["name", "class", "style"],
  },
);